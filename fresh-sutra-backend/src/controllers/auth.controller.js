import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendOtp } from '../services/whatsapp.service.js';

// SIGNUP (User only)
export const signup = async (req, res) => {
    try {
        const { name, mobileNumber, email, password } = req.body;

        if (!name || !mobileNumber || !password) {
            return res.status(400).json({ message: "Name, mobile number, and password are required" });
        }

        const normalizedMobile = mobileNumber.replace(/\D/g, '');

        const existingUser = await prisma.user.findUnique({
            where: { mobileNumber: normalizedMobile },
        });

        if (existingUser) {
            return res.status(409).json({ message: "Mobile number already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                mobileNumber: normalizedMobile,
                email: email || null,
                password: hashedPassword,
                role: "USER", // Forcing USER role
            },
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// LOGIN (All roles)
export const login = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;

        if (!mobileNumber || !password) {
            return res.status(400).json({ message: "Mobile number and password are required" });
        }

        const normalizedMobile = mobileNumber.replace(/\D/g, '');

        const user = await prisma.user.findUnique({
            where: { mobileNumber: normalizedMobile },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                mobileNumber: user.mobileNumber,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
    try {
        const { mobileNumber } = req.body;

        if (!mobileNumber) {
            return res.status(400).json({ message: "Mobile number is required" });
        }

        const normalizedMobile = mobileNumber.replace(/\D/g, '');

        const user = await prisma.user.findUnique({
            where: { mobileNumber: normalizedMobile },
        });

        if (!user) {
            return res.status(404).json({ message: "Mobile number not registered" });
        }

        const now = new Date();
        const fifteenMinsAgo = new Date(now.getTime() - 15 * 60 * 1000);

        // Reset rate limits if window has passed
        let requestsCount = user.otpRequests;
        if (!user.lastOtpRequest || user.lastOtpRequest < fifteenMinsAgo) {
            requestsCount = 0;
        }

        if (requestsCount >= 3) {
            return res.status(429).json({ message: "Too many OTP requests. Please try again after 15 minutes." });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Expire in 5 minutes
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        // Update database with OTP & Expiry
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetOtp: otp,
                otpExpiry: otpExpiry,
                otpAttempts: 0,
                otpRequests: requestsCount + 1,
                lastOtpRequest: now
            },
        });

        // Send OTP via WhatsApp
        try {
            await sendOtp(normalizedMobile, otp);
        } catch (err) {
            console.error("WhatsApp OTP sending failed:", err);
            // Clear database state if delivery fails
            await prisma.user.update({
                where: { id: user.id },
                data: { resetOtp: null, otpExpiry: null, otpRequests: requestsCount },
            });
            return res.status(500).json({ message: "Failed to send verification code. Please try again later." });
        }

        res.status(200).json({ message: "OTP sent to your registered mobile number successfully" });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
    try {
        const { mobileNumber, otp } = req.body;

        if (!mobileNumber || !otp) {
            return res.status(400).json({ message: "Mobile number and OTP are required" });
        }

        const normalizedMobile = mobileNumber.replace(/\D/g, '');

        const user = await prisma.user.findUnique({
            where: { mobileNumber: normalizedMobile },
        });

        if (!user || !user.resetOtp) {
            return res.status(400).json({ message: "No active verification request found" });
        }

        if (user.otpAttempts >= 5) {
            await prisma.user.update({ where: { id: user.id }, data: { resetOtp: null, otpExpiry: null } });
            return res.status(403).json({ message: "Maximum verification attempts exceeded. Please request a new OTP." });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        if (user.resetOtp !== otp.trim()) {
            await prisma.user.update({ where: { id: user.id }, data: { otpAttempts: user.otpAttempts + 1 } });
            return res.status(400).json({ message: "Invalid OTP code" });
        }

        res.status(200).json({ message: "OTP verified successfully. You can now reset your password." });
    } catch (error) {
        console.error("Verify OTP error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
    try {
        const { mobileNumber, otp, newPassword } = req.body;

        if (!mobileNumber || !otp || !newPassword) {
            return res.status(400).json({ message: "Mobile number, OTP, and new password are required" });
        }

        const normalizedMobile = mobileNumber.replace(/\D/g, '');

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user = await prisma.user.findUnique({
            where: { mobileNumber: normalizedMobile },
        });

        if (!user || !user.resetOtp) {
            return res.status(400).json({ message: "Invalid verification state" });
        }

        if (user.otpAttempts >= 5) {
            return res.status(403).json({ message: "Maximum verification attempts exceeded. Please request a new OTP." });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        if (user.resetOtp !== otp.trim()) {
            await prisma.user.update({ where: { id: user.id }, data: { otpAttempts: user.otpAttempts + 1 } });
            return res.status(400).json({ message: "Invalid OTP code" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetOtp: null,
                otpExpiry: null,
                otpAttempts: 0
            }
        });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

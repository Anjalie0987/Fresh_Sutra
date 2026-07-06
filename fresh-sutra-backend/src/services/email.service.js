import nodemailer from 'nodemailer';

// Configure Nodemailer SMTP Transporter
const createTransporter = () => {
    // Gmail setup as configured in contact.controller.js
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

/**
 * Sends a 6-digit OTP verification email to the user.
 * @param {string} to - The recipient's email address.
 * @param {string} otp - The 6-digit OTP code.
 * @returns {Promise<void>}
 */
export const sendOtpEmail = async (to, otp) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"Fresh Sutra" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: 'Reset Your Password - Fresh Sutra OTP Verification',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #FF8C00; margin: 0; font-family: 'Georgia', serif;">Fresh Sutra</h2>
                    <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">Drink Fresh at Its Best</p>
                </div>
                <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; text-align: center; border: 1px solid #f0f0f0;">
                    <h3 style="color: #333; margin-top: 0; font-size: 18px;">Password Reset Verification Code</h3>
                    <p style="color: #555; font-size: 14px; line-height: 1.6;">
                        You requested to reset your password. Use the following 6-digit One-Time Password (OTP) to proceed. This code is valid for <strong>5 minutes</strong>.
                    </p>
                    <div style="font-size: 32px; font-weight: bold; color: #FF8C00; letter-spacing: 6px; margin: 20px 0; padding: 12px 24px; background-color: #ffffff; border-radius: 6px; display: inline-block; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        ${otp}
                    </div>
                    <p style="color: #718096; font-size: 12px; line-height: 1.5; margin-bottom: 0;">
                        If you did not request this password reset, please ignore this email or secure your account.
                    </p>
                </div>
                <div style="text-align: center; margin-top: 25px; color: #a0aec0; font-size: 11px; border-top: 1px solid #edf2f7; padding-top: 15px;">
                    &copy; ${new Date().getFullYear()} Fresh Sutra. All rights reserved.
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent successfully to ${to}`);
    } catch (error) {
        console.error("Nodemailer OTP sending error:", error);
        throw new Error("Failed to send OTP email. Please verify email settings in server configuration.");
    }
};

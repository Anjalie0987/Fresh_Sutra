import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/icons/FreshSutra_Logo.jpg';
import { API_BASE_URL } from '../../config/api';

const ForgotPassword = () => {
    const navigate = useNavigate();

    // Steps: 'email', 'otp', 'password', 'success'
    const [step, setStep] = useState('email');
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Cooldown Timer for Resending OTP
    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    // Handle Back Navigation
    const handleBack = () => {
        if (step === 'email') {
            navigate('/login');
        } else if (step === 'otp') {
            setStep('email');
            setError('');
        } else if (step === 'password') {
            setStep('otp');
            setError('');
        } else {
            navigate('/login');
        }
    };

    // Step 1: Request OTP
    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNumber }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send OTP. Please try again.');
            }

            setSuccessMsg(data.message || 'OTP sent successfully.');
            setStep('otp');
            setResendCooldown(60); // 60 seconds cooldown
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP Helper
    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;
        setError('');
        setSuccessMsg('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNumber }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to resend OTP.');
            }

            setSuccessMsg('A new OTP has been sent to your mobile number.');
            setResendCooldown(60);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNumber, otp: otp.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Invalid OTP code.');
            }

            setSuccessMsg(data.message || 'OTP verified successfully.');
            setStep('password');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNumber, otp: otp.trim(), newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Password reset failed.');
            }

            setStep('success');
            setSuccessMsg(data.message || 'Password updated successfully!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-neutral-50 flex items-center justify-center p-4 relative">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 text-neutral-600 hover:text-neutral-900 z-20 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Go back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </button>

            {/* Main Form Card */}
            <div className="bg-white w-full max-w-[440px] rounded-2xl shadow-xl flex flex-col items-center p-8 md:p-10 transition-all duration-300">
                {/* Logo Section */}
                <Link to="/" className="mb-2 hover:opacity-90 transition-opacity">
                    <img
                        src={Logo}
                        alt="Fresh Sutra"
                        className="h-16 md:h-20 w-auto object-contain"
                    />
                </Link>

                <h2 className="text-neutral-500 font-medium text-sm mb-6 tracking-wide">
                    Reset Your Password
                </h2>

                {/* Inline Banner Alerts */}
                {error && (
                    <div className="w-full mb-5 p-3 bg-red-100 text-red-600 text-sm rounded-lg flex items-start gap-2 animate-fadeIn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}
                {successMsg && step !== 'success' && (
                    <div className="w-full mb-5 p-3 bg-green-100 text-green-700 text-sm rounded-lg flex items-start gap-2 animate-fadeIn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{successMsg}</span>
                    </div>
                )}

                {/* Step 1: Email Request Form */}
                {step === 'email' && (
                    <form onSubmit={handleRequestOtp} className="w-full flex flex-col gap-5 animate-fadeIn">
                        <p className="text-sm text-neutral-500 text-center mb-2 leading-relaxed">
                            Enter the mobile number associated with your account and we will send you a 6-digit verification code.
                        </p>
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-neutral-600 ml-1">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="Enter your mobile number"
                                className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 py-3.5 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Sending...
                                </>
                            ) : 'Send OTP'}
                        </button>

                        <div className="text-center mt-2">
                            <Link to="/login" className="text-sm text-secondary font-bold hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                )}

                {/* Step 2: OTP Verification Form */}
                {step === 'otp' && (
                    <form onSubmit={handleVerifyOtp} className="w-full flex flex-col gap-5 animate-fadeIn">
                        <p className="text-sm text-neutral-500 text-center mb-2 leading-relaxed">
                            We have sent a verification code to <strong className="text-neutral-700">{mobileNumber}</strong>. Please enter the 6-digit code below.
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-neutral-600 ml-1 text-center">
                                Verification Code (OTP)
                            </label>
                            <input
                                type="text"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                placeholder="0 0 0 0 0 0"
                                style={{ letterSpacing: '0.4em' }}
                                className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-300 text-neutral-800 bg-gray-50/50 text-center text-xl font-bold font-mono"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length < 6}
                            className="w-full mt-4 py-3.5 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Verifying...
                                </>
                            ) : 'Verify OTP'}
                        </button>

                        <div className="flex flex-col items-center gap-3 mt-2">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendCooldown > 0 || loading}
                                className={`text-sm font-bold transition-colors ${
                                    resendCooldown > 0 
                                        ? "text-neutral-400 cursor-not-allowed" 
                                        : "text-secondary hover:underline"
                                }`}
                            >
                                {resendCooldown > 0 
                                    ? `Resend OTP in ${resendCooldown}s` 
                                    : 'Resend OTP'}
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline"
                            >
                                Change Mobile Number
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 3: Reset Password Form */}
                {step === 'password' && (
                    <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-5 animate-fadeIn">
                        <p className="text-sm text-neutral-500 text-center mb-2">
                            Enter and confirm your new password below.
                        </p>

                        {/* New Password Field */}
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-sm font-semibold text-neutral-600 ml-1">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Minimum 6 characters"
                                    className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-sm font-semibold text-neutral-600 ml-1">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                    className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none transition-all placeholder:text-gray-400 text-neutral-800 bg-gray-50/50"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || newPassword.length < 6}
                            className="w-full mt-4 py-3.5 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Resetting...
                                </>
                            ) : 'Reset Password'}
                        </button>
                    </form>
                )}

                {/* Step 4: Success Message Screen */}
                {step === 'success' && (
                    <div className="w-full text-center flex flex-col items-center gap-5 animate-fadeIn">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-neutral-800">Success!</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed px-2">
                                Your password has been successfully reset. You can now login to your account using your new password.
                            </p>
                        </div>

                        <Link
                            to="/login"
                            className="w-full mt-4 py-3.5 bg-secondary text-white rounded-xl font-bold text-lg text-center shadow-lg shadow-orange-100 hover:bg-yellow-600 hover:shadow-xl transition-all active:scale-[0.98] block"
                        >
                            Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;

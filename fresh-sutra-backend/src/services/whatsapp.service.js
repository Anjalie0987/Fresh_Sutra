/**
 * WhatsApp Service Abstraction
 * Currently implements Development Mode (console logging)
 * Can be later switched to Meta WhatsApp Cloud API, MSG91, or Twilio
 */

export const sendOtp = async (mobileNumber, otp) => {
    // Phase 1: Development Mode - Console Testing
    console.log(`\n==================================================`);
    console.log(`💬 WHATSAPP OTP MOCK`);
    console.log(`To: ${mobileNumber}`);
    console.log(`Message: Your Fresh Sutra verification code is ${otp}. It will expire in 5 minutes.`);
    console.log(`==================================================\n`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        success: true,
        message: "OTP logged to console successfully",
    };
};

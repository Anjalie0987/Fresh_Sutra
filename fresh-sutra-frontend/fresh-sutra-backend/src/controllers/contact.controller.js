import nodemailer from 'nodemailer';

export const sendContactEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "Name, email, and message are required." });
        }

        if (message.length < 10) {
            return res.status(400).json({ success: false, message: "Message must be at least 10 characters long." });
        }

        // Configure Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email Content
        const mailOptions = {
            from: email, // Sender email (from the form)
            to: process.env.EMAIL_USER, // Receiver email (Admin)
            subject: `New Contact Message – Fresh Sutra: ${subject || 'No Subject'}`,
            text: `
You have received a new contact message.

Name: ${name}
Email: ${email}
Subject: ${subject || 'N/A'}

Message:
${message}
            `
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: "Your message has been sent successfully." });

    } catch (error) {
        console.error("Email sending failed:", error);
        return res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
    }
};

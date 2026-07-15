import nodemailer from 'nodemailer';

export const sendContactEmail = async (req, res) => {
    try {
        const { name, email, phoneNumber, subject, message } = req.body;

        // Validation
        if (!name || (!email && !phoneNumber) || !message) {
            return res.status(400).json({ success: false, message: "Name, contact info (email or phone), and message are required." });
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
            from: email || process.env.EMAIL_USER, // Sender email (from the form, or fallback)
            to: process.env.EMAIL_USER, // Receiver email (Admin)
            subject: `New Contact Message – Fresh Sutra: ${subject || 'No Subject'}`,
            text: `
You have received a new contact message.

Name: ${name}
Email: ${email || 'N/A'}
Phone: ${phoneNumber || 'N/A'}
Subject: ${subject || 'N/A'}

Message:
${message}
            `
        };

        // Send Email asynchronously so the API responds instantly
        transporter.sendMail(mailOptions).catch(err => {
            console.error("Background email sending failed:", err);
        });

        return res.status(200).json({ success: true, message: "Your message has been sent successfully." });

    } catch (error) {
        console.error("Contact API error:", error);
        return res.status(500).json({ success: false, message: "Failed to process the request. Please try again later." });
    }
};

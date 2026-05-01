import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// .env file ab bahar hai, isliye config setup karna padega
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const submitContactForm = async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.trim();
        const phone = req.body.phone?.trim() || 'Not provided';
        const message = req.body.message?.trim();

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required fields." });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Please provide a valid email address." });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email, // Admin directly reply kar sake isliye add kiya
            subject: `New Inquiry from ${name} - Company Contact Form`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
                    <h2 style="color: #333333; margin-top: 0; margin-bottom: 10px;">New Contact Form Submission</h2>
                    <p style="font-size: 14px; color: #555555; margin-bottom: 25px;">You have received a new inquiry from your website.</p>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                        <tr>
                            <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold; width: 30%; color: #333333;">Name</td>
                            <td style="padding: 12px; border: 1px solid #e0e0e0; color: #333333;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold; color: #333333;">Email</td>
                            <td style="padding: 12px; border: 1px solid #e0e0e0;">
                                <a href="mailto:${email}" style="color: #0056b3; text-decoration: none;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold; color: #333333;">Phone</td>
                            <td style="padding: 12px; border: 1px solid #e0e0e0; color: #333333;">${phone}</td>
                        </tr>
                    </table>

                    <h4 style="color: #333333; margin-bottom: 10px; font-size: 16px;">Message:</h4>
                    <blockquote style="border-left: 4px solid #007bff; padding: 15px; margin: 0; color: #555555; background-color: #f8f9fa; border-radius: 4px; font-size: 14px; line-height: 1.5;">
                        ${message}
                    </blockquote>

                    <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0 20px 0;" />
                    <p style="font-size: 12px; color: #999999; text-align: center; margin: 0;">This is an automated email generated from the backend API.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Your message has been sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error." });
    }
};
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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

export const requestConsultation = async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.trim();
        const phone = req.body.phone?.trim() || 'Not provided';
        const serviceType = req.body.serviceType?.trim(); // Dropdown field from frontend
        const message = req.body.message?.trim();

        // Strict Validation: serviceType is now mandatory
        if (!name || !email || !serviceType || !message) {
            return res.status(400).json({ 
                error: "Name, email, service type, and message are required fields." 
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Please provide a valid email address." });
        }

        // Email Payload setup with "replyTo" magic
        const mailOptions = {
            from: `IT Consulting <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL, // Aapki company/sales team ki email
            replyTo: email, // YAHAN HAI MAGIC: Admin jab reply karega, wo direct client (user) ko jayega
            subject: `New IT Consultation Request: ${serviceType} - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px;">IT Consultation Request</h2>
                    <p style="font-size: 15px; color: #444;">A new potential client has requested a consultation.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4; width: 35%;">Client Name</td>
                            <td style="padding: 10px; border: 1px solid #ddd; color: #333;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Email Address</td>
                            <td style="padding: 10px; border: 1px solid #ddd; color: #333;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Phone Number</td>
                            <td style="padding: 10px; border: 1px solid #ddd; color: #333;">${phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #e8f4fd; color: #0056b3;">Interested Service</td>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: #0056b3;">${serviceType}</td>
                        </tr>
                    </table>

                    <h3 style="color: #333; margin-top: 25px;">Project Details / Message:</h3>
                    <blockquote style="border-left: 4px solid #0056b3; padding-left: 15px; color: #555; background: #f9f9f9; padding: 15px; border-radius: 4px; line-height: 1.5;">
                        ${message}
                    </blockquote>
                    
                    <p style="font-size: 13px; color: #888; margin-top: 30px; text-align: center;">
                        <em>Tip: You can directly reply to this email to contact the client.</em>
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ 
            success: true, 
            message: "Consultation request submitted successfully. Our team will contact you soon!" 
        });

    } catch (error) {
        console.error("Consult API Error:", error);
        return res.status(500).json({ 
            success: false, 
            error: "Failed to submit request. Please try again later." 
        });
    }
};
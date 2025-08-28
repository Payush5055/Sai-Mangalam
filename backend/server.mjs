import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import cors from 'cors';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import 'dotenv/config';  // Loads .env variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ dest: join(__dirname, 'uploads/') });  // Temporary storage for files

app.use(cors());  // Allow frontend requests
app.use(express.json());  // For JSON bodies (if needed)

// Email sending endpoint
app.post('/send-email', upload.single('attachment'), async (req, res) => {
    const { name, email, phone, message } = req.body;  // Form fields
    const attachment = req.file;  // Uploaded file (if any)

    // Validate required fields (basic server-side check)
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Set up Nodemailer transporter (use your SMTP details)
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Or your SMTP provider (e.g., SendGrid if you switch later)
        auth: {
            user: process.env.EMAIL_USER,  // Your Gmail address (e.g., patilaayush262@gmail.com)
            pass: process.env.EMAIL_PASS,  // Gmail App Password
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender
        to: 'patilaayush262@gmail.com',  // Recipient
        subject: `New Inquiry from ${name}`,  // Subject line
        text: `
            Full Name: ${name}
            Email: ${email}
            Phone: ${phone || 'Not provided'}
            Message: ${message}
        `,  // Body
        attachments: attachment ? [{ filename: attachment.originalname, path: attachment.path }] : [],  // Attach file if present
    };

    try {
        await transporter.sendMail(mailOptions);
        // Clean up temporary file
        if (attachment) fs.unlinkSync(attachment.path);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        if (attachment) fs.unlinkSync(attachment.path);  // Clean up on error
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

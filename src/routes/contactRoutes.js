import express from 'express';
import rateLimit from 'express-rate-limit';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: { error: "Too many requests, please try again later." }
});

// POST endpoint: /api/contact
router.post('/contact', contactLimiter, submitContactForm);

export default router;
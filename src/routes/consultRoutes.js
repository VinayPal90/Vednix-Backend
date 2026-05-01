import express from 'express';
import rateLimit from 'express-rate-limit';
import { requestConsultation } from '../controllers/consultController.js';

const router = express.Router();

// Rate limiter: Max 3 consultation requests per hour from same IP
const consultLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, 
    message: { error: "You have already requested a consultation recently. Please wait before trying again." }
});

// POST endpoint: /api/consult
router.post('/consult', consultLimiter, requestConsultation);

export default router;
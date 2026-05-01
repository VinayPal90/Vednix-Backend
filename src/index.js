import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import consultRoutes from './routes/consultRoutes.js';

// .env file ko load karna
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Setup
app.use('/api', contactRoutes);
app.use('/api', consultRoutes);

// Base route test karne ke liye (Optional)
app.get('/', (req, res) => {
    res.send('API is running securely inside src folder...');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
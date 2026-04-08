const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

// Connect to MongoDB if possible
connectDB();

const app = express();

/**
 * Middleware: Express configuration
 */
app.use(helmet()); // Adds security headers

const allowedOrigins = [
    'http://localhost:5173', // Your local client for development
    'https://your-netlify-site-name.netlify.app' // REPLACE with your deployed client URL
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
const aiRoutes = require('./routes/ai.routes');
app.use('/api/ai', aiRoutes);

// General health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;

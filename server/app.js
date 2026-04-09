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
    'http://localhost:5173' // Your local client for development
];

// Allow the main Netlify site + deploy previews/branch subdomains
// Examples:
// - https://aistudyhelper252.netlify.app
// - https://deploy-preview-12--aistudyhelper252.netlify.app
// - https://feature-x--aistudyhelper252.netlify.app
const allowedOriginPatterns = [
    /^https:\/\/aistudyhelper252\.netlify\.app$/,
    /^https:\/\/[a-z0-9-]+--aistudyhelper252\.netlify\.app$/
];

const corsOptions = {
    origin: function (origin, callback) {
        // Some mobile in-app browsers/webviews can send Origin: null
        if (!origin || origin === 'null') {
            callback(null, true);
            return;
        }

        if (allowedOrigins.includes(origin) || allowedOriginPatterns.some((re) => re.test(origin))) {
            callback(null, true);
            return;
        }

        callback(new Error('Not allowed by CORS'));
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

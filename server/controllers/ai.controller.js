const AIService = require('../services/ai.service');
const Chat = require('../models/chat.model');

/**
 * AI Controller: Handles incoming requests related to AI processing
 */

// POST /api/ai/ask
exports.askAI = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || question.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: "Please provide a valid question."
            });
        }

        // Call the AI service
        const answer = await AIService.generateAnswer(question);

        let dbId = null;
        // Save entry to MongoDB if URI is configured
        if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'your_mongodb_uri_here') {
            const savedChat = await Chat.create({ question: question.trim(), answer });
            dbId = savedChat._id;
        }

        res.status(200).json({
            success: true,
            answer,
            dbId
        });

    } catch (error) {
        console.error('❌ AI Controller Error:', error.message);
        res.status(500).json({
            success: false,
            error: "An error occurred while processing your request. Please try again later."
        });
    }
};

// GET /api/ai/history
exports.getHistory = async (req, res) => {
    try {
        if (!process.env.MONGODB_URI || process.env.MONGODB_URI === 'your_mongodb_uri_here') {
            return res.status(200).json({
                success: true,
                history: []
            });
        }

        const history = await Chat.find().sort({ timestamp: -1 }).limit(50);
        res.status(200).json({
            success: true,
            history
        });
    } catch (error) {
        console.error('❌ History Fetch Error:', error.message);
        res.status(500).json({
            success: false,
            error: "Could not fetch chat history."
        });
    }
};

// DELETE /api/ai/history/:id
exports.deleteHistory = async (req, res) => {
    try {
        if (!process.env.MONGODB_URI || process.env.MONGODB_URI === 'your_mongodb_uri_here') {
            return res.status(400).json({ success: false, error: "Database not configured." });
        }

        const { id } = req.params;
        const deletedChat = await Chat.findByIdAndDelete(id);

        if (!deletedChat) {
            return res.status(404).json({ success: false, error: "Chat not found." });
        }

        res.status(200).json({ success: true, message: "Chat deleted." });
    } catch (error) {
        console.error('❌ History Delete Error:', error.message);
        res.status(500).json({ success: false, error: "Could not delete chat history." });
    }
};

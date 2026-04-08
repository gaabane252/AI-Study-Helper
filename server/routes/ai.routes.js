const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

/**
 * AI Routes: Endpoints for asking AI and fetching history
 */

// POST /api/ai/ask
router.post('/ask', aiController.askAI);

// GET /api/ai/history
router.get('/history', aiController.getHistory);

// DELETE /api/ai/history/:id
router.delete('/history/:id', aiController.deleteHistory);

module.exports = router;

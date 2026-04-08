const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Chat = require('./models/chat.model');
const AIService = require('./services/ai.service');

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected.");
    
    try {
        console.log("Calling AIService...");
        const answer = await AIService.generateAnswer("Hello");
        console.log("AIService Returned:", answer);
        
        console.log("Saving to MongoDB...");
        await Chat.create({ question: "Hello", answer });
        console.log("Successfully saved to DB!");
        
    } catch (e) {
        console.error("Caught error:", e);
    }
    
    process.exit(0);
}

run();

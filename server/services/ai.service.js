const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');

dotenv.config();

/**
 * AI Service: Interacts with Hugging Face Inference API via official SDK
 */
class AIService {
    static async generateAnswer(question) {
        try {
            const apiKey = process.env.HUGGING_FACE_API_KEY;

            if (!apiKey || apiKey === 'your_hugging_face_api_key_here') {
                return "⚠️ Hugging Face API key is missing or not configured. Please set it in the .env file.";
            }

            const hf = new HfInference(apiKey);

            const result = await hf.chatCompletion({
                model: 'Qwen/Qwen2.5-72B-Instruct',
                messages: [
                    { role: 'system', content: 'You are a helpful study assistant. Provide clear, academic answers.' },
                    { role: 'user', content: question }
                ],
                max_tokens: 500
            });

            if (result && result.choices && result.choices.length > 0) {
                return result.choices[0].message.content.trim();
            }

            return "The AI was unable to generate a response at this time. Please try again.";

        } catch (error) {
            console.error('❌ Hugging Face API Error:', error.message);
            
            // The HF SDK throws standard errors where message often contains details
            const errMsg = error.message.toLowerCase();
            
            if (errMsg.includes('401') || errMsg.includes('unauthorized')) {
                return "Invalid Hugging Face API key. Please check your credentials.";
            } else if (errMsg.includes('403') || errMsg.includes('forbidden') || errMsg.includes('permission')) {
                return "Your Hugging Face API key does not have access permissions. Make sure it is a 'Read' token or has 'Make calls to Inference Providers' enabled.";
            } else if (errMsg.includes('503') || errMsg.includes('loading')) {
                return "The AI model is currently loading or overloaded. Please wait a moment and try again.";
            }
            
            return `AI Service communication failed: ${error.message}`;
        }
    }
}

module.exports = AIService;

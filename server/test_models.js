const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');

dotenv.config();

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

const models = [
  'Qwen/Qwen2.5-72B-Instruct',
  'meta-llama/Llama-3.2-1B-Instruct',
  'HuggingFaceH4/zephyr-7b-beta',
  'microsoft/Phi-3-mini-4k-instruct'
];

async function testModes() {
  for (const model of models) {
    try {
      console.log(`Testing ${model}...`);
      const result = await hf.chatCompletion({
        model: model,
        messages: [{ role: 'user', content: 'What is 2+2?' }],
        max_tokens: 50
      });
      console.log(`SUCCESS ${model}:`, result.choices[0].message.content);
      return model; // Stop early if we find a working one
    } catch (e) {
      console.log(`FAILED ${model}:`, e.message);
    }
  }
}

testModes();

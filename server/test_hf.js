const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const url1 = 'https://api-inference.huggingface.co/v1/chat/completions';
const url2 = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3/v1/chat/completions';

async function test(url) {
  try {
    const res = await axios.post(url, {
      model: 'Qwen/Qwen2.5-72B-Instruct',
      messages: [{ role: 'user', content: 'Hello' }]
    }, {
      headers: { 'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}` }
    });
    console.log(url, "Success:", res.data.choices[0].message);
  } catch (err) {
    console.error(url, "Error:", err.response?.status, err.response?.data);
  }
}

async function run() {
  await test(url1);
  await test(url2);
}
run();

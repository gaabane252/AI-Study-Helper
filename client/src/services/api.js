import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/ai`;

const api = {
  askQuestion: async (question) => {
    const response = await axios.post(`${API_URL}/ask`, { question });
    return response.data;
  },
  getHistory: async () => {
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
  },
  deleteHistory: async (id) => {
    const response = await axios.delete(`${API_URL}/history/${id}`);
    return response.data;
  }
};

export default api;
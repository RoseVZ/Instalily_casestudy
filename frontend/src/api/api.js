import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Store conversation ID for continuity
let conversationId = null;

export const getAIMessage = async (userMessage) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      message: userMessage,
      conversation_id: conversationId
    });

    // Save conversation ID for next message
    conversationId = response.data.conversation_id;

    // Return in your expected format
    return {
      role: "assistant",
      content: response.data.message,
      intent: response.data.intent,
      recommendedParts: response.data.recommended_parts,
      metadata: response.data.metadata
    };

  } catch (error) {
    console.error('API Error:', error);
    
    // Return error message
    return {
      role: "assistant",
      content: "Sorry, I encountered an error. Please try again.",
      isError: true
    };
  }
};

// Optional: Reset conversation
export const resetConversation = () => {
  conversationId = null;
};

// Optional: Search products directly
export const searchProducts = async (query, category = null, limit = 10) => {
  try {
    const params = { q: query, limit };
    if (category) params.category = category;

    const response = await axios.get(`${API_BASE_URL}/products/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Search Error:', error);
    return [];
  }
};

export const getProduct = async (partNumber) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${partNumber}`);
    return response.data;
  } catch (error) {
    console.error('Get Product Error:', error);
    return null;
  }
};
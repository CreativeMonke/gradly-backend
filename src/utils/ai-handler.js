import axios from 'axios';

const LLM_ENDPOINT = process.env.LLM_ENDPOINT;
const LLM_API_KEY = process.env.LLM_API_KEY;

if (!LLM_ENDPOINT) {
  throw new Error('LLM_ENDPOINT is not defined in environment variables.');
}

/**
 * Handles an AI-based request by sending a prompt and context data to LM Studio.
 * @param {string} prompt - The specific task or instruction for the AI.
 * @param {object} context - Additional context data to help the AI generate a better response.
 * @returns {Promise<object>} - The AI-generated response.
 */
export async function handleAiRequest(prompt, context = {}) {
  try {
    const payload = {
      model: 'mathstral-7b-v0.1', // Specify the model
      messages: [
        {
          role: 'system',
          content: 'You are an expert assistant that provides detailed responses.'
        },
        {
          role: 'user',
          content: prompt
        },
        {
          role: 'assistant',
          content: JSON.stringify(context) // Pass structured context data
        }
      ],
    };

    const response = await axios.post(
      LLM_ENDPOINT,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(LLM_API_KEY && { Authorization: `Bearer ${LLM_API_KEY}` })
        },
        timeout: 10000 // 10-second timeout
      }
    );

    if (response.status !== 200 || !response.data) {
      throw new Error('Invalid response from AI model.');
    }

    return response.data;
  } catch (error) {
    console.error(`AI Request Failed: ${error.message}`);
    throw new Error(
      error.response?.data?.message || 'AI request failed. Please try again later.'
    );
  }
}

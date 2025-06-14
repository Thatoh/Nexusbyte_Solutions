import { GoogleGenAI, Chat, GenerateContentResponse, Part } from "@google/genai";
import { ChatMessage, GroundingChunk, GenerateContentResponseWithGrounding } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Chatbot functionality will be limited or non-functional.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // API_KEY can be undefined if not set.

const SYSTEM_INSTRUCTION = "You are NexusByte's helpful AI assistant. Your name is Nova. Be friendly, professional, and informative about NexusByte's ICT solutions, AI, cloud services, cybersecurity, and hybrid work environments. If asked about specific pricing or highly detailed technical specifications not commonly available, suggest contacting a NexusByte sales representative or support. If asked a question that may benefit from recent information (like current events, news, or rapidly evolving tech topics), use Google Search to ground your answer and provide up-to-date details. Always cite your sources if you use search by listing the URLs. When providing URLs, ensure they are accessible and clearly indicate they are sources.";

// Chat instance is now created per session/request in generateChatResponse and streamChatResponse
// to properly include history.

export const generateChatResponse = async (
  prompt: string,
  history: ChatMessage[]
): Promise<{ text: string; groundingChunks?: GroundingChunk[] }> => {
  if (!API_KEY) {
    return { text: "I'm sorry, my connection to the knowledge base is currently unavailable. Please ensure the API key is configured and try again later." };
  }

  const geminiHistory: Part[] = history.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));
  
  const chat = ai.chats.create({ // Create chat instance with current history
      model: 'gemini-2.5-flash-preview-04-17',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{googleSearch: {}}]
      },
      history: geminiHistory,
    });

  try {
    const result: GenerateContentResponse = await chat.sendMessage({ message: prompt });
    const responseText = result.text;
    
    const typedResponse = result as unknown as GenerateContentResponseWithGrounding;
    const groundingChunks = typedResponse.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return { text: responseText, groundingChunks };

  } catch (error) {
    console.error("Error generating chat response from Gemini:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       return { text: "There seems to be an issue with the API configuration. Please contact support." };
    }
    if (error instanceof Error && error.message.includes('quota')) {
      return { text: "I'm experiencing high demand right now. Please try again in a few moments." };
    }
    return { text: "I encountered an issue while processing your request. Please try again." };
  }
};

export const streamChatResponse = async function* (
  prompt: string,
  history: ChatMessage[]
): AsyncGenerator<{ text?: string; error?: string; groundingChunks?: GroundingChunk[]; isFinalChunk?: boolean }> {
  if (!API_KEY) {
    yield { error: "API connection unavailable. Please ensure the API key is configured.", isFinalChunk: true };
    return;
  }
  
  const geminiHistory: Part[] = history.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));

  const currentChatInstance = ai.chats.create({
      model: 'gemini-2.5-flash-preview-04-17',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{googleSearch: {}}]
      },
      history: geminiHistory,
  });

  let fullResponseText = "";
  let finalGroundingChunks: GroundingChunk[] | undefined = undefined;

  try {
    const stream = await currentChatInstance.sendMessageStream({ message: prompt });
    for await (const chunk of stream) { // chunk is GenerateContentResponse
      const currentTextChunk = chunk.text;
      fullResponseText += currentTextChunk; // Accumulate text for consistency if needed, though usually stream implies partial updates.
      
      const typedChunk = chunk as unknown as GenerateContentResponseWithGrounding;
      // Grounding metadata usually comes with later chunks or the final one.
      if (typedChunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        finalGroundingChunks = typedChunk.candidates[0].groundingMetadata.groundingChunks;
      }
      yield { text: currentTextChunk, groundingChunks: finalGroundingChunks };
    }
    // After the loop, yield a final signal with accumulated (or final) data if needed,
    // or just ensure the last chunk from the loop had all info.
    // The current structure yields per chunk, so the client accumulates.
    // Add a final chunk signal for the client to know the stream ended successfully.
    yield { text: '', groundingChunks: finalGroundingChunks, isFinalChunk: true };

  } catch (error) {
    console.error("Error streaming chat response from Gemini:", error);
    let errorMessage = "An error occurred while streaming the response.";
    if (error instanceof Error && error.message.includes('API key not valid')) {
       errorMessage = "There seems to be an issue with the API configuration. Please contact support.";
    } else if (error instanceof Error && error.message.includes('quota')) {
      errorMessage = "I'm experiencing high demand right now. Please try again in a few moments.";
    }
    yield { error: errorMessage, isFinalChunk: true };
  }
};
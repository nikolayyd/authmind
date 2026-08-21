// server/services/chat.service.ts

import { ChatApiError } from '../utils/errors';

export const chatService = {
  async askQuestion(question: string) {
    const CHAT_API_URL = process.env.CHAT_API_URL || 'http://localhost:8000';
    const response = await fetch(`${CHAT_API_URL}/api/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: question }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new ChatApiError(
        data.error || 'Unknown chat error',
        response.status,
      );
    }

    return data.answer;
  },
};

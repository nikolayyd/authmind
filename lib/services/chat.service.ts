// /lib/server/chat.service.ts

export const askChatBot = async (question: string): Promise<string> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from chatbot!');
  }

  const data = await response.json();
  return data.answer as string;
};

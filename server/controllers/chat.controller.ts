import { NextResponse } from 'next/server';
import { ChatApiError } from '@/server/utils/errors';
import { handleChatApiError } from '@/server/utils/chat.handler';
import { chatService } from '@/server/services/chat.service';

// /server/controllers/chat.controller.ts
export const ChatController = {
  async ask(req: Request) {
    try {
      const body = await req.json();
      if (!body.question || typeof body.question !== 'string') {
        throw new ChatApiError('Question is required', 400);
      }
      const answer = await chatService.askQuestion(body.question);
      return NextResponse.json({ answer }, { status: 200 });
    } catch (error: unknown) {
      return handleChatApiError(error);
    }
  },
};

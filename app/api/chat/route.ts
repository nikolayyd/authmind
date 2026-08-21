import { ChatController } from '@/server/controllers/chat.controller';

export async function POST(req: Request) {
  return await ChatController.ask(req);
}

// server/utils/api-handler.ts
import { NextResponse } from 'next/server';
import { ChatApiError } from './errors';

export const handleChatApiError = (error: unknown) => {
  if (error instanceof ChatApiError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  console.error('Unhandled chat error:', error);
  return NextResponse.json(
    { message: 'Internal Server Error' },
    { status: 500 },
  );
};

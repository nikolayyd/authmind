import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '../../lib/generated/prisma/client';

export function handleUserApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { message: 'Validation failed', errors: error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  ) {
    return NextResponse.json(
      { message: 'A user with this email already exists' },
      { status: 409 },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  console.error('Unhandled error:', error);
  return NextResponse.json(
    { message: 'Internal Server Error' },
    { status: 500 },
  );
}

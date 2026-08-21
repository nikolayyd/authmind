// /lib/services/auth.service.ts

import { FetchUser, SignInInput, SignUpInput } from '../schemas/user.schema';

export const signIn = async (userData: SignInInput): Promise<FetchUser> => {
  const response = await fetch(`/api/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to sign in');
  }

  return await response.json();
};

export const signUp = async (userData: SignUpInput): Promise<FetchUser> => {
  const response = await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to sign up');
  }

  return await response.json();
};

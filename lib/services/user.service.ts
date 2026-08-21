// /lib/services/user.service.ts
import { FetchUser } from '../schemas/user.schema';
export const fetchMe = async (): Promise<FetchUser> => {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return (await response.json()) as FetchUser;
};

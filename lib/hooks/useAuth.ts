// /lib/hooks/useAuth.ts
'use-client';
import { fetchMe } from '@/lib/services/user.service';
import { useQuery } from '@tanstack/react-query';
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchMe,
    retry: false,
  });

  return {
    user: isError ? null : (data ?? null),
    isLoading,
  };
};

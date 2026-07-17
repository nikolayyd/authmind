// server/utils/sanitize.ts
export function omitPasswordHash<T extends { passwordHash?: string | null }>(
  user: T,
): Omit<T, 'passwordHash'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = user;
  return rest;
}

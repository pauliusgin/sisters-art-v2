export const extractToken = (url: string): string | null => {
  return new URL(url).searchParams.get("token");
};

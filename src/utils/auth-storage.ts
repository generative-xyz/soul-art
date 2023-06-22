import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/storage-key';

export const getAccessToken = (): string | null => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN) as string;
  return accessToken;
};

export const clearAuthStorage = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const setAccessToken = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

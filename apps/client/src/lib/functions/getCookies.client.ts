'use client';

export function getCookies(name?: string) {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

  if (name) {
    return cookies[name] || null;
  }
  return cookies;
}

//
// Code taken from original django csrf page
//
// https://github.com/django/django/blob/main/django/middleware/csrf.py#L96
//

export const SECRET_LENGTH = 32;
export const TOKEN_LENGTH = 64;
export const CHARS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateCSRFToken = (secret: string) => {
  const mask = Array.from({ length: SECRET_LENGTH })
    .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
    .join('');
  const cipher = Array.from({ length: SECRET_LENGTH })
    .map(
      (_, index) =>
        [CHARS.indexOf(secret[index]), CHARS.indexOf(mask[index])] as const
    )
    .reduce<string[]>((prev, current) => {
      return [...prev, CHARS[(current[0] + current[1]) % CHARS.length]];
    }, [])
    .join('');
  return mask + cipher;
};

export const getCSRFSecret = (): string | null => {
  const cookieName = 'csrftoken=';
  const cookies = decodeURIComponent(document.cookie).split(';');
  const cookie = cookies.find((item) => item.trim().startsWith(cookieName));
  if (!cookie) {
    return null;
  }
  return cookie.trim().substring(cookieName.length);
};

import { parseCookies, setCookie, destroyCookie } from "nookies";

export function saveCookie(
  key: string,
  value: string | Record<string, any> | undefined,
  maxAge?: number
) {
  try {
    if (typeof value === "string") {
      setCookie(null, key, value, {
        maxAge: maxAge || 2 * 60 * 60,
        path: "/",
      });
    } else {
      setCookie(null, key, JSON.stringify(value), {
        maxAge: maxAge || 2 * 60 * 60,
        path: "/",
      });
    }
  } catch (err) {}
}

export function getCookieStorage(key: string, isString = true) {
  try {
    const cookies = parseCookies();

    const value = cookies[key];
    if (value) {
      if (isString) return value;
      return JSON.parse(value);
    }
  } catch (err) {}
}

export function clearCookie(key: string) {
  try {
    destroyCookie(null, key, { path: "/" });
  } catch (err) {}
}

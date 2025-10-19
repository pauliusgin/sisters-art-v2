import { Request, Response, CookieOptions } from "express";
import { cookieOptions } from "../config/config";

export function setToken(payload: {
  res: Response;
  token: string;
  cookieOptions: CookieOptions;
}): void {
  const { res, token, cookieOptions } = payload;
  res.cookie("token", token, cookieOptions);
}

export function deleteToken(payload: { res: Response }): void {
  const { res } = payload;
  const { maxAge, ...deleteCookieOptions } = cookieOptions;

  res.clearCookie("token", deleteCookieOptions);
}

export function checkToken(req: Request): string {
  const auth = req.headers?.cookie;
  return auth?.split("=")[1];
}

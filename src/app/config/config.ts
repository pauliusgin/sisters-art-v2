import type { StringValue } from "ms";
import { CookieOptions } from "express";

export const jwt = {
  secret: process.env.JWT_SECRET,
  config: {
    expiresIn: process.env.JWT_DURATION as StringValue,
  },
};

export const cookieOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === "true",
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 365,
};

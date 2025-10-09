import type { StringValue } from "ms";

export const jwt = {
  secret: process.env.JWT_SECRET,
  config: {
    expiresIn: process.env.JWT_DURATION as StringValue,
  },
  trustedKeyConfig: {
    expiresIn: process.env.JWT_TRUSTED_KEY_DURATION,
  },
};

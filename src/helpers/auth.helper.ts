import { type IJWTPayload, generateToken } from "../lib/jwt.lib.js";
import type { IJwtData } from "../modules/user/user.model.js";
import config from "../config/config.js";

export const signJWT = (jwtData: IJwtData): string => {
  const payload: IJWTPayload = {
    user: jwtData,
  };
  return generateToken(payload, config.Server.accessTokenPrivateKey as string, {
    expiresIn: "1d",
  });
};

export const signRefreshJWT = (jwtData: IJwtData): string => {
  const payload: IJWTPayload = {
    user: jwtData,
  };
  return generateToken(
    payload,
    config.Server.refreshTokenPrivateKey as string,
    {
      expiresIn: "7d",
    }
  );
};

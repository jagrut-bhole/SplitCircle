import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashedPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function isPasswordCorrect(
  password: string,
  passwordHashed: string,
) {
  return await bcrypt.compare(password, passwordHashed);
}

export function generateAccessToken(userId: string, email: string) {
  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  const expiry = process.env.ACCESS_TOKEN_EXPIRY as string;

  if (!secret || !expiry) {
    throw new Error("Access token or expiry not defined!!1");
  }

  //@ts-ignore
  return jwt.sign(
    {
      userId,
      email,
    },
    secret,
    {
      expiresIn: expiry,
    },
  );
}

export function generateRefreshToken(userId: string, email: string) {
  const secret = process.env.REFRESH_TOKEN_SECRET as string;
  const expiry = process.env.REFRESH_TOKEN_EXPIRY as string;

  if (!expiry || !secret) {
    throw new Error("Refresh token or expiry not defined!!");
  }
  //@ts-ignore
  return jwt.sign(
    {
      userId,
      email,
    },
    secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
    },
  );
}

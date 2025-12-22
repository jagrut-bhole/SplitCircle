export declare function hashedPassword(password: string): Promise<string>;
export declare function isPasswordCorrect(
  password: string,
  passwordHashed: string,
): Promise<boolean>;
export declare function generateAccessToken(
  userId: string,
  email: string,
): never;
export declare function generateRefreshToken(
  userId: string,
  email: string,
): never;
//# sourceMappingURL=auth.services.d.ts.map

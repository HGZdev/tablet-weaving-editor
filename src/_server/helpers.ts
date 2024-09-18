import jwt from "jsonwebtoken";
import {loadEnv} from "vite";
import {UserRow} from "./graphql/users";

/** Load environment variables based on the mode */
export const getViteConfig = (
  mode: "development" | "production" | "test"
): ImportMetaEnv => {
  if (!mode) throw new Error("getViteConfig: mode is undefined");
  return loadEnv(mode, process.cwd()) as ImportMetaEnv;
};

const {VITE_JWT_SECRET} = getViteConfig(process.env.NODE_ENV);

if (!VITE_JWT_SECRET)
  throw new Error(
    "getViteConfig: VITE_JWT_SECRET is not defined. Please set it in the environment variables."
  );

export const getUserFromToken = (token: string): UserRow | undefined => {
  if (!token) return;

  try {
    const user = jwt.verify(token, VITE_JWT_SECRET) as UserRow;

    return user;
  } catch (err) {
    console.error("JWT verification failed:", err);
    throw new Error("Invalid token");
  }
};

export const makeTokenFromUser = (
  user: UserRow,
  expiresIn: string = "1h"
): string => {
  if (!user) throw new Error("makeTokenFromUser: user is undefined");

  try {
    const token = jwt.sign(user, VITE_JWT_SECRET, {expiresIn});
    return token;
  } catch (err) {
    console.error("Error creating JWT token:", err);
    throw new Error("Failed to create token");
  }
};

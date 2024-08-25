import jwt from "jsonwebtoken";
import {loadEnv} from "vite";
import {UserRow} from "./graphql/users";

export const getViteConfig = (mode: string | undefined): ImportMetaEnv => {
  if (!mode) throw new Error("getViteConfig: mode is undefined");
  return loadEnv(mode, process.cwd()) as never;
};

const {VITE_JWT_SECRET} = getViteConfig(process.env.NODE_ENV);

if (!VITE_JWT_SECRET) {
  throw new Error(
    "VITE_JWT_SECRET is not defined. Please set it in the environment variables."
  );
}

export const getUserFromToken = (token: string) => {
  if (!token) return;

  try {
    const user = jwt.verify(token, VITE_JWT_SECRET);
    return user;
  } catch (err) {
    console.error("JWT verification failed:", err);
    throw new Error("Invalid token");
  }
};

export const makeTokenFromUser = (user: UserRow, expiresIn: string = "1hr") => {
  if (!user) throw new Error("makeTokenFromUser: user is undefined");

  const token = jwt.sign(user, VITE_JWT_SECRET, {
    expiresIn,
  });

  return token;
};

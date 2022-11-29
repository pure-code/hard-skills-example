import { POSTRequest } from "./createRequest";

export const login = (userEmail: string, password: string) =>
  POSTRequest<{ access_token: string }>("/auth", {
    userEmail,
    password,
  });

export const registerUser = (
  userEmail: string,
  firstName: string,
  password: string
) => POSTRequest("/register", { userEmail, firstName, password });

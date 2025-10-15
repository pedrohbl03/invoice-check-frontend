import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  constructor(message: string, public errors?: unknown) {
    super(message)
  }
}
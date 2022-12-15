import type { Session } from "next-auth";
import type { AuthSession } from "./auth-types";

export const authSessionTransformer = (session: Session): AuthSession => ({
  user: session.user,
  expires: session.expires,
});

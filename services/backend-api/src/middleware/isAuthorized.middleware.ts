import { Request, Response, NextFunction } from "express";
import { User } from "../Features/Users/User.entity";
import { Session } from "../Features/Auth/Session.entity";
import { NotificationError } from "../Common/UnAuthenticatedError";

async function getSession(req: Request, res: Response) {
  const sessionId = req.session.id;
  const session = await Session.findOneBy({ id: sessionId });
  if (!session) {
    NotificationError(res, "User is not logged in");
    return null;
  }
  return session;
}

function getUserId(res: Response, session?: Session | null): string {
  try {
    return JSON.parse(session?.json ?? "{}").passport.user.id;
  } catch (error) {
    NotificationError(res, "Couldn't find user");
    return "";
  }
}

async function getUser(res: Response, session?: Session | null) {
  const userId = getUserId(res, session);
  const user = await User.findOneBy({ id: userId });
  if (!user) {
    NotificationError(res, "Couldn't find user");
    return null;
  }
  return user;
}

function userIsAuthorized(roles: string[], user?: User | null) {
  return roles.some((role) => user?.roles?.includes(role));
}

export function isAuthorized(roles: string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const session = await getSession(req, res);
    const user = await getUser(res, session);
    if (userIsAuthorized(roles, user)) {
      next();
    }
  };
}

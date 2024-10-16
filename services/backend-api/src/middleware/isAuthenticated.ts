import { Request, Response, NextFunction } from "express";
import { ServerResponse } from "../Common/Response";
import { HTTP } from "../Common/http-response.type";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  const response: ServerResponse = {
    data: null,
    errors: [
      {
        message: "User is not authenticated",
        field: "notification",
      },
    ],
  };
  res.status(HTTP.UNAUTHORIZED).send(response);
}

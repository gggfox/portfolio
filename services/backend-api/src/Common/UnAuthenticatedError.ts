import { HTTP } from "./http-response.type";
import { ServerResponse } from "./Response";
import { Response } from "express";

export function NotificationError(res: Response, message: string) {
  const response: ServerResponse = {
    data: null,
    errors: [
      {
        message,
        field: "notification",
      },
    ],
  };

  res.status(HTTP.UNAUTHORIZED).json(response);
}

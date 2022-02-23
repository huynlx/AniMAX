import express, { NextFunction } from "express";
import RequestError from "../errors/requestError";

const errorHandler = (
  err: RequestError | Error,
  _req: express.Request,
  res: express.Response,
  _next: NextFunction
) => {
  console.error(err);

  if (err instanceof RequestError) {
    return res.json({
      success: false,
      error: err.message,
      message: err.userMessage,
    });
  }

  return res.json({
    success: false,
    error: err.message,
    message: `Lỗi server [${err.message}]`,
  });
};

export default errorHandler;

import { MiddlewareObj } from "@middy/core";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import { APIGatewayProxyEvent } from "aws-lambda";

interface JwtPayload {
  userId: string;
  familyId: string;
}

export interface AuthenticatedEvent extends APIGatewayProxyEvent {
  user?: JwtPayload;
}

export const authMiddleware = (): MiddlewareObj<AuthenticatedEvent> => {
  const before: MiddlewareObj<AuthenticatedEvent>["before"] = async (
    request,
  ) => {
    const event = request.event;

    const authHeader =
      event.headers.Authorization || event.headers.authorization;
    if (!authHeader) {
      throw new createError.Unauthorized("Missing Authorization header");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new createError.Unauthorized("Invalid Authorization header format");
    }

    const token = authHeader.slice(7).trim();

    if (!process.env.JWT_SECRET) {
      throw new Error("missing JWT_SECRET");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      event.user = {
        userId: decoded.userId,
        familyId: decoded.familyId,
      };
    } catch {
      throw new createError.Unauthorized("Invalid or expired token");
    }
  };

  return { before };
};
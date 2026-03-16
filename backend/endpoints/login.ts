import { z } from "zod";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "@lib/db";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";

/* zod validering */
const loginSchema = z.object({
  userId: z.string(),
  password: z.string()
});

export const login = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    
    const { userId, password } = loginSchema.parse(JSON.parse(event.body || "{}"));

    const result = await db.send(
      new GetCommand({
        TableName: process.env.USERS_TABLE,
        Key: { userId }
      })
    );

    const user = result.Item;

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    /*  Skapa JWT */
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("missing JWT_SECRET");

    const token = jwt.sign(
        { userId: user.userId, familyId: user.familyId },
        secret,
        { expiresIn: "2h" }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
        user: {
          userId: user.userId,
          name: user.name,
          familyId: user.familyId
        }
      })
    };
};

export const handler = middy(login)
    .use(httpErrorHandler());
import { z } from "zod";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "@lib/db";

/* zod validering */
const loginSchema = z.object({
  userId: z.string(),
  password: z.string()
});

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { userId, password } = loginSchema.parse(JSON.parse(event.body || "{}"));

    const result = await db.send(
      new GetCommand({
        TableName: process.env.USERS_TABLE,
        Key: { userId }
      })
    );

    const user = result.Item;

    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ message: "Invalid credentials" }) };
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return { statusCode: 401, body: JSON.stringify({ message: "Invalid credentials" }) };
    }

    /*  Skapa JWT */
    const token = jwt.sign(
      { userId: user.userId, familyId: user.familyId },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
        user: {
          userID: user.userId,
          name: user.name,
          familyId: user.familyId
        }
      })
    };
  } catch (error: any) {
    return { statusCode: 400, body: JSON.stringify({ message: error.message || "Server error" }) };
  }
};
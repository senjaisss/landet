import { z } from "zod";
import { APIGatewayProxyResult } from "aws-lambda";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";

import { db } from "@lib/db";
import { authMiddleware, AuthenticatedEvent } from "@middlewares/auth";

const bookingSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  people: z.number(),
});

export const postBooking = async (
  event: AuthenticatedEvent,
): Promise<APIGatewayProxyResult> => {
  if (!event.user) {
    throw new createError.Unauthorized("User not authenticated");
  }

  const { userId, familyId } = event.user;

  try {
    const body = event.body ? JSON.parse(event.body) : {};

    const { startDate, endDate, people } = bookingSchema.parse(body);

    const bookingId = `${userId}#${Date.now()}`;

    const item = {
      familyId,
      bookingId,
      userId,
      startDate,
      endDate,
      people,
    };

    await db.send(
      new PutCommand({
        TableName: process.env.BOOKINGS_TABLE,
        Item: item,

        ConditionExpression: "attribute_not_exists(familyId) AND attribute_not_exists(bookingId)",
      }),
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        data: item,
      }),
    };
  } catch (error: any) {
    console.error("Create booking error:", error);

    if (error.statusCode) {
      throw error;
    }
    throw new createError.InternalServerError("Failed to create booking");
  }
};

export const handler = middy(postBooking)
  .use(authMiddleware())
  .use(httpErrorHandler());
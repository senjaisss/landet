import { APIGatewayProxyResult } from "aws-lambda";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";

import { db } from "@lib/db";
import { AuthenticatedEvent, authMiddleware } from "@middlewares/auth";

export const deleteBooking = async (
  event: AuthenticatedEvent,
): Promise<APIGatewayProxyResult> => {
  if (!event.user) {
    throw new createError.Unauthorized("User not authenticated");
  }
  const { familyId, userId } = event.user;

  const bookingId = event.pathParameters?.bookingId;

  if (!bookingId) {
    throw new createError.BadRequest("Booking ID is missing");
  }

  await db.send(
    new DeleteCommand({
      TableName: process.env.BOOKINGS_TABLE,
      Key: {
        familyId,
        bookingId,
      },
      ConditionExpression: "attribute_exists(bookingId) AND userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    }),
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Booking deleted",
      bookingId,
    }),
  };
};

export const handler = middy(deleteBooking)
  .use(authMiddleware())
  .use(httpErrorHandler());
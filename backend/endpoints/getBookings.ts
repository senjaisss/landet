import { APIGatewayProxyResult } from "aws-lambda";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";

import { db } from "@lib/db";
import { authMiddleware, AuthenticatedEvent } from "@middlewares/auth";

export const getBookings = async (
  event: AuthenticatedEvent,
): Promise<APIGatewayProxyResult> => {
  if (!event.user) {
    throw new createError.Unauthorized("User not authenticated");
  }

  const { familyId } = event.user;

  try {
    const result = await db.send(
      new QueryCommand({
        TableName: process.env.BOOKINGS_TABLE,
        KeyConditionExpression: "familyId = :familyId",
        ExpressionAttributeValues: {
          ":familyId": familyId,
        },
      }),
    );

    const bookings = result.Items || [];

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: bookings }),
    };
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    throw new createError.InternalServerError("Failed to fetch bookings");
  }
};

export const handler = middy(getBookings)
  .use(authMiddleware())
  .use(httpErrorHandler());
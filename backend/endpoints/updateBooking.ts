import { APIGatewayProxyResult } from "aws-lambda";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";

import { db } from "@lib/db";
import { AuthenticatedEvent, authMiddleware } from "@middlewares/auth";
import { validateBooking, Booking } from "@lib/validateBooking";
import { getBookingsForFamily } from "@lib/bookingService";
import { bookingSchema } from "./createBooking";

export const updateBooking = async (
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

  const body = event.body ? JSON.parse(event.body) : {};
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    throw new createError.BadRequest(
      parsed.error.issues.map((e) => e.message).join(", "),
    );
  }

  const { startDate, endDate, people } = parsed.data;

  const existingBookings = (await getBookingsForFamily(familyId)).filter(
    (b) => b.bookingId !== bookingId,
  );

  const newBooking: Booking = {
    startDate,
    endDate,
    people,
  };

  validateBooking(newBooking, existingBookings);

  await db.send(
    new UpdateCommand({
      TableName: process.env.BOOKINGS_TABLE,
      Key: { familyId, bookingId },
      UpdateExpression:
        "SET startDate = :startDate, endDate = :endDate, people = :people",
      ExpressionAttributeValues: {
        ":startDate": startDate,
        ":endDate": endDate,
        ":people": people,
        ":userId": userId,
      },
      ConditionExpression: "userId = :userId",
      ReturnValues: "ALL_NEW",
    }),
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Booking updated",
      bookingId,
      data: newBooking,
    }),
  };
};

export const handler = middy(updateBooking)
  .use(authMiddleware())
  .use(httpErrorHandler());

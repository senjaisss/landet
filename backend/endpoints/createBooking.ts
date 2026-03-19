import { z } from "zod";
import { APIGatewayProxyResult } from "aws-lambda";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";

import { db } from "@lib/db";
import { authMiddleware, AuthenticatedEvent } from "@middlewares/auth";
import { validateBooking, Booking } from "@lib/validateBooking";
import { isValidISODate } from "@lib/dateUtils";
import { getBookingsForFamily } from "@lib/bookingService";

export const bookingSchema = z.object({
  startDate: z.string().refine(isValidISODate, {
    message: "startDate must be a valid date",
  }),
  endDate: z.string().refine(isValidISODate, {
    message: "endDate must be a valid date",
  }),
  people: z.number().int().min(1),
});

export const postBooking = async (
  event: AuthenticatedEvent,
): Promise<APIGatewayProxyResult> => {
  if (!event.user) {
    throw new createError.Unauthorized("User not authenticated");
  }
    const { userId, familyId } = event.user;

    const body = event.body ? JSON.parse(event.body) : {};
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
    throw new createError.BadRequest(
        parsed.error.issues.map(e => e.message).join(", ")
    );
    }

    const { startDate, endDate, people } = parsed.data;

    const bookingId = `${userId}_${Date.now()}`;

    const existingBookings = await getBookingsForFamily(familyId);

    const newBooking: Booking = {
        startDate,
        endDate,
        people,
    };

    const item = {
      familyId,
      bookingId,
      userId,
      startDate,
      endDate,
      people,
    };

    validateBooking(newBooking, existingBookings);
    
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
};

export const handler = middy(postBooking)
  .use(authMiddleware())
  .use(httpErrorHandler());
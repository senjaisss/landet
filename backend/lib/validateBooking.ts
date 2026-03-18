import createError from "http-errors";

export interface Booking {
  startDate: string;
  endDate: string;
  people: number;
}

export const validateBooking = (
    newBooking: Booking,
    existingBookings: Booking[],
) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(newBooking.startDate);
    const end = new Date(newBooking.endDate);

    if (start > end) {
        throw new createError.BadRequest("Start date cannot be after end date");
    }

    if (start < today) {
        throw new createError.BadRequest("Start date cannot be in the past");
    }

    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
    if (duration > 14) {
        throw new createError.BadRequest("Booking cannot be longer than 14 days");
    }

    for (const booking of existingBookings) {
        const existingStart = new Date(booking.startDate);
        const existingEnd = new Date(booking.endDate);

        if (start <= existingEnd && end >= existingStart) {
            throw new createError.BadRequest("Booking dates overlap with an existing booking");
        }
    }

    if (newBooking.people < 1) {
        throw new createError.BadRequest("Number of people must be at least 1");
    }

    if (newBooking.people > 10 ) {
        throw new createError.BadRequest("Number of people cannot be over 10");
    }

    return true;
};
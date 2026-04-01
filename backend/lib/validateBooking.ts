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
        throw new createError.BadRequest("Start datum kan ej vara efter slut datum.");
    }

    if (start < today) {
        throw new createError.BadRequest("Start datum har redan passerat.");
    }

    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
    if (duration > 14) {
        throw new createError.BadRequest("En bokning kan ej vara längre än 14 dagar.");
    }

    for (const booking of existingBookings) {
        const existingStart = new Date(booking.startDate);
        const existingEnd = new Date(booking.endDate);

        if (start <= existingEnd && end >= existingStart) {
            throw new createError.BadRequest("Datumen överlappar med en befintlig bokning.");
        }
    }

    if (newBooking.people < 1) {
        throw new createError.BadRequest("Antal personer måste vara minst 1.");
    }

    if (newBooking.people > 10 ) {
        throw new createError.BadRequest("Antal personer kan ej vara mer än 10.");
    }

    return true;
};
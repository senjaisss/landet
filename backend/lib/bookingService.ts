import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "./db";

export const getBookingsForFamily = async (familyId: string) => {
    const result = await db.send(
        new QueryCommand({
            TableName: process.env.BOOKINGS_TABLE,
            KeyConditionExpression: "familyId = :familyId",
            ExpressionAttributeValues: { ":familyId": familyId },
        }),
    );
    
    return (result.Items || []).map(b => ({
    startDate: b.startDate,
    endDate: b.endDate,
    people: b.people,
  }));
};

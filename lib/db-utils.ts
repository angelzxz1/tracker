import { db } from "./db";

export const findYear = async (currentYear: string) => {
    try {
        return await db.yearlySpent.findUnique({
            where: {
                currentYear,
            },
        });
    } catch (error) {
        throw new Error("Error finding year");
    }
};
export const createYear = async (currentYear: string, userId: string) => {
    try {
        return await db.yearlySpent.create({
            data: {
                amountSpent: 0,
                currentYear,
                ownerId: userId,
            },
        });
    } catch (error) {
        throw new Error("Error creating a new year");
    }
};

export const findMonth = async (currentMonth: string, yearId: string) => {
    try {
        return await db.monthlySpent.findFirst({
            where: {
                currentMonth,
                yearId: yearId,
            },
        });
    } catch (error) {
        throw new Error("Error finding month");
    }
};
export const createMonth = async (
    currentMonth: string,
    userId: string,
    yearId: string
) => {
    console.log(currentMonth, userId, yearId);
    try {
        return await db.monthlySpent.create({
            data: {
                amountSpent: 0,
                currentMonth,
                ownerId: userId,
                yearId,
            },
        });
    } catch (error) {
        console.log(error);
        throw new Error("Error creating a new month");
    }
};

export const updateMonthly = async (
    amountIncreased: number,
    monthId: string
) => {
    try {
        await db.monthlySpent.update({
            data: {
                amountSpent: amountIncreased,
            },
            where: {
                id: monthId,
            },
        });
    } catch (error) {
        throw new Error("Error updating the month");
    }
};
export const updateYearly = async (amountIncreased: number, yearId: string) => {
    try {
        await db.yearlySpent.update({
            data: {
                amountSpent: amountIncreased,
            },
            where: {
                id: yearId,
            },
        });
    } catch (error) {
        throw new Error("Error updating the year");
    }
};

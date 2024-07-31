import { User } from "@prisma/client";
import { db } from "./db";

const dayChange = (fechaString: string): boolean => {
    const fecha = new Date(fechaString);
    const hoy = new Date();
    return (
        fecha.getDate() !== hoy.getDate() ||
        fecha.getMonth() !== hoy.getMonth() ||
        fecha.getFullYear() !== hoy.getFullYear()
    );
};

const weekChange = (fechaString: string): boolean => {
    const getWeekNumber = (date: Date): number => {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear =
            (date.getTime() - startOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    };

    const fecha = new Date(fechaString);
    const hoy = new Date();
    return (
        getWeekNumber(fecha) !== getWeekNumber(hoy) ||
        fecha.getFullYear() !== hoy.getFullYear()
    );
};

const monthChange = (fechaString: string): boolean => {
    const fecha = new Date(fechaString);
    const hoy = new Date();
    return (
        fecha.getMonth() !== hoy.getMonth() ||
        fecha.getFullYear() !== hoy.getFullYear()
    );
};

const yearChange = (fechaString: string): boolean => {
    const fecha = new Date(fechaString);
    const hoy = new Date();
    return fecha.getFullYear() !== hoy.getFullYear();
};

export const updateStatus = async (user: User) => {
    try {
        // const now = new Date();

        const lastPurchaseDate = await db.purchase.findFirst({
            where: {
                ownerId: user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        if (!lastPurchaseDate) return;
        const dateToCheck = lastPurchaseDate.createdAt.toISOString();
        let day = 0,
            week = 0,
            mth = 0,
            year = 0;
        if (!dayChange(dateToCheck)) day = user.currentDay;
        if (!weekChange(dateToCheck)) week = user.currentWeek;
        if (!monthChange(dateToCheck)) mth = user.currentMonth;
        if (!yearChange(dateToCheck)) year = user.currentYear;
        await db.user.update({
            data: {
                currentDay: day,
                currentWeek: week,
                currentMonth: mth,
                currentYear: year,
            },
            where: {
                id: user.id,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

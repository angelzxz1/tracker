import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { User } from "@prisma/client";
import {
    findYear,
    createYear,
    findMonth,
    createMonth,
    updateMonthly,
    updateYearly,
} from "@/lib/db-utils";
import { updateStatus } from "@/lib/update-status";

const updateUserData = async (amount: number, user: User, dop: Date) => {
    try {
        updateStatus(user); // Actualiza la info del user

        let year = await findYear(dop.getFullYear().toString()); // Busca el year actual
        if (!year)
            year = await createYear(dop.getFullYear().toString(), user.id); // Si no lo encuentra lo crea y se lo asigna a year
        let month = await findMonth(dop.getMonth().toString(), year.id); // Busca el mes actual
        if (!month)
            month = await createMonth(
                dop.getMonth().toString(),
                user.id,
                year.id
            ); // Si no lo encuentra lo crea y se lo asigna a month
        await updateMonthly(month.amountSpent + amount, month.id); // Actualiza lo gastado en el mes
        await updateYearly(year.amountSpent + amount, year.id); // Actualiza lo gastado en el year

        await db.user.update({
            data: {
                currentDay: user.currentDay + amount,
                currentWeek: user.currentWeek + amount,
                currentMonth: user.currentMonth + amount,
                currentYear: user.currentYear + amount,
            },
            where: {
                id: user.id,
            },
        });

        return month;
    } catch (error) {
        console.log(error);
        return;
    }
};

export async function POST(req: NextRequest) {
    try {
        const { amount, description, dop } = await req.json();
        if (!amount) {
            return new NextResponse("No amount", {
                status: 400,
            });
        }
        if (!description) {
            return new NextResponse("No description", {
                status: 400,
            });
        }
        if (!dop) {
            return new NextResponse("No date of purchase", {
                status: 400,
            });
        }
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const dateOfPurchase = new Date(dop);
        console.log(dop, dateOfPurchase);
        const month = await updateUserData(
            parseInt(amount),
            profile,
            dateOfPurchase
        );
        if (!month)
            return new NextResponse("Something went wrong while updating", {
                status: 500,
            });
        const purchase = await db.purchase.create({
            data: {
                amountSpent: amount,
                description: description,
                ownerId: profile.id,
                monthId: month.id,
                createdAt: dop,
            },
        });

        return NextResponse.json({
            message: "Purchase added",
            purchase,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

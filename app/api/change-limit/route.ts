import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { User } from "@prisma/client";

export async function PUT(req: NextRequest) {
    try {
        const { limit } = await req.json();
        if (!limit) {
            return new NextResponse("No limit value", {
                status: 400,
            });
        }
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        let lastYear = await db.yearlySpent.findFirst({
            where: {
                ownerId: profile.id,
            },
        });

        if (!lastYear) {
            lastYear = await db.yearlySpent.create({
                data: {
                    amountSpent: 0,
                    currentYear: new Date().getFullYear().toString(),
                    ownerId: profile.id,
                },
            });
        }
        let lastMonth = await db.monthlySpent.findFirst({
            where: {
                ownerId: profile.id,
                yearId: lastYear.id,
            },
        });

        if (!lastMonth) {
            lastMonth = await db.monthlySpent.create({
                data: {
                    amountSpent: 0,
                    currentMonth: new Date().getMonth().toString(),
                    ownerId: profile.id,
                    monthlyLimit: parseInt(limit),
                    yearId: lastYear.id,
                },
            });
        } else {
            await db.monthlySpent.update({
                where: {
                    id: lastMonth.id,
                    ownerId: profile.id,
                },
                data: {
                    monthlyLimit: parseInt(limit),
                },
            });
        }
        await db.user.update({
            where: {
                id: profile.id,
            },
            data: {
                limit: parseInt(limit),
            },
        });
        return NextResponse.json({
            message: "Limit updated",
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

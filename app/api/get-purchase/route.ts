import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { date7DaysAgo } from "@/lib/utils";

export async function GET(req: NextRequest) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const last7Day = date7DaysAgo().toISOString();
        const purchases = (
            await db.purchase.findMany({
                where: {
                    AND: [
                        {
                            ownerId: profile.id,
                        },
                        {
                            createdAt: {
                                gte: last7Day,
                            },
                        },
                    ],
                },
                orderBy: {
                    createdAt: "desc",
                },
            })
        ).map((item) => {
            return {
                ...item,
                amountSpent: parseInt(item.amountSpent),
            };
        });
        console.log();
        return NextResponse.json({
            message: "Last 7 returned",
            purchases,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

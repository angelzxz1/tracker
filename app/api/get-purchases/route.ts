import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function GET(req: NextRequest) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const purchases = (
            await db.purchase.findMany({
                where: {
                    ownerId: profile.id,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 5,
            })
        ).map((item) => {
            return {
                ...item,
                amountSpent: parseInt(item.amountSpent),
            };
        });
        return NextResponse.json({
            message: "Last 5 purchases returned",
            purchases,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

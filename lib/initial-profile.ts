import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { User } from "@prisma/client";

export const initialProfile = async (): Promise<User> => {
    const user = await currentUser();

    if (!user) return auth().redirectToSignIn();
    const profile = await db.user.findUnique({
        where: { userId: user.id },
    });

    if (!profile) {
        console.log("Profile Not Found");
        return await db.user.create({
            data: {
                userId: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstName: user.firstName ? user.firstName : "",
                lastName: user.lastName ? user.lastName : "",
                username: user.username
                    ? user.username
                    : user.emailAddresses[0].emailAddress,
                password: "",
                imageUrl: user.imageUrl,
                currentDay: 0,
                currentMonth: 0,
                currentWeek: 0,
                currentYear: 0,
                limit: 0,
            },
        });
    }
    return profile;
};

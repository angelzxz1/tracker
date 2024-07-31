import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { getFullMonthOfTheYear } from "@/lib/utils";

interface ProgressWithTextProps {
    children: React.ReactNode;
    spent: number;
    total: number;
}
const ProgressWithText = ({
    children,
    spent,
    total,
}: ProgressWithTextProps) => {
    const value = spent >= total ? 100 : (spent / total) * 100;
    return (
        <div className="relative w-full flex items-center justify-center">
            <Progress className="absolute w-full min-h-6" value={value} />
            <div className="absolute w-full h-fit grid place-content-center text-inherit bg-black/30">
                {children}
            </div>
        </div>
    );
};

export const LastTwelveMonths = async ({ userId }: { userId: string }) => {
    const lastMonths = await db.monthlySpent.findMany({
        where: {
            ownerId: userId,
        },
        take: 12,
    });
    return (
        <div className="h-full w-full flex items-center justify-center px-4 gap-2 flex-wrap">
            {lastMonths.map((month) => {
                const { amountSpent, monthlyLimit, currentMonth } = month;
                return (
                    <ProgressWithText
                        key={`spentvstotal-${month.id}`}
                        spent={amountSpent}
                        total={monthlyLimit}
                    >
                        {getFullMonthOfTheYear(parseInt(currentMonth))}
                    </ProgressWithText>
                );
            })}
        </div>
    );
};

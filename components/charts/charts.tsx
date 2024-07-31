"use client";
import {
    Average,
    Max,
    Min,
    calcDec,
    cn,
    formatCurrency,
    getDayOfTheWeek,
    getFormat,
    getMonthOfTheYear,
    groupItemsByDate,
    groupMedia,
} from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export type Data = {
    id: string;
    amountSpent: number;
    description: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
};

type ChartType = {
    className?: string;
    byClass?: boolean;
    data: Data[];
};

export const Charts = ({
    className = "",
    byClass = false,
    data,
}: ChartType) => {
    if (byClass) {
        return <div className={className}></div>;
    }
    const byDay = groupMedia(groupItemsByDate(data));
    const min = Min(byDay).spent;
    const max = calcDec(Max(byDay).spent);
    const horBars = ((max: number) => {
        const divisions = max / 10;
        const arrDivs = [];
        for (let i = 1; i <= 10; i++) {
            arrDivs.push(Math.round(divisions * i * 10) / 10);
        }
        return arrDivs;
    })(max).reverse();
    return (
        <>
            <div className="absolute h-full w-full z-0 flex flex-wrap ">
                {horBars.map((value, i) =>
                    i === 0 ? (
                        <span
                            className="w-full h-[10%] border-white/15 text-white/50"
                            key={i}
                        >
                            <span className="ml-1">{`${formatCurrency(
                                value
                            )}`}</span>
                        </span>
                    ) : (
                        <span
                            className="w-full h-[10%] border-t border-white/15  text-white/50"
                            key={i}
                        >
                            <span className="ml-1">{`${formatCurrency(
                                value
                            )}`}</span>
                        </span>
                    )
                )}
            </div>
            <div className="h-full absolute w-full z-10 flex items-end justify-evenly pl-4">
                {byDay.reverse().map((item, i) => {
                    const { spent: amountSpent, day: createdAt } = item;
                    const { day, date, month, year } = getFormat(
                        new Date(`${createdAt}T05:00:00.000Z`)
                    );
                    const percentage = Math.round((amountSpent * 100) / max);
                    return (
                        <div
                            key={i}
                            style={{
                                height: `${percentage}%`,
                            }}
                            className={cn(
                                "w-6 hover:shadow-lines graphic-lines-father hover:bg-[#00FF85]",
                                min === amountSpent
                                    ? "bg-[#0047FF]"
                                    : "bg-[#00c93c]"
                            )}
                        >
                            <div className="graphic-lines-child absolute hidden bg-black/85 p-2 top-[10px] right-[10px]">
                                <div className="text-xl">{`${getDayOfTheWeek(
                                    day
                                )}, ${getMonthOfTheYear(
                                    month
                                )} ${date} ${year}`}</div>
                                <div className="text-xl">{`${formatCurrency(
                                    amountSpent
                                )}`}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

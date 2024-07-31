"use client";
import {
    formatCurrency,
    getDayOfTheWeek,
    getFormat,
    getMonthOfTheYear,
} from "@/lib/utils";
import { Charts, Data } from "@/components/charts/charts";
import axios from "axios";
import { useEffect, useState } from "react";

export const Graphic = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<Data[]>([]);
    const horBars = ((max: number) => {
        const divisions = max / 10;
        const arrDivs = [];
        for (let i = 1; i <= 10; i++) {
            arrDivs.push(Math.round(divisions * i * 10) / 10);
        }
        return arrDivs;
    })(500000).reverse();
    useEffect(() => {
        axios
            .get<{ message: string; purchases: Data[] }>("/api/get-purchase")
            .then((res) => {
                setData(res.data.purchases);
                setIsLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (!isLoaded)
        return (
            <div className="flex w-full relative h-full">
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
            </div>
        );
    return (
        <div className="flex w-full relative h-full">
            <Charts data={data} />
        </div>
    );
};

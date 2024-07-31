"use client";

import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Purchase } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { LastPurchaseSkeleton } from "./skeleton/last-purchases-skeleton";

export const LastPurchases = () => {
    const [purchases, SetPurchases] = useState<Purchase[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    useEffect(() => {
        axios
            .get("/api/get-purchases")
            .then((res) => {
                SetPurchases(res.data.purchases);
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setLoaded(false);
            });
    }, []);
    if (!loaded)
        return (
            <section className="h-full w-full mt-4">
                <LastPurchaseSkeleton />
            </section>
        );
    if (purchases.length === 0)
        return (
            <section className="h-full w-full flex items-center justify-center">
                No purchases made
            </section>
        );
    return (
        <section className="h-full w-full">
            {purchases.map((purchase, i) => {
                return (
                    <div
                        key={purchase.id}
                        className={cn(
                            "flex w-full text-lg gap-2 border-white/15 pl-4 py-2",
                            i === purchases.length - 1 ? "border-b" : "",
                            i === 0 ? "" : "border-t"
                        )}
                    >
                        <div className="w-1/3 flex justify-center items-center border-r p-2">
                            {
                                formatDate(new Date(purchase.createdAt)).split(
                                    ", "
                                )[1]
                            }
                        </div>
                        <div className="w-1/3 flex justify-center items-center text-justify border-r p-2">
                            {purchase.description}
                        </div>
                        <div className="w-1/3 flex justify-center items-center ">
                            {formatCurrency(parseInt(purchase.amountSpent))}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

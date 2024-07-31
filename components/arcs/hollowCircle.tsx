"use client";
import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
interface HollowCircleProps {
    amount: number;
    max: number;
}
export const HollowCircle = ({ amount, max }: HollowCircleProps) => {
    const data = {
        labels: ["Consumed", "Left"],
        datasets: [
            {
                data: [amount, max - amount],
                backgroundColor: [
                    " rgba(0, 255, 133, 1)",
                    " rgba(130, 119, 141, 0.5)",
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <Doughnut
            data={data}
            options={{
                responsive: true,
                aspectRatio: 1,
            }}
        />
    );
};

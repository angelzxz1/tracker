"use client";

import { useEffect, useState } from "react";

export const TextShowing = ({ text = "sample" }: { text?: string }) => {
    const [txt, setTxt] = useState<string>("");
    const [i, setI] = useState<number>(0);
    useEffect(() => {
        if (i < text.length) {
            setTimeout(() => {
                setTxt((prev) => {
                    return text.slice(0, i + 1);
                });
                setI(i + 1);
            }, 30);
        }
    }, [i, text]);
    console.log("this is loading");
    return <>{txt}</>;
};

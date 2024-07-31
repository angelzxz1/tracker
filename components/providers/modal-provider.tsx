"use client";

import { AddPurchaseModal } from "@/components/modals/add-purchase-modal";
import { useEffect, useState } from "react";
import { ChangeLimitModal } from "../modals/change-limit-modal";

export const ModalProvider = () => {
    const [isMonted, setIsMonted] = useState<boolean>(false);
    useEffect(() => {
        setIsMonted(true);
    }, []);
    if (!isMonted) return <></>;
    return (
        <>
            <AddPurchaseModal />
            <ChangeLimitModal />
        </>
    );
};

"use client";
import { Plus } from "lucide-react";
import { ModalType, useModal } from "@/hooks/use-modal-store";

import { Button } from "@/components/ui/button";

interface OpenModalButtonProps {
    type: ModalType;
    children?: React.ReactNode;
}

export const OpenModalButton = ({ type, children }: OpenModalButtonProps) => {
    const { onOpen } = useModal();
    if (!children)
        return (
            <Button onClick={() => onOpen(type)} className="p-2 h-auto">
                <Plus />
            </Button>
        );
    return (
        <Button
            onClick={() => onOpen(type)}
            className=""
            variant="clear"
            size="clear"
        >
            {children}
        </Button>
    );
};

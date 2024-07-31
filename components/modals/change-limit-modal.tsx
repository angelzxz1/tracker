"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ChangeLimitForm } from "../Forms/change-limit";

export function ChangeLimitModal() {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "editLimit";

    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Change limit</DialogTitle>
                </DialogHeader>
                <ChangeLimitForm />
            </DialogContent>
        </Dialog>
    );
}

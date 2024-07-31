"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { AddPurchaseForm } from "../Forms/add-purchase";

export function AddPurchaseModal() {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "addPurchase";

    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Add Purchase</DialogTitle>
                </DialogHeader>
                <AddPurchaseForm />
            </DialogContent>
        </Dialog>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface ModalComponentInterface {
    Modal: ({ children, buttonText }: ModalProps) => JSX.Element;
    toggle: () => void;
}
interface ModalProps {
    children: React.ReactNode;
    buttonText: React.ReactNode;
    sample: boolean;
}
export function Modal({ children, buttonText, sample }: ModalProps) {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    useEffect(() => {
        toggle();
    }, [sample]);
    function toggle() {
        if (!modalRef.current) return;
        if (modalRef.current.open) {
            return modalRef.current.close();
        }
        return modalRef.current.showModal();
    }

    return (
        <>
            <Button
                onClick={() => {
                    if (modalRef.current) {
                        modalRef.current.showModal();
                    }
                }}
                className="p-2 h-auto"
            >
                {buttonText}
            </Button>
            <dialog ref={modalRef} className=" p-2 ">
                <div className="flex w-full justify-end">
                    <Button
                        onClick={() => {
                            if (modalRef.current) {
                                modalRef.current.close();
                            }
                        }}
                        className="h-auto w-auto p-0 m-0 bg-transparent"
                    >
                        <X className="text-white bg-red-600" />
                    </Button>
                </div>

                {children}
            </dialog>
        </>
    );
}

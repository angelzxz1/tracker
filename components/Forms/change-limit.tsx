"use client";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
    limit: z.string().min(2).max(20),
});

export function ChangeLimitForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { onClose } = useModal();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            await axios.put("/api/change-limit", values);

            form.reset();
            onClose();
            router.refresh();
            window.location.reload();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-8 p-2"
            >
                <FormField
                    control={form.control}
                    name="limit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="pl-3">New Limit</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    placeholder="New limit for this month"
                                    className="rounded-none"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Change"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

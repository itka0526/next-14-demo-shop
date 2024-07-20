"use client";

import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { subscribeToNewsletter } from "@/lib/actions";
import { FormState } from "@/lib/types";
import { toast } from "react-hot-toast";

export function Newsletter() {
    const initialState: FormState = { message: null, errors: {} };
    const [formState, formAction, isPending] = useFormState(subscribeToNewsletter, initialState);
    if (formState.message) {
        toast.error(formState.message);
    }
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                        Манай мэдээллийн хуудсаар шинэ мэдээллүүдийг хүлээн аваарай
                    </h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Хамгийн сүүлийн үеийн мэдээлэл, онцгой санал болон бусад мэдээллийг авах боломжтой.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <form className="flex gap-2" action={formAction}>
                        <Input type="email" placeholder="Та имэйл хаяг аа оруулна уу" name="email" className="max-w-lg flex-1" />
                        <Button type="submit" disabled={isPending}>
                            Нэгдэх
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

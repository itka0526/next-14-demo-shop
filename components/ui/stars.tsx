"use client";

import { rateProduct } from "@/lib/actions";
import { FormState } from "@/lib/types";
import { User } from "@prisma/client";
import { StarHalfIcon, StarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type StarsProps = { readonly averageScore: number; readonly user: User | null; readonly productId: number; readonly count: number };

export function Stars({ averageScore, count, user, productId }: StarsProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [formState, formAction, isPending] = useFormState(rateProduct, undefined);
    const [stars, setStars] = useState<{ score: number; userEntered: boolean }>({ score: averageScore, userEntered: false });

    useEffect(() => {
        if (formState?.errors && Object.keys(formState.errors).length > 0)
            Object.entries(formState.errors).map(([field, errMsgs]) => errMsgs.map((errMsg) => toast.error(`${errMsg} \nТалбар: '${field}'`)));
        else if (formState?.message) {
            if (formState.errors && Object.keys(formState.errors).length > 0) {
                toast.error(formState.message);
            } else {
                toast.success(formState.message);
            }
        }
    }, [formState?.message, formState?.errors]);

    const handleStar = (score: number) => {
        setStars((prevState) => {
            if (prevState.userEntered) {
                return { userEntered: false, score: averageScore };
            } else {
                return { userEntered: true, score: score };
            }
        });
    };

    const handleSubmit = () => {
        if (!user) {
            toast.error("Та эхлээд нэвтэрнэ үү.");
        } else if (isPending) {
            toast.error("Та түр хүлээнэ үү.");
        } else if (stars.userEntered) {
            const formData = new FormData();
            formData.set("userId", user.id.toString());
            formData.set("productId", productId.toString());
            formData.set("stars", stars.score.toString());
            formData.set("comment", textAreaRef.current?.value ?? "");
            formAction(formData);
        } else {
            toast.error("Та бүх талбаруудийг бөглөнө үү.");
        }
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 cursor-pointer">
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={`star-${index + 1}`}
                            userEntered={stars.userEntered}
                            score={stars.score - index}
                            onClick={() => handleStar(index + 1)}
                        />
                    ))}
                </div>
                <span className="text-muted-foreground text-sm">({count})</span>
            </div>
            <div className="flex items-center gap-2">
                <textarea
                    ref={textAreaRef}
                    name="comment"
                    className="p-2 rounded-md border border-muted-foreground/20 text-sm text-muted-foreground"
                    placeholder="Сэтгэгдэл бичих..."
                    rows={2}
                />
                <Button size="sm" onClick={handleSubmit}>
                    Илгээх
                </Button>
            </div>
        </>
    );
}

export function Star({ score, userEntered, onClick }: { readonly score: number; readonly userEntered: boolean; readonly onClick: () => void }) {
    const className = cn("transition-transform w-7 h-7", userEntered ? "fill-secondary scale-105" : "fill-primary ");
    if (score >= 1) return <StarIcon className={className} onClick={onClick} />;
    else if (score >= 0.5) return <StarHalfIcon className={className} onClick={onClick} />;
    else return <StarIcon className={cn("w-7 h-7 fill-none", userEntered ? "scale-105" : "")} onClick={onClick} />;
}

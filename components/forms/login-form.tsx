"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { loginUser } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { FormState } from "@/lib/types";
import { useEffect } from "react";

export function LoginForm() {
    const initialState: FormState = { message: null, errors: {} };
    const [formState, formAction, isPending] = useFormState(loginUser, initialState);
    if (formState.message) {
        toast.error(formState.message);
    }
    useEffect(() => {
        console.log(isPending);
    }, [isPending]);
    return (
        <form className="flex items-center justify-center h-screen bg-background" action={formAction}>
            <Card className="w-full max-w-md p-6 sm:p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Нэвтрэх</CardTitle>
                    <CardDescription>Нэвтрэхийн тулд и-мэйл хаяг, нууц үгээ оруулна уу.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">И-мэйл хаяг</Label>
                        <Input name="email" id="email" type="email" placeholder="И-мэйл хаягаа оруулна уу" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Нууц үг</Label>
                        <Input name="password" id="password" type="password" placeholder="Нууц үгээ оруулна уу" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" aria-disabled={isPending}>
                        Нэвтрэх
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

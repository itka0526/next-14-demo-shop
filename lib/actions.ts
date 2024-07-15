"use server";

import { redirect } from "next/navigation";
import prisma from "./db";
import { FormState, RegisterUserSchema } from "./types";

export async function registerUser(prevState: FormState, formData: FormData): Promise<FormState> {
    const rawFormData = Object.fromEntries(formData.entries());
    // Validating data using zod
    const validatedFields = RegisterUserSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Алдаатай талбаруудтай байна. Бүртгэл амжилтгүй боллоо.",
        };
    }
    // Creating a new entry in the database
    try {
        const { email, name, password } = validatedFields.data;
        const currentDate = new Date().toISOString();
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password,
                createdAt: currentDate,
                updatedAt: currentDate,
            },
        });
        if (!user) {
            throw new Error("Алдаа гарлаа.");
        }
    } catch (error) {
        console.error(error);
        return {
            errors: {},
            message: "Cервер дээр алдаа гарлаа.",
        };
    }
    // If all goes to plan this function should execute
    redirect("/login");
}

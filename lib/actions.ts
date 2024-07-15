"use server";

import { redirect } from "next/navigation";
import prisma from "./db";
import { FormState, LoginUserSchema, RegisterUserSchema, UserSchema } from "./types";
import { createSession } from "./auth";

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
            return {
                errors: {},
                message: "Та эхлээд бүртгүүлнэ үү.",
            };
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

export async function loginUser(prevState: FormState, formData: FormData): Promise<FormState> {
    const rawFormData = Object.fromEntries(formData.entries());
    // Validating data using zod
    const validatedFields = LoginUserSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Алдаатай талбаруудтай байна. Нэвтрэлт амжилтгүй боллоо.",
        };
    }
    let isAdmin = false;
    try {
        // Finding the user
        const { email, password } = validatedFields.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return {
                errors: {},
                message: "Та эхлээд бүртгүүлнэ үү.",
            };
        }
        // Check passwords
        if (user.password !== password) {
            return {
                errors: {},
                message: "Нууц үг буруу байна.",
            };
        }
        await createSession(user);
        isAdmin = user.role === "ADMIN";
    } catch (error) {
        console.error(error);
        return {
            errors: {},
            message: "Сервер дээр алдаа гарлаа.",
        };
    }
    redirect(isAdmin ? "/dashboard" : "/");
}

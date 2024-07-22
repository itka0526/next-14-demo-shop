"use server";

import { redirect } from "next/navigation";
import prisma from "./db";
import { FormState, LoginUserSchema, RegisterUserSchema, SubscribeToNewsLetterSchema, UserSchema } from "./types";
import { createSession } from "./auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
        await prisma.user.create({
            data: {
                email,
                name,
                password,
                createdAt: currentDate,
                updatedAt: currentDate,
            },
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            switch (error.code) {
                // https://www.prisma.io/docs/orm/reference/error-reference
                case "P2002":
                    return {
                        errors: {},
                        message: "Хэрэглэгч аль хэдийн бүртгэлтэй байна.",
                    };
                default:
                    return {
                        errors: {},
                        message: "Өгөгдлийн санд одоогоор бүртгэх боломжгүй байна.",
                    };
            }
        }
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
        const session = await createSession(user);
        isAdmin = session.userRole === "ADMIN";
    } catch (error) {
        console.error(error);
        return {
            errors: {},
            message: "Сервер дээр алдаа гарлаа.",
        };
    }
    redirect(isAdmin ? "/dashboard" : "/");
}

export async function subscribeToNewsletter(prevState: FormState, formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = SubscribeToNewsLetterSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Алдаа гарлаа.",
        };
    }
    try {
        const { email } = validatedFields.data;
        const currentDate = new Date().toISOString();
        const subscriberInfo = await prisma.newsletterSubscriber.create({
            data: { email, createdAt: currentDate, updatedAt: currentDate },
            select: { email: true },
        });
        if (subscriberInfo) {
            return {
                errors: {},
                message: `'${subscriberInfo.email}' амжилттай бүртгэгдлээ.`,
            };
        }
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            switch (error.code) {
                // https://www.prisma.io/docs/orm/reference/error-reference
                case "P2002":
                    return {
                        errors: {},
                        message: "Та аль хэдийн хамрагдсан байна.",
                    };
                default:
                    return {
                        errors: {},
                        message: "Өгөгдлийн санд одоогоор бүртгэх боломжгүй байна.",
                    };
            }
        }
        console.error(error);
        return {
            errors: {},
            message: "Сервер дээр алдаа гарлаа.",
        };
    }
    return prevState;
}

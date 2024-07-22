import { SessionOptions } from "iron-session";
import { typeToFlattenedError, z, ZodType } from "zod";
import { NewsletterSubscriber, Review, User } from "@prisma/client";

export const UserSchema = z.object({
    id: z.number(),
    name: z.string().min(4, { message: "Нэр хэтэрхий богино байна" }),
    email: z.string().email({ message: "Буруу и-мэйл" }),
    password: z.string().min(6, { message: "Нууц үг хэтэрхий богино байна" }),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    role: z.string(),
}) satisfies ZodType<User>;

export const NewsletterSubscriberSchema = z.object({
    id: z.number(),
    email: z.string().email({ message: "Буруу и-мэйл" }),
    subscribed: z.boolean({ message: "True эсвэл false байж болно" }),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
}) satisfies ZodType<NewsletterSubscriber>;

export const ReviewProductSchema = z.object({
    id: z.number(),
    userId: z.coerce.number(),
    productId: z.coerce.number(),
    stars: z.coerce.number().min(0, { message: "0-оос бага дүн байх боломжгүй." }).max(5, { message: "5-аас их дүн байх боломжгүй." }),
    comment: z.string().min(5, { message: "Та сэтгэгдлээ 5-аас илүү их тэмдэгтээр илэрхийлнэ үү." }),
}) satisfies ZodType<Review>;

export const RegisterUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true, role: true })
    .extend({
        confirmPassword: z.string().min(6, { message: "Нууц үг хэтэрхий богино байна" }),
    })
    .superRefine(({ email, confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "Нууц үгүүд таарахгүй байна",
                path: ["confirmPassword"],
            });
        }
    });

export const LoginUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true, role: true, name: true });

export const SubscribeToNewsLetterSchema = NewsletterSubscriberSchema.omit({ id: true, createdAt: true, updatedAt: true, subscribed: true });

export const RateProductSchema = ReviewProductSchema.omit({ id: true });

export type FormState = {
    errors?: typeToFlattenedError<
        | z.infer<typeof RegisterUserSchema>
        | z.infer<typeof LoginUserSchema>
        | z.infer<typeof SubscribeToNewsLetterSchema>
        | z.infer<typeof RateProductSchema>
    >["fieldErrors"];
    message?: string | null;
};

export interface SessionData {
    userId: number | null;
    userRole: string;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET ?? "development",
    cookieName: "cookie-monster",
    cookieOptions: {
        secure: true,
    },
};

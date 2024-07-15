import { typeToFlattenedError, z } from "zod";

export const UserSchema = z.object({
    id: z.string().cuid(),
    name: z.string().min(4, { message: "Нэр хэтэрхий богино байна" }),
    email: z.string().email({ message: "Буруу и-мэйл" }),
    password: z.string().min(6, { message: "Нууц үг хэтэрхий богино байна" }),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    role: z.string(),
});

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

export type FormState = {
    errors?: typeToFlattenedError<z.infer<typeof RegisterUserSchema>>["fieldErrors"];
    message?: string | null;
};

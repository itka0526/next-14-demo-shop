import { SessionOptions } from "iron-session";
import { typeToFlattenedError, z, ZodNumber, ZodType } from "zod";
import { BasketedItem, NewsletterSubscriber, Product, Review, User } from "@prisma/client";

export const UserSchema = z.object({
    id: z.number(),
    name: z.string().min(4, { message: "Нэр хэтэрхий богино байна" }),
    email: z.string().email({ message: "Буруу и-мэйл" }),
    password: z.string().min(6, { message: "Нууц үг хэтэрхий богино байна" }),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    role: z.string(),
    avatarImage: z.string(),
}) satisfies ZodType<User>;

export const ProductSchema = z.object({
    id: z.number(),
    subCategoryId: z.number(),
    productDisplayName: z.string(),
    productName: z.string(),
    description: z.string(),
    price: z.coerce.number(),
    featured: z.boolean(),
}) satisfies ZodType<Product>;

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
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
}) satisfies ZodType<Review>;

export const UserBasketedItemSchema = z.object({
    id: z.number(),
    userId: z.number(),
    productId: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
}) satisfies ZodType<BasketedItem>;

export const RegisterUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true, role: true, avatarImage: true })
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

export const LoginUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true, role: true, name: true, avatarImage: true });

export const SubscribeToNewsLetterSchema = NewsletterSubscriberSchema.omit({ id: true, createdAt: true, updatedAt: true, subscribed: true });

export const CreateProductSchema = ProductSchema.omit({ id: true, subCategoryId: true, featured: true }).extend({
    images: z.preprocess((val) => {
        if (typeof val === "string") {
            return val.split(",").map((x) => Number(x));
        }
        return val;
    }, z.array(z.number())),
    subCategoryId: z.preprocess((val) => {
        if (typeof val === "string" && !isNaN(Number(val))) {
            return Number(val);
        }
        return val;
    }, z.number()),
    featured: z.preprocess((val) => val === "on", z.boolean()),
});

export const RateProductSchema = ReviewProductSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const AddToCartItemSchema = UserBasketedItemSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const DeleteFromCartSchema = UserBasketedItemSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type FormState = {
    errors?: typeToFlattenedError<
        | z.infer<typeof RegisterUserSchema>
        | z.infer<typeof LoginUserSchema>
        | z.infer<typeof SubscribeToNewsLetterSchema>
        | z.infer<typeof RateProductSchema>
        | z.infer<typeof CreateProductSchema>
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

export type ApiResponse =
    | { message: string; status: true; result: BasketedItem[]; type: "basketedItems" }
    | { message: string; status: true; result: Product | null; type: "product" }
    | { message: string; status: false };

export type UseCartItemReturnType = {
    cartItem: Product | null;
    isLoading: boolean;
    isDeleting: boolean;
    deleteCartItem: ({ productId }: { productId: number }) => Promise<void>;
};

export type ImageUploadResponse =
    | {
          uploadedBy: User["name"];
          success: true;
          imageId: number;
      }
    | {
          uploadedBy: User["name"];
          success: false;
          message: string;
      };

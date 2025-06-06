import * as z from "zod";
import type { FormBlock } from "../types"

export const generateSchema = (block: FormBlock[]) => {
    const shape: any = {};
    block.forEach((block) => {
        const name = block.id;

        if (block.type === "button") {
            return;
        }

        if (block.type === "email") {
            shape[name] = block?.required
                ? z.string().email("Invalid email").min(1, "Required")
                : z.string().email("Invalid email").optional();
        }
        else if (block.type === "phone") {
            shape[name] = block?.required
                ? z
                    .string()
                    .min(10, "Phone number must be at least 10 digits")
                    .max(15, "Phone number can't exceed 15 digits")
                    .regex(/^\+?[0-9\s\-()]{10,15}$/, "Invalid phone number")
                : z
                    .string()
                    .regex(/^\+?[0-9\s\-()]{10,15}$/, "Invalid phone number")
                    .optional();
        }
        else if (block.type === "number") {
            shape[name] = block?.required
                ? z.number().min(1, "Required")
                : z.number().optional();
        }
        else if (block.type === "password") {
            shape[name] = block?.required
                ? z.string().min(8, "Password must be at least 8 characters")
                : z.string().optional();
        }
        else if (block.type === "url") {
            shape[name] = block?.required
                ? z.string().url("Invalid URL").min(1, "Required")
                : z.string().url("Invalid URL").optional();
        }
        else if (block.type === "text") {
            shape[name] = block?.required
                ? z.string().min(1, "Required")
                : z.string().optional();
        }
        else if (block.type === "paragraph") {
            shape[name] = block?.required
                ? z.string().min(1, "Required")
                : z.string().optional();
        }
        else if (block.type === "heading") {
            shape[name] = z.string().optional();
        }
        else if (block.type === "dropdown") {
            const options: string[] = block?.options || [];
            shape[name] = block?.required
                ? z.string().refine((val: string) => options.includes(val), "Invalid selection")
                : z.string().optional();
        }
        else if (block.type === "date") {
            shape[name] = block?.required
                ? z.coerce.date({
                    invalid_type_error: "Invalid date",
                    required_error: "Required"
                })
                : z.coerce.date().optional().refine(date => date instanceof Date || date === undefined, {
                    message: "Invalid date"
                });
        }
        else if (block.type === "textarea") {
            shape[name] = block?.required
                ? z.string().min(1, "Required")
                : z.string().optional();
        }
        else if (block.type === "rating") {
            shape[name] = block?.required
                ? z.number().min(1, "Required")
                : z.number().optional();
        }
        else if (block.type === "file") {
            shape[name] = block?.required
                ? z
                    .string()
                    .min(1, "File is required")
                    .refine(name => /\.[a-z0-9]+$/i.test(name), "Invalid file name")
                : z
                    .string()
                    .optional()
                    .refine(name => !name || /\.[a-z0-9]+$/i.test(name), "Invalid file name");
        }
        else if (block.type === "image") {
            shape[name] = block?.required
                ? z.string()
                    .min(1, "Image is required")
                    .refine(value => /^data:image\/[a-z]+;base64,/.test(value), "Invalid image format")
                : z.string()
                    .optional()
                    .refine(value => !value || /^data:image\/[a-z]+;base64,/.test(value), "Invalid image format");
        }



    });

    return z.object(shape);
};
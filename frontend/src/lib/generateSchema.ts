import { useFormBuilderStore } from "../store/frombuilder";
import * as z from "zod";
export const generateSchema = () => {
    const { blocks } = useFormBuilderStore.getState();
    const shape: any = {};

    blocks.forEach((block) => {
        const name = `block-${block.id}`;
        if (block.type === "email") {
            shape[name] = block.props?.required
                ? z.string().email("Invalid email").min(1, "Required")
                : z.string().email("Invalid email").optional();
        }
        else if (block.type === "button") {
            shape[name] = z.string()
        }
        else if (block.type === "phone") {
            shape[name] = block.props?.required
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
            shape[name] = block.props?.required
                ? z.number().min(1, "Required")
                : z.number().optional();
        }
        else if (block.type === "password") {
            shape[name] = block.props?.required
                ? z.string().min(8, "Password must be at least 8 characters")
                : z.string().optional();
        }
        else if (block.type === "url") {
            shape[name] = block.props?.required
                ? z.string().url("Invalid URL").min(1, "Required")
                : z.string().url("Invalid URL").optional();
        }

    });

    return z.object(shape);
};
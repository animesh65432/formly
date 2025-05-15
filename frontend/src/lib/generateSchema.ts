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
        if (block.type === "button") {
            shape[name] = z.string().optional();
        }
    });

    return z.object(shape);
};
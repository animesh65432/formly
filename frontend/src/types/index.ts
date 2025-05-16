import type { LucideIcon } from "lucide-react";
export interface FormElement {
    id: string
    name: string
    icon: LucideIcon
}


export type FormBlock = {
    id: string;
    type: string;
    props?: {
        label?: string;
        placeholder?: string;
        required?: boolean;
    };
};
export type FormBuilderState = {
    blocks: FormBlock[];
    addBlock: (block: FormBlock) => void;
    removeBlock: (id: string) => void;
    updateBlock: (id: string, updatedBlock: FormBlock) => void;
};
import type { LucideIcon } from "lucide-react";
export interface FormElement {
    id: string
    name: string
    icon: LucideIcon
}


export type FormBlock = {
    id: string;
    type: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];

};

export type FormBuilderState = {
    block: FormBlock[];
    addBlock: (block: FormBlock) => void;
    removeBlock: (id: string) => void;
    updateBlock: (id: string, updatedBlock: FormBlock) => void;
    selectElementId: string | null,
    setSelectElementId: (id: string) => void;
    makeEmptyblock: () => void
};

export type auth = {
    token: string
    addtoken: (token: string) => void
    removetoken: () => void
}

export type BlockItem = {
    form_blocks: FormBlock[];
};

export type Blocks = BlockItem[];

export type GetFormResponse = {
    fromid: string;
    block: BlockItem;
};

import { create } from "zustand";

export type FormBlock = {
    id: string;
    type: string
    props?: {
        label: string;
        placeholder: string;
        required: boolean;
    };
};

type FormBuilderState = {
    blocks: FormBlock[];
    addBlock: (block: FormBlock) => void;
    removeBlock: (id: string) => void;
    updateBlock: (id: string, updatedBlock: FormBlock) => void;
};

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
    blocks: [],

    addBlock: (block) => {
        console.log("Adding block with ID:", block.id);
        set((state) => ({
            blocks: [...state.blocks, block],
        }));
    },

    removeBlock: (id) => {
        console.log("Removing block with ID:", id);
        set((state) => ({
            blocks: state.blocks.filter((block) => block.id !== id),
        }));
    },

    updateBlock: (id, updatedBlock) => {
        console.log("Updating block with ID:", id);
        set((state) => ({
            blocks: state.blocks.map((block) =>
                block.id === id ? updatedBlock : block
            ),
        }));
    },
}));

import { create } from "zustand";

export type FormBlock = {
    id: string;
    type: string;
    props?: {
        label?: string;
        placeholder?: string;
        required?: boolean;
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
        const blockWithDefaults: FormBlock = {
            ...block,
            props: {
                label: '',
                placeholder: '',
                required: false,
                ...block.props
            }
        };

        set((state) => ({
            blocks: [...state.blocks, blockWithDefaults],
        }));
    },

    removeBlock: (id) => {
        set((state) => ({
            blocks: state.blocks.filter((block) => block.id !== id),
        }));
    },

    updateBlock: (id, updatedBlock) => {
        set((state) => ({
            blocks: state.blocks.map((block) =>
                block.id === id ? updatedBlock : block
            ),
        }));
    },
}));
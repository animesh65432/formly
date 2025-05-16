import { create } from "zustand";
import type { FormBlock, FormBuilderState } from "../types"

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
import { create } from "zustand";
import type { FormBlock, FormBuilderState } from "../types"

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
    block: [],
    addBlock: (block) => {
        const blockWithDefaults: FormBlock = {
            required: false,
            options: block.type === 'dropdown' ? ['Option 1'] : undefined,
            ...block
        };

        set((state) => ({
            block: [...state.block, blockWithDefaults],
        }));
    },

    removeBlock: (id) => {
        set((state) => ({
            block: state.block.filter((block) => block.id !== id),
        }));
    },

    updateBlock: (id, updatedBlock) => {
        set((state) => ({
            block: state.block.map((block) =>
                block.id === id ? updatedBlock : block
            ),
        }));
    },
}));
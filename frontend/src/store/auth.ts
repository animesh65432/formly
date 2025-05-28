import { create } from "zustand";
import type { auth } from "../types"
export const useAuth = create<auth>((set) => ({
    token: "",
    addtoken: (token: string) => set(() => ({ token })),
    removetoken: () => set(() => ({ token: "" })),
}));
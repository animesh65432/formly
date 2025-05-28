import { create } from "zustand";
import type { auth } from "../types";

export const useAuth = create<auth>((set) => ({
    token: typeof window !== "undefined" ? localStorage.getItem("token") || "" : "",

    addtoken: (token: string) => {
        localStorage.setItem("token", token);
        set(() => ({ token }));
    },

    removetoken: () => {
        localStorage.removeItem("token");
        set(() => ({ token: "" }));
    },
}));

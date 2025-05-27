type User = {
    id: number;
    email: string;
};

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export { };
type User = {
    id: string;
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
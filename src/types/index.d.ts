export { }

declare global {
    namespace Express {
        interface Request {
            file: any
        }
    }
}
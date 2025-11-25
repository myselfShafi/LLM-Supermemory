class ApiError extends Error {
    success: boolean;
    statusCode: number;
    errors?: any[];

    constructor(statusCode = 500, message = 'Internal server error', errors?: any[], stack?: string) {
        super(message);

        this.success = false;
        this.statusCode = statusCode;
        this.errors = errors || [];

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};

export default ApiError;
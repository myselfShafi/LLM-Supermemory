import { HTTP_STATUS, type HttpStatusCode } from "../constants/httpCodes.constant.js";

class ApiError extends Error {
    success: boolean;
    statusCode: HttpStatusCode;
    errors?: any[];

    constructor(
        statusCode: HttpStatusCode = HTTP_STATUS.SERVER_ERROR,
        message: string = 'Internal server error',
        errors?: any[],
        stack?: string
    ) {
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
import { HTTP_STATUS, type HttpStatusCode } from "../constants/httpCodes.constant.js";

class ApiResponse<T> {
    success: boolean;
    statusCode: HttpStatusCode;
    data: T;
    message: string;

    constructor(statusCode = HTTP_STATUS.OK, data: T, message = 'success') {
        this.success = true;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}


export default ApiResponse;
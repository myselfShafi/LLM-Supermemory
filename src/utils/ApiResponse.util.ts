import { HTTP_STATUS, type HttpStatusCode } from "../constants/httpCodes.constant.js";

class ApiResponse<T> {
    success: boolean;
    statusCode: HttpStatusCode;
    data: T;
    message: string;

    constructor(
        statusCode: HttpStatusCode = HTTP_STATUS.OK,
        data: T,
        message: string = 'success'
    ) {
        this.success = true;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}


export default ApiResponse;
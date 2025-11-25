class ApiResponse<T> {
    success: boolean;
    statusCode: number;
    data: T;
    message: string;

    constructor(statusCode = 200, data: T, message = 'success') {
        this.success = true;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}


export default ApiResponse;
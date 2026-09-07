class ApiError extends Error {
    constructor(statusCode, message="Internal Server Error",stackTrace) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.stack = stackTrace;
    }
}

export default ApiError;
class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  static BadRequest(message = "Bad Request") {
    return new APIError(message, 400);
  }

  static Unauthorized(message = "Unauthorized") {
    return new APIError(message, 401);
  }

  static Forbidden(message = "Forbidden") {
    return new APIError(message, 403);
  }

  static NotFound(message = "Not Found") {
    return new APIError(message, 404);
  }

  static Internal(message = "Internal Server Error") {
    return new APIError(message, 500);
  }
}

export default APIError;

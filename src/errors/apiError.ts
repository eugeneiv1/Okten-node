export class ApiError extends Error {
  public status: number;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

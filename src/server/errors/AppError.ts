export default class AppError extends Error {
  public code: number;

  public error: Error | undefined;

  constructor(code: number, message: string, error?: Error) {
    super(message);

    this.code = code;
    this.error = error;
  }

  public toModel() {
    return {
      code: this.code,
      message: this.message
    };
  }
}

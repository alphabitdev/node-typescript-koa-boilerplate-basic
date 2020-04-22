import AppError from './AppError';

export default class NotFoundError extends AppError {
  constructor(message: string) {
    super(20000, message);
  }
}

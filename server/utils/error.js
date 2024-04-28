export function errorHandler(statusCode, Message) {
  const error = new Error(Message);
  error.statusCode = statusCode;
  error.message = Message;
  return error;
}

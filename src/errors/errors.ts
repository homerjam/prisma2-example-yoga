export class PermissionError extends Error {
  constructor(message: any) {
    super('PermissionError: ' + message);
    this.name = this.constructor.name;
  }
}

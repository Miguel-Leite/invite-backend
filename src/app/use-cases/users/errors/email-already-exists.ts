export class EmailAlreadyExists extends Error {
  statusCode: number;
  constructor() {
    super('Email already exists!');
    this.statusCode = 409;
  }
}

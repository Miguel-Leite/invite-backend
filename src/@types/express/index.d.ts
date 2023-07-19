declare namespace Express {
  export interface User {
    id: string;
    username: string;
    email: string;
  }
  export interface Request {
    user: User;
  }
}

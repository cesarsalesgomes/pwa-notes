export interface User {
  uid: string;
  loading?: boolean;
  error?: string;
}

export class User {
  constructor(public uid: string) {
  }
}

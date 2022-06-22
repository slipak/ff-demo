export enum Roles {
  User = "user",
  Admin = "admin",
}

export type User = {
  name: string;
  id: string;
  email: string;
  role: Roles;
};

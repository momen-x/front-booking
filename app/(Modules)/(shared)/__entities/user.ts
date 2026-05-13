interface User {
  id: string;
  username?: string;
  userImage?: string;
  email: string;
  role: "USER" | "PROVIDER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}
export default User;

export enum UserRole {
  USER,
  PROVIDER,
  ADMIN,
}

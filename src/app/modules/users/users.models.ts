export interface User {
  id: number;
  name: string;
  position: string;
  role: UserRole;
  company: string;
  phone?: string;
  access?: UserAccess[];
}

export interface UserAccess {
  id: number;
  title: string;
}

export interface UserRole {
  id: number;
  title: string;
}

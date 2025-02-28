export interface LoginResponse {
  id: number;
  token: string;
  fullName: string;
  email: string;
  roles: string[];
}

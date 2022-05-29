export interface ApiLoginResponse {
  token: string;
  userId: number;
  username: string;
  email: string;
  roles: string[];
}

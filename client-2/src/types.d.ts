import { JwtPayload } from "jwt-decode";

interface GoogleJwtPayload extends JwtPayload {
  name: string;
  picture: string;
  sub: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  google_id?: string;
}

export interface AuthData {
  email: string;
  name: string;
  picture: string;
  google_id: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

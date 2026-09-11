// src/services/auth.service.ts
import { api } from "@/lib/api";
import Cookies from "js-cookie";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    const data = response.data;

    const token = data.accessToken || data.token;

    if (token) {
      Cookies.set("token", token, { expires: 7, secure: false, sameSite: "lax" });
      
      if (data.refreshToken) {
        Cookies.set("refreshToken", data.refreshToken, { expires: 7, secure: false, sameSite: "lax" });
      }
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>("/auth/register", credentials);
    const data = response.data;

    const token = data.accessToken || data.token;

    if (token) {
      Cookies.set("token", token, { expires: 7, secure: false, sameSite: "lax" });
      
      if (data.refreshToken) {
        Cookies.set("refreshToken", data.refreshToken, { expires: 7, secure: false, sameSite: "lax" });
      }
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<void> {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
}

export async function refreshToken(): Promise<AuthResponse> {
  const currentRefreshToken = Cookies.get("refreshToken");

  const response = await api.post<AuthResponse>("/auth/refresh", {
    refreshToken: currentRefreshToken,
  });

  const data = response.data;
  const token = data.accessToken || data.token;

  if (token) {
    Cookies.set("token", token, { expires: 7, secure: false, sameSite: "lax" });
  }

  return data;
}
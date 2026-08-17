import { api } from "@/lib/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  const data = response.data;

  if (data.token) {
    localStorage.setItem("token", data.token);
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
  }

  return data;
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/users", credentials);
  const data = response.data;

  if (data.token) {
    localStorage.setItem("token", data.token);
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
  }

  return data;
}

export async function logout(): Promise<void> {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}

export async function refreshToken(): Promise<AuthResponse> {
  const currentRefreshToken = localStorage.getItem("refreshToken");
  
  const response = await api.post<AuthResponse>("/auth/refresh", {
    refreshToken: currentRefreshToken,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
}
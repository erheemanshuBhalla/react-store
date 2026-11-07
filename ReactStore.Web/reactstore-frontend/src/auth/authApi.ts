import api from "../api/axios";

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export const login = async (email: string, password: string): Promise<void> => {
  const response = await api.post("/auth/login", { email, password });
  const { token, userId, email: userEmail, role } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);           // fix: store role under "role" key directly
  localStorage.setItem("user", JSON.stringify({ id: userId, email: userEmail, role }));
};

export const register = async (email: string, password: string): Promise<void> => {
  await api.post("/auth/register", { email, password });
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};

export const getStoredUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isAdmin = (): boolean => localStorage.getItem("role") === "Admin";

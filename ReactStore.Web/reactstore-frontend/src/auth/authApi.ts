import api from "../api/axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  
  localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify({
  id: response.data.userId,
  email: response.data.email,
  role: response.data.role
}));
};

export const register = async (email: string, password: string) => {
  await api.post("/auth/register", { email, password });
};

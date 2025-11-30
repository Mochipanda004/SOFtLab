import { useEffect, useState } from "react";

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  role: "admin" | "student" | "teacher";
};

type LoginInput = { email: string; password: string };
type RegisterInput = { name: string; email: string; role: AuthUser["role"]; password: string };

const STORAGE_KEY = "auth_mock_user";

export function useAuthMock() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const persist = (u: AuthUser | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = async ({ email, password }: LoginInput): Promise<AuthUser> => {
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 600));
    if (email === "fail@example.com") {
      setLoading(false);
      setError("Credenciales inválidas");
      throw new Error("Credenciales inválidas");
    }
    const role: AuthUser["role"] = email === "test@example.com" ? "admin" : "student";
    const u: AuthUser = { id: crypto.randomUUID(), email, role };
    setUser(u);
    persist(u);
    setLoading(false);
    return u;
  };

  const register = async ({ name, email, role, password }: RegisterInput): Promise<AuthUser> => {
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 700));
    if (email === "exists@example.com") {
      setLoading(false);
      setError("El correo ya está registrado");
      throw new Error("El correo ya está registrado");
    }
    const u: AuthUser = { id: crypto.randomUUID(), email, name, role };
    setUser(u);
    persist(u);
    setLoading(false);
    return u;
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    setUser(null);
    persist(null);
    setLoading(false);
  };

  return { user, loading, error, login, register, signOut };
}


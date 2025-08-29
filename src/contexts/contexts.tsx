import { createContext, useState } from "react";

export type UserType = "client" | "mentor" | "admin";

type AuthContextProps = {
  token: string | null;
  userType: UserType | null;
  login: (token: string, userType: UserType) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userType, setUserType] = useState<UserType | null>(
    (localStorage.getItem("userType") as UserType) || null
  );

  const login = (newToken: string, newUserType: UserType) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userType", newUserType);
    setToken(newToken);
    setUserType(newUserType);
  };

  const logout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("role");
      setToken(null);
      setUserType(null);
    }, 1000);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, userType, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

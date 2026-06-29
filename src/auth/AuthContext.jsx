import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ blank }) {
  const [token, setToken] = useState();
}

export const useAuth = () => useContext(AuthContext);

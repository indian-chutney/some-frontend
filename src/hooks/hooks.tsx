import { useContext } from "react";
import { AuthContext } from "../contexts/contexts";

export const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("Null AuthContext");
  }
  return auth;
};

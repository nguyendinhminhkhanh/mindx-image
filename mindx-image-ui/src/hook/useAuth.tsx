import { createContext  } from "react";
export type AuthContextType = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};
export const AuthContext = createContext<AuthContextType | null>(null);
// export function useAuth() {
//   const user = useContext(AuthContext);
//   return user; // { user, setUser }
// }

// export default useAuth;

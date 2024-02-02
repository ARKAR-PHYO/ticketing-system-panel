import { AUTHContextType } from "@/lib/auth/auth-context-types";
import { createContext } from "react";

export const AuthContext = createContext({} as AUTHContextType);

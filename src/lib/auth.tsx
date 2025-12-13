import type { JwtPayload } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { supabase } from "./supabaseClient";
import { jwtDecode } from "jwt-decode";
import LoadingPage from "@/components/loadingPage";

type AuthContextType = {
  claims: JwtPayload | undefined;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  claims: undefined,
  loading: true,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [claims, setClaims] = useState<JwtPayload | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getClaims().then(({ data }) => {
      setClaims(data?.claims);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if ( event === "SIGNED_OUT") {
        setClaims(undefined);
      } else if (session) {
        const payload = jwtDecode<JwtPayload>(session?.access_token);
        setClaims(payload);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext
      value={{
        claims,
        loading,
      }}
    >
      {loading ? <LoadingPage /> : children}
    </AuthContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

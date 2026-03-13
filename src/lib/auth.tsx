import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  Fragment,
  startTransition,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { supabase } from "./supabaseClient";
import { Navigate } from "react-router";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) =>
      startTransition(() => {
        if (event === "SIGNED_OUT") {
          setSession(null);
        } else if (session) {
          setSession(session);
        }
      }),
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext
      value={{
        session,
        loading,
      }}
    >
      {children}
    </AuthContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);


export function AuthContainer({ children }: PropsWithChildren) {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      toast.info("Log in to continue");
    }
  }, [loading, session]);

  return !loading && !session ? (
    <Navigate to="/login" />
  ) : (
    <Fragment>{children}</Fragment>
  );
}

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import supabase from "../api/supabase";

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSession = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      setIsAuth(false);
      setUserId("");
      setRol(null);
    } else {
      setIsAuth(true);
      setUserId(data.session.user.id);

      const { data: dataUs, error: userError } = await supabase
        .from("usuario")
        .select("perfil_id")
        .eq("auth_id", data.session.user.id)
        .single();

      if (!userError && dataUs) {
        setRol(dataUs.perfil_id);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuth(true);
        setUserId(session.user.id);
        loadSession();
      } else {
        setIsAuth(false);
        setUserId("");
        setRol(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userId,
        setUserId,
        rol,
        setRol,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

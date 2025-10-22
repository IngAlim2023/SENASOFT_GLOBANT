import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import supabase from "../api/supabase";

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
        setUserId(data.session.user.id)
      }
    };
    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuth(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userId,
        setUserId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

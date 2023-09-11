import React from "react";
import { TailSpin } from "react-loader-spinner";
import supabase from "../supabase";

export const AuthContext = React.createContext({});

export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_IN") setUser(session.user);
    if (event == "SIGNED_OUT") setUser(null);
    setLoading(false);
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <TailSpin
            height="80"
            width="80"
            color="#000000"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

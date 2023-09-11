import React from "react";
import { TailSpin } from "react-loader-spinner";
import supabase from "../supabase";

export const AuthContext = React.createContext({});

export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleAuth = async () => {
    const session = await supabase.auth.getSession();

    setUser(session?.user ?? null);
    setLoading(false);

    // listen for changes to auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    return listener;
  };

  React.useEffect(() => {
    // get session data if there is an active session
    handleAuth();
    // cleanup the useEffect hook
  }, []);

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

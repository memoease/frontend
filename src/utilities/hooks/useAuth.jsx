import { createContext, useContext, useState, useEffect } from "react";
import { logoutUser, validateToken } from "../../utilities/service/api.js";

// Create React-Context for Authentification
const AuthContext = createContext({});

// Authentication provider component that provides the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const cookies = Object.fromEntries(
    document.cookie
      .split("; ")
      .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
  );

  // Effect to load the user from the userCookie
  useEffect(() => {
    setLoading(true);
    // Initialize the user from the userCookie
    // const userFromCookie = cookies.userInfo
    //   ? JSON.parse(cookies.userInfo)
    //   : null;
    // setUser(userFromCookie);

    validateToken().then((res) => {
      if (!res.auth) {
        setAuthorized(false);
        setUser(null)
      } else {
        setAuthorized(true);
        setUser(res.user);
      }
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  // Function to log out the user
  const logout = async () => {
    setLoading(true);
    try {
      setAuthorized(false);
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Provider of the AuthContext value for the child components
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authorized,
        setAuthorized,
        setLoading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext in other components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

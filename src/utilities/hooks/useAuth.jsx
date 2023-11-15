import { createContext, useContext, useState, useEffect } from "react";
import { logoutUser } from "../service/api.js";


// Create React-Context for Authentification
const AuthContext = createContext({});

// Authentication provider component that provides the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);


  const cookies = Object.fromEntries(
    document.cookie
      .split("; ")
      .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
  );

  // Effect to load the user from the userCookie
  useEffect(() => {
    // Initialize the user from the userCookie
    const userFromCookie = cookies.user ? JSON.parse(cookies.user) : null;
    setUser(userFromCookie);
    if (!userFromCookie) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    };
  }, []);

  // Function to log out the user
  const logoutHandler = async () => {
    setAuthorized(true);
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
      setAuthorized(false);
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
        logoutHandler,
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

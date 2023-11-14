import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../service/api.js";

// Create React-Context for Authentification
const AuthContext = createContext({
  user: null,
  loading: false,
  authorized: false,
  login: (email, password) => {},
  logout: () => {},
});

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
    setAuthorized(false);
  }, []);

  // Function to log in the user
  const loginHandler = async (email, password) => {
    setAuthorized(true);
    setLoading(true);
    try {
      const userData = await loginUser({ email, password });
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
      setAuthorized(false);
    }
  };

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
        login: loginHandler,
        logout: logoutHandler,
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

import { createContext, useContext, useState, useEffect } from "react";
import { registerUser, loginUser, logoutUser } from "../service/api.js";

// Create React-Context for Authentification
const AuthContext = createContext({
  user: null, // initial value
  register: () => { },
  login: () => { },
  logout: () => { },
});

// Authentication provider component that provides the context
export const AuthProvider = ({ children }) => {
  // State variable to save the user
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(true);

  // Effect when mounting the component to restore user data from the sessionStorage
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  // Function for registration with the transferred user data
  const register = async (userData) => {
    try {
      // API call to register a new user
      const newUser = await registerUser(userData);
      // Set the registered user in the state and sessionStorage
      setUser(newUser);
      sessionStorage.setItem("userData", JSON.stringify(newUser));
    } catch (error) {
      // In the event of an error, log the error and pass it on
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Function for logging in with the transferred login information
  const login = async (credentials) => {
    try {
      // API call to log in the user
      const userData = await loginUser(credentials);
      // Set the user in the state and sessionStorage
      setUser(userData);
      sessionStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      // In the event of an error, log the error and pass it on
      console.error("Login error:", error);
      throw error;
    }
  };

  // Function for Logout
  const logout = async () => {
    try {
      // API call to log out the user
      await logoutUser();
      //Set the user in the state and sessionStorage to zero
      setUser(null);
      sessionStorage.removeItem("userData");
    } catch (error) {
      // In the event of an error, log the error and pass it on
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Provider of the AuthContext value for the child components
  return (
    <AuthContext.Provider value={{ user, login, register, logout, authorized }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext in other components
export const useAuth = () => {
  return useContext(AuthContext);
};

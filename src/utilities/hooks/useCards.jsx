import { createContext, useContext, useState, useEffect } from "react";

import * as api from "../service/api";
import { useAuth } from "../hooks/useAuth";

// Create React-Context for Cards
const CardsContext = createContext({});

// Custom-Hook component that provides the context
export const useCards = () => {
  return useContext(CardsContext);
};

// Provider of the CardsContext value for the child components
export function CardProvider({ children }) {
  const [publicCards, setPublicCards] = useState([]);
  const [privateCards, setPrivateCards] = useState([]);
  const [message, setMessage] = useState("");
  const [publicCardExcludeUser, setPublicCardExcludeUser] = useState([]);
  const { authorized, loading } = useAuth();

  // Effect to load the public-cards from the API
  useEffect(() => {
    const getPublicSets = async () => {
      try {
        const response = await api.getRandomPubSets();

        setPublicCards(response);
        setMessage("");
      } catch (error) {
        console.error("Error fetching public cards:", error.response?.data);

        const { error: errorMessage } = error.response?.data || {};
        setMessage(`${errorMessage}. `);
      }
    };

    getPublicSets();
  }, []);

  // Effect to load the private-cards from the API
  useEffect(() => {
    const getPrivateSets = async () => {
      try {
        const response = await api.getFlashcardSetsByUser();

        setPrivateCards(response);
        setMessage("");
      } catch (error) {
        console.error("Error fetching private cards:", error.response?.data);

        const { error: errorMessage } = error.response?.data || {};
        setMessage(`${errorMessage}. `);
      };
    };

    const getPublicSetsExcludeUser = async () => {
      try {
        const response = await api.getRandomPubSetsExcludeUser();
        setPublicCardExcludeUser(response);
        console.log(publicCardExcludeUser);
      } catch (error) {
        const { error: errorMessage } = error.response?.data || {};
        setMessage(`${errorMessage}. `);
      };
    };

    if (authorized) {
      getPrivateSets();
      getPublicSetsExcludeUser();
    };

  }, [loading]);

  const updateSetsByUser = async () => {
    try {
      const response = await api.getFlashcardSetsByUser();

      setPrivateCards(response);
      setMessage("");
    } catch (error) {
      console.error("Error fetching private cards:", error.response?.data);

      const { error: errorMessage } = error.response?.data || {};
      setMessage(`${errorMessage}. `);
    }
  };

  // Provider of the CardsContext value for the child components
  return (
    <CardsContext.Provider
      value={{ publicCards, privateCards, message, updateSetsByUser, publicCardExcludeUser }}
    >
      {children}
    </CardsContext.Provider>
  );
}

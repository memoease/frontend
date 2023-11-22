import { createContext, useContext, useState, useEffect } from "react";

import * as api from "../api";

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

  // Effect to load the public-cards from the API
  useEffect(() => {
    const getPublicSets = async () => {
      try {
        const response = await api.getRandomPubSets();
        const { data } = response;

        setPublicCards(data);
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
        const { data } = response;

        setPrivateCards(data);
        setMessage("");
      } catch (error) {
        console.error("Error fetching private cards:", error.response?.data);

        const { error: errorMessage } = error.response?.data || {};
        setMessage(`${errorMessage}. `);
      }
    };

    getPrivateSets();
  }, []);

  // Provider of the CardsContext value for the child components
  return (
    <CardsContext.Provider value={{ publicCards, privateCards, message }}>
      {children}
    </CardsContext.Provider>
  );
}

import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContexts = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <CitiesContexts.Provider value={{ cities, isLoading }}>{children}</CitiesContexts.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContexts);
  if (context === undefined) throw new Error("CitiesContext was use outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };

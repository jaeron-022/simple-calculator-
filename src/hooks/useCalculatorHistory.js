import { useState, useEffect } from "react";

export function useCalculatorHistory() {
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("calc-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("calc-history", JSON.stringify(history));
  }, [history]);

  const addToHistory = (input, result) => {
    setHistory([`${input} = ${result}`, ...history.slice(0, 20)]);
  };

  const clearHistory = () => setHistory([]);

  const removeHistoryItem = (index) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    history,
    setHistory,
    showHistory,
    setShowHistory,
    addToHistory,
    clearHistory,
    removeHistoryItem,
  };
}

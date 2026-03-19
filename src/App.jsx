import { useState, useEffect, useRef } from "react";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const typingTimeoutRef = useRef(null);

  const operators = ["+", "-", "*", "/"];

  useEffect(() => {
    const saved = localStorage.getItem("calc-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("calc-history", JSON.stringify(history));
  }, [history]);

  // Smooth typing detection
  const handleTyping = () => {
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  const handleClick = (value) => {
    handleTyping();

    setInput((prev) => {
      if (operators.includes(value)) {
        if (operators.includes(prev.slice(-1))) {
          return prev.slice(0, -1) + value;
        }
      }

      if (value === ".") {
        const parts = prev.split(/[\+\-\*\/]/);
        if (parts[parts.length - 1].includes(".")) return prev;
      }

      if (prev === "" && value !== ".") return value;

      return prev + value;
    });
  };

  const clear = () => {
    handleTyping();
    setInput("");
  };

  const backspace = () => {
    handleTyping();
    setInput((prev) => (prev.length === 1 ? "" : prev.slice(0, -1)));
  };

  const percent = () => {
    if (input === "") return;
    handleTyping();
    setInput((prev) => (parseFloat(prev) / 100).toString());
  };

  const calculate = () => {
    try {
      if (input === "" || operators.includes(input.slice(-1))) return;

      const result = eval(input).toString();

      setHistory([
        `${input} = ${result}`,
        ...history.slice(0, 20),
      ]);

      setInput(result);
    } catch {
      setInput("Error");
    }
  };

  const clearHistory = () => setHistory([]);

  const buttons = [
    ["C", "%", "⌫", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-black p-5 rounded-[2.5rem] w-[340px] h-[520px] shadow-2xl border border-gray-800 relative overflow-hidden">

        {/* ========================= */}
        {/* 📱 HISTORY SCREEN */}
        {/* ========================= */}
        <div
          className={`absolute inset-0 p-5 transition-all duration-300 ${
            showHistory
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full pointer-events-none"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowHistory(false)}
              className="text-sm text-orange-400 hover:text-orange-300 transition"
            >
              ← Back
            </button>

            <h2 className="text-lg font-medium">History</h2>

            <button
              onClick={clearHistory}
              className="text-sm text-red-400 hover:text-red-300 transition"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {history.length === 0 ? (
              <p className="text-gray-600 text-center mt-10">
                No history yet
              </p>
            ) : (
              history.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between p-2 rounded hover:bg-gray-800 transition"
                >
                  <span
                    onClick={() => {
                      setInput(item.split("=")[1].trim());
                      setShowHistory(false);
                    }}
                    className="flex-1 text-right cursor-pointer"
                  >
                    {item}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHistory((prev) =>
                        prev.filter((_, index) => index !== i)
                      );
                    }}
                    className="ml-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-300 transition text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ========================= */}
        {/* 🧮 CALCULATOR SCREEN */}
        {/* ========================= */}
        <div
          className={`absolute inset-0 p-5 transition-all duration-300 ${
            showHistory
              ? "opacity-0 -translate-x-full pointer-events-none"
              : "opacity-100 translate-x-0"
          }`}
        >
          {/* History button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setShowHistory(true)}
              className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 
                         hover:bg-gray-700 hover:text-white 
                         active:scale-95 transition shadow-md"
            >
              History
            </button>
          </div>

          {/* Display with PERFECT cursor */}
       <div className="text-right text-5xl font-light mb-6 px-2 break-all flex justify-end items-end leading-none">
          <span>{input}</span>

          <span
             className={`inline-block w-[2px] h-[1em] bg-white ml-[2px] ${
            isTyping ? "opacity-100" : "cursor-blink"
           }`}
          />
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.flat().map((btn, index) => {
              const base =
                "flex items-center justify-center rounded-full text-xl h-16 transition active:scale-95 bg-gray-800 hover:bg-gray-700";

              let textColor = "text-white";

              if (btn === "C") textColor = "text-red-500";
              else if (btn === "%") textColor = "text-orange-400";
              else if (btn === "⌫") textColor = "text-blue-400";
              else if (["/", "*", "-", "+", "="].includes(btn))
                textColor = "text-orange-400";

              if (btn === "0") {
                return (
                  <button
                    key={index}
                    onClick={() => handleClick(btn)}
                    className={`col-span-2 flex items-center justify-start pl-6 rounded-full text-xl h-16 ${base} ${textColor}`}
                  >
                    0
                  </button>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() =>
                    btn === "C"
                      ? clear()
                      : btn === "%"
                      ? percent()
                      : btn === "⌫"
                      ? backspace()
                      : btn === "="
                      ? calculate()
                      : handleClick(btn)
                  }
                  className={`${base} ${textColor}`}
                >
                  {btn}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
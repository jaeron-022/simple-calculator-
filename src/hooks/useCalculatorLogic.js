import { useState } from "react";

export function useCalculatorLogic() {
  const [input, setInput] = useState("");
  const operators = ["+", "-", "*", "/"];

  const handleClick = (value) => {
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
    setInput("");
  };

  const backspace = () => {
    setInput((prev) => (prev.length === 1 ? "" : prev.slice(0, -1)));
  };

  const percent = () => {
    if (input === "") return;
    
    // Extract the last number from the expression
    const lastOperatorIndex = Math.max(
      input.lastIndexOf("+"),
      input.lastIndexOf("-"),
      input.lastIndexOf("*"),
      input.lastIndexOf("/")
    );
    
    if (lastOperatorIndex === -1) {
      // No operator, convert the entire input to percent
      setInput((prev) => (parseFloat(prev) / 100).toString());
    } else {
      // There's an operator, convert only the last number
      const before = input.substring(0, lastOperatorIndex + 1);
      const lastNumber = input.substring(lastOperatorIndex + 1);
      const percentValue = (parseFloat(lastNumber) / 100).toString();
      setInput(before + percentValue);
    }
  };

  const calculate = () => {
    // Don't calculate if input is empty
    if (input === "") return undefined;
    
    // Don't calculate if input ends with an operator
    if (operators.includes(input.slice(-1))) return undefined;
    
    // Don't calculate if input ends with a decimal point
    if (input.slice(-1) === ".") return undefined;
    
    // Don't calculate if input is just a decimal point
    if (input === ".") return undefined;

    try {
      const result = eval(input);
      
      // Check for invalid results (Infinity, NaN, etc)
      if (!isFinite(result) || isNaN(result)) {
        return undefined;
      }
      
      return result.toString();
    } catch {
      // Don't return error, just return undefined to prevent changes
      return undefined;
    }
  };

  return {
    input,
    setInput,
    handleClick,
    clear,
    backspace,
    percent,
    calculate,
    operators,
  };
}

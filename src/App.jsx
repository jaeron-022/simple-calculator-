import { useState } from "react";

function App() {
  const [input, setInput] = useState("0");

  const handleClick = (value) => {
    if (input === "0") setInput(value);
    else setInput(input + value);
  };

  const clear = () => setInput("0");

  const toggleSign = () => {
    setInput((prev) =>
      prev.startsWith("-") ? prev.slice(1) : "-" + prev
    );
  };

  const percent = () => {
    setInput((prev) => (parseFloat(prev) / 100).toString());
  };

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const buttons = [
    ["C", "+/-", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">

      {/* OUTER DEVICE FRAME */}
      <div className="p-4 rounded-[3rem] bg-gray-800 shadow-[0_20px_80px_rgba(0,0,0,0.9)] border border-gray-700">

        {/* INNER CALCULATOR BODY */}
        <div className="bg-black p-5 rounded-[2.5rem] w-[320px] shadow-inner border border-gray-900">

          {/* DISPLAY */}
          <div className="text-white text-right text-5xl font-light mb-6 px-2 break-all border-b border-gray-800 pb-4">
            {input}
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.flat().map((btn, index) => {
              
              let base =
                "flex items-center justify-center rounded-full text-xl h-16 transition active:scale-95 shadow-md";

              // Top gray buttons
              if (["C", "+/-", "%"].includes(btn)) {
                return (
                  <button
                    key={index}
                    onClick={
                      btn === "C"
                        ? clear
                        : btn === "+/-"
                        ? toggleSign
                        : percent
                    }
                    className={`${base} bg-gray-300 text-black shadow-inner`}
                  >
                    {btn}
                  </button>
                );
              }

              // Operators (orange)
              if (["/", "*", "-", "+", "="].includes(btn)) {
                return (
                  <button
                    key={index}
                    onClick={
                      btn === "=" ? calculate : () => handleClick(btn)
                    }
                    className={`${base} bg-orange-500 text-white shadow-lg hover:brightness-110`}
                  >
                    {btn}
                  </button>
                );
              }

              // Zero button (wide)
              if (btn === "0") {
                return (
                  <button
                    key={index}
                    onClick={() => handleClick(btn)}
                    className="col-span-2 flex items-center justify-start pl-6 rounded-full text-xl h-16 bg-gray-700 text-white active:scale-95 shadow-md"
                  >
                    0
                  </button>
                );
              }

              // Numbers
              return (
                <button
                  key={index}
                  onClick={() => handleClick(btn)}
                  className={`${base} bg-gray-700 text-white shadow-md hover:bg-gray-600`}
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
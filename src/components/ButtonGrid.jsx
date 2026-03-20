const BUTTONS = [
  ["C", "%", "⌫", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const BUTTON_STYLES = {
  C: "text-red-500",
  "%": "text-orange-400",
  "⌫": "text-blue-400",
  "/": "text-orange-400",
  "*": "text-orange-400",
  "-": "text-orange-400",
  "+": "text-orange-400",
  "=": "text-orange-400",
};

export function ButtonGrid({ onButtonClick }) {
  const getButtonStyle = (btn) => {
    return BUTTON_STYLES[btn] || "text-white";
  };

  return (
    <div className="w-full grid grid-cols-4 gap-2 sm:gap-3">
      {BUTTONS.flat().map((btn, index) => {
        const base =
          "flex items-center justify-center rounded-full text-lg sm:text-xl h-12 sm:h-16 transition active:scale-95 bg-gray-800 hover:bg-gray-700";

        const textColor = getButtonStyle(btn);

        if (btn === "0") {
          return (
            <button
              key={index}
              onClick={() => onButtonClick(btn)}
              className={`col-span-2 flex items-center justify-start pl-4 sm:pl-6 rounded-full text-lg sm:text-xl h-12 sm:h-16 ${base} ${textColor}`}
            >
              0
            </button>
          );
        }

        return (
          <button
            key={index}
            onClick={() => onButtonClick(btn)}
            className={`${base} ${textColor}`}
          >
            {btn}
          </button>
        );
      })}
    </div>
  );
}

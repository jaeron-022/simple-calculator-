import { useCalculatorLogic } from "./hooks/useCalculatorLogic";
import { useCalculatorHistory } from "./hooks/useCalculatorHistory";
import { useTypingState } from "./hooks/useTypingState";
import { Display } from "./components/Display";
import { ButtonGrid } from "./components/ButtonGrid";
import { HistoryPanel } from "./components/HistoryPanel";

function App() {
  const { input, setInput, handleClick, clear, backspace, percent, calculate } = useCalculatorLogic();
  const { history, showHistory, setShowHistory, addToHistory, clearHistory, removeHistoryItem } = useCalculatorHistory();
  const { isTyping, handleTyping } = useTypingState();

  const handleButtonClick = (btn) => {
    handleTyping();

    if (btn === "C") {
      clear();
    } else if (btn === "%") {
      percent();
    } else if (btn === "⌫") {
      backspace();
    } else if (btn === "=") {
      const result = calculate();
      if (result !== undefined) {
        addToHistory(input, result);
        setInput(result);
      }
    } else {
      handleClick(btn);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-3">
      <div className="bg-black p-4 rounded-[2.5rem] w-[340px] max-w-[92vw] h-[520px] shadow-2xl border border-gray-800 relative overflow-hidden">
        {/* History Panel */}
        {showHistory && (
          <HistoryPanel
            history={history}
            onBack={() => setShowHistory(false)}
            onClear={clearHistory}
            onSelectHistoryItem={(item) => {
              setInput(item.split("=")[1].trim());
              setShowHistory(false);
            }}
            onDeleteHistoryItem={removeHistoryItem}
          />
        )}

        {/* Calculator Panel */}
        {!showHistory && (
          <div className="absolute inset-0 p-4 transition-all duration-300 flex flex-col">
            {/* History button */}
            <div className="flex justify-end mb-2 shrink-0">
              <button
                onClick={() => setShowHistory(true)}
                className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 
                           hover:bg-gray-700 hover:text-white 
                           active:scale-95 transition shadow-md"
              >
                History
              </button>
            </div>

            {/* Display */}
            <Display input={input} isTyping={isTyping} />

            {/* Buttons */}
            <div className="flex-1 flex items-end">
              <ButtonGrid onButtonClick={handleButtonClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
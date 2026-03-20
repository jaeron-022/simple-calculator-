export function HistoryPanel({
  history,
  onBack,
  onClear,
  onSelectHistoryItem,
  onDeleteHistoryItem,
}) {
  return (
    <div
      className={`absolute inset-0 p-4 transition-all duration-300 flex flex-col ${
        "opacity-100 translate-x-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4 shrink-0">
        <button
          onClick={onBack}
          className="text-sm text-orange-400 hover:text-orange-300 transition"
        >
          ← Back
        </button>

        <h2 className="text-lg font-medium">History</h2>

        <button
          onClick={onClear}
          className="text-sm text-red-400 hover:text-red-300 transition"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 history-scroll">
        {history.length === 0 ? (
          <p className="text-gray-600 text-center mt-10 text-sm">No history yet</p>
        ) : (
          history.map((item, i) => (
            <div
              key={i}
              className="group flex items-center justify-between p-2 rounded hover:bg-gray-800 transition text-base"
            >
              <span
                onClick={() => onSelectHistoryItem(item)}
                className="flex-1 text-right cursor-pointer break-all"
              >
                {item}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteHistoryItem(i);
                }}
                className="ml-2 text-red-400 hover:text-red-300 transition text-sm shrink-0"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

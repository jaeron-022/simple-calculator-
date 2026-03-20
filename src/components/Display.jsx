export function Display({ input, isTyping }) {
  return (
    <div className="w-full overflow-x-auto mb-6 px-2 py-2 scrollbar-hide">
      <div className="text-right text-4xl sm:text-5xl font-light flex justify-end items-center leading-none whitespace-nowrap">
        <span>{input}</span>

        <span
          className={`inline-block w-0.5 h-[1em] bg-white ml-0.5 flex-shrink-0 ${
            isTyping ? "opacity-100" : "cursor-blink"
          }`}
        />
      </div>
    </div>
  );
}

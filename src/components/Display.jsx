export function Display({ input, isTyping }) {
  return (
    <div className="w-full h-24 overflow-y-auto overflow-x-hidden mb-6 px-2 py-2 number-display-vertical-scroll">
      <div className="text-right text-4xl font-light leading-none break-all whitespace-normal">
        <span>{input}</span>

        <span
          className={`inline-block w-0.5 h-[1em] bg-white ml-0.5 align-bottom ${
            isTyping ? "opacity-100" : "cursor-blink"
          }`}
        />
      </div>
    </div>
  );
}

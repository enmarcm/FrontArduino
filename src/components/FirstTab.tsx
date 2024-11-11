import React from "react";

interface FirstTabProps {
  inputText: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  morseText: string;
  handleSend: () => void;
}

const FirstTab: React.FC<FirstTabProps> = ({
  inputText,
  handleInputChange,
  morseText,
  handleSend,
}) => {
  return (
    <div className="grid grid-cols-2 grid-rows-[9fr_1fr] gap-4 h-full">
      <textarea
        className="border p-2 w-full h-full bg-gray-800 text-white placeholder-gray-400 col-span-1 row-span-1"
        placeholder="Escribe aquí..."
        value={inputText}
        onChange={handleInputChange}
      />
      <div className="border p-2 w-full h-full bg-black text-white col-span-1 row-span-1">
        <h2 className="font-bold">Código Morse:</h2>
        <p>{morseText}</p>
      </div>
      <button
        className="border p-2 w-full h-full bg-blue-600 text-white font-bold rounded col-span-2 row-span-1 hover:bg-blue-700 transition duration-200"
        onClick={handleSend}
      >
        Enviar
      </button>
    </div>
  );
};

export default FirstTab;
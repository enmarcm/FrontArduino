import React, { useEffect, useRef } from 'react';

interface SecundTabProps {
  receivedMorse: string;
  translatedText: string;
}

const SecundTab: React.FC<SecundTabProps> = ({ receivedMorse, translatedText }) => {
  const morseRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (morseRef.current) {
      morseRef.current.scrollTop = morseRef.current.scrollHeight;
    }
  }, [receivedMorse]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [translatedText]);

  return (
    <div className="relative grid grid-cols-2 gap-4 h-full">
      <div className="fixed top-0 left-0 m-2 flex items-center z-50">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="ml-2 text-green-500">Escuchando</span>
      </div>
      <div ref={morseRef} className="border p-2 w-full h-full bg-black text-white overflow-y-auto">
        <h2 className="font-bold">Código Morse Recibido:</h2>
        <p className="whitespace-pre-wrap">{receivedMorse}</p>
      </div>
      <div ref={textRef} className="border p-2 w-full h-full bg-gray-800 text-white overflow-y-auto">
        <h2 className="font-bold">Texto Traducido:</h2>
        <p className="whitespace-pre-wrap">{translatedText}</p>
      </div>
    </div>
  );
};

export default SecundTab;
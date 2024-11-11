import React from 'react';

interface SecundTabProps {
  receivedMorse: string;
  translatedText: string;
}

const SecundTab: React.FC<SecundTabProps> = ({ receivedMorse, translatedText }) => {
  return (
    <div className="relative grid grid-cols-2 gap-4 h-full">
      <div className="fixed top-0 left-0 m-2 flex items-center z-50">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="ml-2 text-green-500">Escuchando</span>
      </div>
      <div className="border p-2 w-full h-full bg-black text-white">
        <h2 className="font-bold">Código Morse Recibido:</h2>
        <p>{receivedMorse}</p>
      </div>
      <div className="border p-2 w-full h-full bg-gray-800 text-white">
        <h2 className="font-bold">Texto Traducido:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default SecundTab;
import { useState, useEffect } from "react";
import morseToText from "../utils/morseToText";

const useWebSocket = (url: string) => {
  const [receivedMorse, setReceivedMorse] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const morseData = event.data;
      setReceivedMorse(morseData);
      setTranslatedText(morseToText(morseData));
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { receivedMorse, translatedText };
};

export default useWebSocket;
import { useState, useEffect } from "react";
import morseToText from "../utils/morseToText";

const useWebSocket = (url: string) => {
  const [receivedMorse, setReceivedMorse] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    let ws: WebSocket;

    const connect = () => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const morseData = event.data;
        setReceivedMorse(morseData);
        setTranslatedText(morseToText(morseData));
      };

      ws.onclose = () => {
        console.log("WebSocket closed. Reconnecting...");
        setTimeout(connect, 1000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        ws.close();
      };
    };

    connect();

    return () => {
      ws.close();
    };
  }, [url]);

  return { receivedMorse, translatedText };
};

export default useWebSocket;
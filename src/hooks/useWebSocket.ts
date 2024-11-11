import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import morseToText from "../utils/morseToText";

const useWebSocket = (url: string) => {
  const [receivedMorse, setReceivedMorse] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);

  useEffect(() => {
    const socket: Socket = io(url);

    socket.on("connect", () => {
      console.log("Socket.IO connected");
    });

    socket.on("message", (data: string) => {
      if (data.includes("INIT")) {
        alert("Llegó transmisión");
        setIsTransmitting(true);
        setReceivedMorse("INIT");
        setTranslatedText("");
      } else if (data.includes("END")) {
        alert("Terminó transmisión");
        setIsTransmitting(false);
        setReceivedMorse((prev) => prev + "END");
      } else if (isTransmitting) {
        setReceivedMorse((prev) => prev + data);
        setTranslatedText((prev) => prev + morseToText(data));
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected. Reconnecting...");
    });

    socket.on("connect_error", (error: any) => {
      console.error("Socket.IO connection error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, isTransmitting]);

  return { receivedMorse, translatedText };
};

export default useWebSocket;

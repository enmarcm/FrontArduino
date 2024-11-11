// useMorseConverter.ts
import { useState, useEffect } from "react";
import textToMorse from "../utils/textToMorse";

const useMorseConverter = (inputText: string) => {
  const [morseText, setMorseText] = useState("");

  useEffect(() => {
    setMorseText(textToMorse(inputText));
  }, [inputText]);

  return morseText;
};

export default useMorseConverter;
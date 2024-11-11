const morseToText = (morse: string) => {
  const morseCode: { [key: string]: string } = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    " ": "/",
  };

  const textCode: { [key: string]: string } = Object.entries(morseCode).reduce(
    (acc, [key, value]) => {
      acc[value] = key;
      return acc;
    },
    {} as { [key: string]: string }
  );

  return morse
    .split(" ")
    .map((code) => textCode[code] || "")
    .join("");
};

export default morseToText;

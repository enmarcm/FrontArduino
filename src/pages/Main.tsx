import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fetcho from "../utils/Fetcho";
import CONSTANTS from "../constants";
import morseToText from "../utils/morseToText";
import textToMorse from "../utils/textToMorse";
import Modalito from "../components/Modalito";
import FirstTab from "../components/FirstTab";
import SecundTab from "../components/SecundTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="h-full w-full"
    >
      {value === index && (
        <Box sx={{ p: 3 }} className="h-full w-full">
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Main() {
  const [value, setValue] = useState(0);
  const [inputText, setInputText] = useState("");
  const [morseText, setMorseText] = useState("");
  const [receivedMorse, setReceivedMorse] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    setMorseText(textToMorse(inputText));
  }, [inputText]);

  useEffect(() => {
    const ws = new WebSocket(CONSTANTS.URL);

    ws.onmessage = (event) => {
      const morseData = event.data;
      setReceivedMorse(morseData);
      setTranslatedText(morseToText(morseData));
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendArduino = async () => {
    setLoading(true);
    const response = await Fetcho({
      url: CONSTANTS.URL,
      method: "POST",
      body: { morse: morseText },
    });
    console.log(response);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      <div className="mt-6 mb-2 mx-auto text-red">
        <img src="logo.png" alt="ARDUINO" className="h-32" />
      </div>

      <div className="mt-2 flex flex-col flex-grow">
        <Box
          sx={{ width: "100%", height: "100%" }}
          className="h-full w-full flex flex-col"
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="TABS"
              centered
            >
              <Tab label="Enviar" {...a11yProps(0)} />
              <Tab label="Recibir" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box className="flex-grow h-full w-full">
            <CustomTabPanel value={value} index={0}>
              <FirstTab
                inputText={inputText}
                handleInputChange={handleInputChange}
                morseText={morseText}
                handleSend={handleSendArduino}
              />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <SecundTab
                receivedMorse={receivedMorse}
                translatedText={translatedText}
              />
            </CustomTabPanel>
          </Box>
        </Box>
      </div>

      <Modalito
        open={open}
        onClose={handleClose}
        onClickClose={handleClose}
        title="Alerta"
        content="Recuerda que este conectado el arduino"
        closeText="Entendido"
      />

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <CircularProgress color="inherit" />
          <span className="ml-4 text-white">Enviando...</span>
        </div>
      )}
    </div>
  );
}

export default Main;

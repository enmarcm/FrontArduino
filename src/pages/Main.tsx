import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Fetcho from "../utils/Fetcho";
import CONSTANTS from "../constants";
import Modalito from "../components/Modalito";
import FirstTab from "../components/FirstTab";
import SecundTab from "../components/SecundTab";
import useWebSocket from "../hooks/useWebSocket";
import useMorseConverter from "../hooks/useMorseConverter";
import Loading from "../components/Loading";

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
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const morseText = useMorseConverter(inputText);
  const { receivedMorse, translatedText } = useWebSocket(CONSTANTS.URL);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

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
      <div className=" p-1 mx-auto text-red">
        <img src="logo.png" alt="Logo Arduino" className="h-32" />
      </div>

      <div className="flex flex-col flex-grow">
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

      {loading && <Loading />}
    </div>
  );
}

export default Main;

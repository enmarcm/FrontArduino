import { Box } from "@mui/material";
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

export default CustomTabPanel;
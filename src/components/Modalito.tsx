import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface ModalitoProps {
  open: boolean;
  onClose: () => void;
  onClickClose: () => void;
  title: string;
  content: string;
  closeText: string;
}

const Modalito: React.FC<ModalitoProps> = ({
  open,
  onClose,
  onClickClose,
  title,
  content,
  closeText,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickClose} color="primary">
          {closeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modalito;
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  dismissPreviousSnackbar,
  Snackbar as SnackbarType,
} from "./snackbarsSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";

export const Snackbars = () => {
  const snackbars = useAppSelector(({ snackbars }) => snackbars);

  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const [visibleSnackbar, setVisibleSnackbar] = useState<SnackbarType>();

  useEffect(() => {
    if (snackbars.length && !visibleSnackbar) {
      setVisibleSnackbar(snackbars[0]);
      dispatch(dismissPreviousSnackbar());
      setIsOpen(true);
    } else if (snackbars.length && visibleSnackbar && isOpen) {
      setIsOpen(false);
    }
  }, [snackbars, visibleSnackbar, isOpen, dispatch]);

  function onClosed(event: Event | SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  }

  function onExited() {
    setVisibleSnackbar(undefined);
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClosed}
      TransitionProps={{ onExited }}
      key={visibleSnackbar?.id}
      message={visibleSnackbar?.title}
      action={
        <IconButton color="inherit" onClick={onClosed}>
          <CloseIcon />
        </IconButton>
      }
    />
  );
};

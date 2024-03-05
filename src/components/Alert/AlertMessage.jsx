import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Alert } from "@mui/material";

function AlertMessage({ id, message, count, severity }) {
  const dispatch = useDispatch();

  async function close({ count, id }) {
    setTimeout(() => removeAlert(id), count * 1000);
  }

  function removeAlert(id) {
    if (id) {
      dispatch({
        type: reducerTypes.GET_ALERT,
        payload: { id },
      });
    }
  }

  close({ count, id });
  return (
    <Alert severity={severity || "error"}>
      {message}
      <IconButton variant="outliner" onClick={() => removeAlert(id)}>
        <CloseIcon />
      </IconButton>
    </Alert>
  );
}

export default AlertMessage;

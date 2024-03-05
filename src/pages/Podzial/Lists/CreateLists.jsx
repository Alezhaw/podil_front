import { useState } from "react";
import { TextField, Button, useTheme, Typography, Divider } from "@mui/material";
import Lists from "../../../api/lists/lists";
import { customAlert } from "../../../components/Alert/AlertFunction";

function CreateLists({ item, country, setIsOpen }) {
  const theme = useTheme();

  const [sheetProperties, setSheetProperties] = useState({ key: "1s7UBLD4XIWSuX0slyn0a-CkLGUyoQE55fQO5kbXwm5Y", range: "A8:AO" });
  const [createDisabled, setCreateDisabled] = useState(false);

  async function createLists({ key, range, id_for_base }) {
    setCreateDisabled(true);
    const createResult = await Lists.create(country, id_for_base, key, range);

    if (createResult && !createResult?.message) {
      if (!!createResult?.errors[0]) {
        customAlert({ message: "Check error in console" });
        console.log("error:", createResult);
      } else {
        console.log("lists", createResult?.lists);
        customAlert({ message: "Sucess", severity: "success" });
      }
    } else {
      customAlert({ message: createResult?.message || "Something went wrong" });
    }

    setCreateDisabled(false);
  }

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)", zIndex: 1001 }} className="modalStyles">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modalContentStyles styledScroll"
        style={{
          background: theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d",
          color: theme.palette.text.primary,
          alignItems: "baseline",
          position: "relative",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="createBlock createColumn">
            <Typography className="createTitle" variant="body1" component="h2">
              Sheet key
            </Typography>
            <Divider style={{ minWidth: "100%" }} />
            <TextField
              className="createSelect"
              rows={5}
              variant="standard"
              style={{ marginTop: "15px" }}
              onChange={(e) => setSheetProperties((prev) => ({ ...prev, key: e.target.value }))}
              type="text"
              placeholder="Example: 18GeI0IMCm0WcQjhzVK2tHa5TXr8cfYJ3zLMRkaIbNek"
              value={sheetProperties?.key || ""}
            />
          </div>

          <div className="createBlock createColumn">
            <Typography className="createTitle" variant="body1" component="h2">
              Sheet range
            </Typography>
            <Divider style={{ minWidth: "100%" }} />
            <TextField
              className="createSelect"
              rows={5}
              variant="standard"
              style={{ marginTop: "15px" }}
              onChange={(e) => setSheetProperties((prev) => ({ ...prev, range: e.target.value }))}
              type="text"
              placeholder="Example: A8:AO"
              value={sheetProperties?.range || ""}
            />
          </div>
        </div>
        <Button
          variant="outlined"
          style={{ marginTop: "15px" }}
          onClick={() => createLists({ ...sheetProperties, id_for_base: item?.id_for_base })}
          disabled={createDisabled || !sheetProperties?.key || !sheetProperties?.range}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default CreateLists;

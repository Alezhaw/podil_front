import { useState } from "react";
import { TextField, Button, useTheme, Typography, Checkbox, FormControlLabel } from "@mui/material";

function CreateCityForTest({ setIsOpen, item, createCity, messages, forCityId }) {
  const theme = useTheme();
  const [statusByTest, setStatusByTest] = useState({ visible_in_podil: true, visible_in_bases: true, visible_in_speaker: false, visible_in_scenario: false });
  const [callingScheme, setCallingScheme] = useState("");

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modalContentStyles styledScroll"
        style={{
          background: theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d",
          color: theme.palette.text.primary,
          alignItems: "baseline",
          position: "relative",
          maxHeight: "80vh",
          //width: "80vh",
          overflow: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="createContainer">
            <div className="createBlock">
              <Typography className="createTitle" variant="body1" component="h2">
                {messages?.create_city_title}
              </Typography>
              <TextField className="createSelect" rows={5} variant="standard" style={{ marginTop: "15px" }} onChange={(e) => setCallingScheme(e.target.value)} type="text" value={callingScheme} />
            </div>
            <div>
              <div className="createBlock" style={{ justifyContent: "space-between" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusByTest.visible_in_podil}
                      onChange={() => {
                        setStatusByTest((prev) => ({ ...prev, visible_in_podil: !prev.visible_in_podil }));
                      }}
                    />
                  }
                  label={messages?.send_to_podil}
                  sx={{ color: "text.primary" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusByTest.visible_in_bases}
                      onChange={() => {
                        setStatusByTest((prev) => ({ ...prev, visible_in_bases: !prev.visible_in_bases }));
                      }}
                    />
                  }
                  label={messages?.send_to_bases}
                  sx={{ color: "text.primary" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusByTest.visible_in_speaker}
                      onChange={() => {
                        setStatusByTest((prev) => ({ ...prev, visible_in_speaker: !prev.visible_in_speaker }));
                      }}
                    />
                  }
                  label={messages?.send_to_speaker}
                  sx={{ color: "text.primary" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusByTest.visible_in_scenario}
                      onChange={() => {
                        setStatusByTest((prev) => ({ ...prev, visible_in_scenario: !prev.visible_in_scenario }));
                      }}
                    />
                  }
                  label={messages?.send_to_scenario}
                  sx={{ color: "text.primary" }}
                />
              </div>
            </div>
          </div>
          <div>
            <Button
              variant="outlined"
              style={{ marginTop: "15px" }}
              onClick={() => (forCityId ? createCity(item, callingScheme, statusByTest) : createCity(item, false, "", callingScheme, statusByTest))}
            >
              {messages?.create}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateCityForTest;

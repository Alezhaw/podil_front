import React, { useState, useEffect, useRef } from "react";
import { getFormatTimeByTime, timeColors } from "../../../utils/utils";
import { TextField } from "@mui/material";

function TimeWithLimits({ limits, setLimits }) {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });

  return (
    <td className="basesTableCell black" style={{ minWidth: "100px", padding: "0px" }} ref={ref}>
      <div className="tableInput">
        {limits?.map((el, index) => {
          const timesLength = limits?.length;
          let timeColorIndex = 2;
          const timeInteger = getFormatTimeByTime(el?.time);
          switch (true) {
            case timeInteger < 12:
              timeColorIndex = 0;
              break;
            case timeInteger < 16:
              timeColorIndex = 1;
              break;
          }

          return (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center", background: timeColors[timeColorIndex], height: height / timesLength, padding: "0 8px" }}
            >
              {el?.time}
              <TextField
                style={{ color: "black" }}
                variant="standard"
                type="number"
                value={el?.limit}
                onChange={(e) => setLimits((prev) => prev?.map((item) => (item.time === el.time ? { ...item, limit: e.target.value } : item)))}
              />
            </div>
          );
        })}
      </div>
    </td>
  );
}
export default TimeWithLimits;

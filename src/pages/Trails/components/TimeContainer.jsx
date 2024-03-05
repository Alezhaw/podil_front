import React, { useState, useEffect, useRef } from "react";
import { getValueById } from "../../../components/functions";
import { getFormatTimeByTime, timeColors } from "../../../utils/utils";

function TimeContainer({ item, presentationTimes, messages }) {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });

  return (
    <td className="basesTableCell" style={{ maxWidth: "unset", padding: "0px" }} ref={ref}>
      <div className="tableInput">
        {(getValueById(item.presentation_time_id, "presentation_hour", presentationTimes) || []).map((time, index) => {
          const timesLength = (getValueById(item.presentation_time_id, "presentation_hour", presentationTimes) || [])?.length;
          let timeColorIndex = 2;
          const timeInteger = getFormatTimeByTime(time);
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
              className="tableInput"
              key={index}
              style={{ background: timeColors[timeColorIndex], height: height / timesLength, display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              {time} / {[item?.limits]?.flat()[index] || 0}
            </div>
          );
        })}
        {getValueById(item.presentation_time_id, "alternative", presentationTimes) ? <div className="tableInput">{messages?.alternative}</div> : ""}
      </div>
    </td>
  );
}
export default TimeContainer;

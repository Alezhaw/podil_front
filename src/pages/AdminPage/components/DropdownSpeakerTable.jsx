import { Button } from "@material-ui/core";
import { useState } from "react";
import CreateTemplate from "./CreateTemplate";

function DropdownSpeakerTable({ filterSpeaker, time, present }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {time}
        {filterSpeaker.map((el) => el.text)}
        {present}
      </div>

      <Button style={{ fontWeight: 700, fontSize: "70px" }} onClick={() => setIsOpen(true)}>
        +
      </Button>
      {isOpen ? <CreateTemplate setIsOpen={setIsOpen} /> : ""}
    </div>
  );
}

export default DropdownSpeakerTable;

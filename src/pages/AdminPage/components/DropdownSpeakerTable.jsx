import { Button } from "@material-ui/core";

function DropdownSpeakerTable() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        Zametka
        <input />
      </div>

      <Button style={{ fontWeight: 700, fontSize: "70px" }}>+</Button>
    </div>
  );
}

export default DropdownSpeakerTable;

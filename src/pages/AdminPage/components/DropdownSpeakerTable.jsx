import { Button } from "@material-ui/core";

function DropdownSpeakerTable({ filterSpeaker, godzina, present }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {godzina}
        {filterSpeaker.map((el) => el.text)}
        {present}
      </div>

      <Button style={{ fontWeight: 700, fontSize: "70px" }}>+</Button>
    </div>
  );
}

export default DropdownSpeakerTable;

import { MenuItem, FormControl, Select } from "@mui/material";

function TrailSelect({ forPlanningPerson, valueKey, trail, setTrail, array, arrayKey }) {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={trail[valueKey] || ""}
        onChange={(e) => {
          if (forPlanningPerson) {
            const date = new Date();
            let date_scheduled = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
            setTrail((prev) => ({ ...prev, date_scheduled }));
          }
          setTrail((prev) => ({ ...prev, [valueKey]: Number(e.target.value) }));
        }}
        style={{ fontWeight: 700, fontSize: "16px" }}
      >
        {array?.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item[arrayKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default TrailSelect;

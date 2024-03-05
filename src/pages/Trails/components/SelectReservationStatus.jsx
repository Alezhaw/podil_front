import { FormControl, Select, MenuItem } from "@mui/material";
import { colors } from "../../../utils/utils";

function SelectReservationStatus({ item, allDictionary }) {
  return (
    <td className="basesTableCell black" style={{ background: item.sent_to_podil ? colors.green : colors.red }}>
      <FormControl variant="standard">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={item.reservation_status_id}
          onChange={(e) => {
            console.log(1, e.target.value, allDictionary?.reservationStatuses);
            // createCity(item, e.target.value, "visible_in_podil", null, null, null, allDictionary, departure, forms, citiesWithRegions);
          }}
          style={{ color: "black" }}
        >
          {allDictionary?.reservationStatuses?.map((el) => (
            <MenuItem value={el?.id}>{el?.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </td>
  );
}
export default SelectReservationStatus;

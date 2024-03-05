import { useNavigate } from "react-router-dom";
import { FormControl, Radio, RadioGroup, FormControlLabel, TableCell, TableRow } from "@mui/material";

function AllPotwTable({ departureArray, departureIndex, departure, arrayIndex, currentCities, country, trailsForCampaign, servers, instances, setUniqueDepartureDateId }) {
  const navigate = useNavigate();
  const currentTrail = trailsForCampaign?.find((el) => el.id === currentCities[0]?.trailId);
  const currentServer = servers?.find((el) => el.id === currentTrail?.gazooServerId);
  const currentInstance = instances?.find((el) => el?.ApiAddress === currentServer?.url);
  const routeNumber = departure?.find((el) => el.id === departureArray?.flat()[0]?.departureId);
  function formatDate(date) {
    if (!date) {
      return;
    }
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

  return currentCities?.map((item, index) => (
    <TableRow key={item.id === "create" ? `${item.id_for_base + item.time + index}` : item.id}>
      <TableCell style={{ cursor: "pointer" }} onClick={() => navigate(`/city/${item?.id_for_base}`)}>
        {item.id_for_base || ""}
      </TableCell>
      <TableCell>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            value={item?.generationType || ""}
            onChange={(e) =>
              setUniqueDepartureDateId((prev) => prev?.map((array) => array?.map((el) => el?.map((time) => (time?.id === item?.id ? { ...time, generationType: e.target.value } : time)))))
            }
          >
            <FormControlLabel value={""} control={<Radio color="primary" />} label="NONE" labelPlacement="end" />
            <FormControlLabel value="PBX" control={<Radio color="primary" />} label="PBX" labelPlacement="end" />
            <FormControlLabel value="BOT" control={<Radio color="primary" />} label="BOT" labelPlacement="end" />
          </RadioGroup>
        </FormControl>
      </TableCell>
      <TableCell>
        {item?.city_lokal} / {item?.institution}
      </TableCell>
      <TableCell>{item?.time}</TableCell>
      <TableCell>{item?.quantity_invites}</TableCell>
      <TableCell>{item?.consent_another_city}</TableCell>
    </TableRow>
  ));
}

export default AllPotwTable;

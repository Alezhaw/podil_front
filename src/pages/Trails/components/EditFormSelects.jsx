import { useAppSelector } from "../../../store/reduxHooks";
import { Autocomplete, TextField, Typography, IconButton } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { getValueById } from "../../../components/functions";

function EditFormSelects({ messages, setForm, form, selectedAddress, setSelectedAddress, searchLocations, setSearchLocations, disabled }) {
  const { allDictionary, allCitiesWithRegions } = useAppSelector((store) => store.trails);

  const handleSearch = async (e) => {
    const value = e.target.value;
    const provider = new OpenStreetMapProvider();
    if (!value) return;
    try {
      const results = await provider.search({ query: value });
      if (results) {
        setSearchLocations(results);
      }
    } catch (e) {
      console.log("map search", e);
    }
  };

  const handleOptionSelect = (event, value) => {
    setSelectedAddress(value);
    if (!value) return;
    setForm((prev) => ({ ...prev, address: value.label, start_coord: value.x, end_coord: value.y }));
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="createContainer">
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.region}
          </Typography>
          <Autocomplete
            disabled={disabled}
            className="createSelect"
            disablePortal
            id="combo-box-demo"
            disableClearable
            options={allDictionary?.regions?.map((el) => ({ ...el, label: el.region }))}
            onChange={(e, values) => {
              setForm((prev) => ({ ...prev, city_id: null, town: "", region_id: Number(values?.id), county: values.region }));
            }}
            renderInput={(params) => <TextField {...params} label="Region" variant="standard" />}
            value={getValueById(form.region_id, "region", allDictionary?.regions)}
          />
        </div>
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.city_search}
          </Typography>
          <Autocomplete
            className="createSelect"
            id="movie-customized-option-demo"
            disablePortal
            disableClearable
            disabled={!form?.region_id || disabled}
            options={allCitiesWithRegions?.map((el) => ({ ...el, label: el.city_name }))}
            sx={{ width: 300 }}
            onChange={(e, values) => {
              setForm((prev) => ({ ...prev, city_id: Number(values?.id), town: values.city_name }));
            }}
            renderInput={(params) => <TextField {...params} label="City" variant="standard" />}
            value={getValueById(form.city_id, "city_name", allCitiesWithRegions)}
            componentsProps={{
              popper: {
                modifiers: [
                  {
                    name: "flip",
                    enabled: false,
                  },
                  {
                    name: "preventOverflow",
                    enabled: false,
                  },
                ],
              },
            }}
          />
        </div>
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.institution}
          </Typography>
          <TextField disabled={disabled} className="createSelect" variant="standard" onChange={(e) => setForm((prev) => ({ ...prev, local: e.target.value }))} type="text" value={form.local || ""} />
        </div>
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.address}
          </Typography>
          <TextField
            disabled={disabled}
            className="createSelect"
            variant="standard"
            onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
            type="text"
            value={form.address || ""}
          />
          {/* <Autocomplete
            disabled={disabled}
            className="createSelect"
            value={selectedAddress}
            onChange={handleOptionSelect}
            filterOptions={(options) => options}
            options={searchLocations?.map((el) => ({ ...el, label: `${el.label}/${el.raw.place_id}` }))}
            isOptionEqualToValue={(option, value) => {
              return `${option.label}/${option.raw.place_id}` === `${value.label}/${value.raw.place_id}`;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e);
                  }
                }}
                onBlur={(e) => handleSearch(e)}
                label="Search for an address"
                variant="standard"
              />
            )}
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
          /> */}
        </div>
      </div>
      <div className="createContainer">
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2" onClick={() => console.log(1, form)}>
            {messages?.telephone}
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {form?.telephone?.map((el, index) => (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem" }} key={el.id}>
                <MuiTelInput
                  disabled={disabled}
                  value={el.tel}
                  onChange={(e) => setForm((prev) => ({ ...prev, telephone: prev.telephone.map((item) => (item.id === el.id ? { ...item, tel: e } : item)) }))}
                />
                {index + 1 === form?.telephone?.length ? (
                  <IconButton onClick={() => setForm((prev) => ({ ...prev, telephone: [...prev.telephone, { id: el.id + 1, tel: "+48" }] }))}>
                    <AddIcon />
                  </IconButton>
                ) : null}
                {index === 0 ? null : (
                  <IconButton onClick={() => setForm((prev) => ({ ...prev, telephone: prev?.telephone?.filter((item) => item.id !== el.id) }))}>
                    <RemoveIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.email}
          </Typography>
          <TextField disabled={disabled} className="createSelect" variant="standard" onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} type="text" value={form.email || ""} />
        </div>
      </div>
      <div className="createContainer">
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.cost}
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {form?.cost?.map((el, index) => (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem" }} key={el.id}>
                <TextField
                  disabled={disabled}
                  className="createSelect"
                  variant="standard"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      cost: prev.cost.map((item) =>
                        item.id === el.id
                          ? {
                              ...item,
                              c: e.target.value,
                            }
                          : item
                      ),
                    }))
                  }
                  type="text"
                  value={el.c || ""}
                />

                {index + 1 === form?.cost?.length ? (
                  <IconButton onClick={() => setForm((prev) => ({ ...prev, cost: [...prev.cost, { id: el.id + 1, c: "" }] }))}>
                    <AddIcon />
                  </IconButton>
                ) : null}
                {index === 0 ? null : (
                  <IconButton onClick={() => setForm((prev) => ({ ...prev, cost: prev?.cost?.filter((item) => item.id !== el.id) }))}>
                    <RemoveIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.starting_price}
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {form?.starting_price?.map((el, index) => (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem" }} key={el.id}>
                <TextField
                  disabled={disabled}
                  className="createSelect"
                  variant="standard"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      starting_price: prev.starting_price.map((item) =>
                        item.id === el.id
                          ? {
                              ...item,
                              c: e.target.value,
                            }
                          : item
                      ),
                    }))
                  }
                  type="text"
                  value={el.c || ""}
                />

                {index + 1 === form?.starting_price?.length ? (
                  <IconButton onClick={() => setForm((prev) => ({ ...prev, starting_price: [...prev.starting_price, { id: el.id + 1, c: "" }] }))}>
                    <AddIcon />
                  </IconButton>
                ) : null}
                {index === 0 ? null : (
                  <IconButton onClick={() => setForm((prev) => ({ ...prev, starting_price: prev?.starting_price?.filter((item) => item.id !== el.id) }))}>
                    <RemoveIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.payment_method}
          </Typography>
          <TextField
            disabled={disabled}
            className="createSelect"
            variant="standard"
            onChange={(e) => setForm((prev) => ({ ...prev, payment_method: e.target.value }))}
            type="text"
            value={form.payment_method || ""}
          />
        </div>
      </div>

      <div className="createBlock">
        <Typography className="createTitle" variant="body1" component="h2">
          {messages?.confirm}
        </Typography>
        <TextField disabled={disabled} className="createSelect" variant="standard" onChange={(e) => setForm((prev) => ({ ...prev, confirm: e.target.value }))} type="text" value={form.confirm || ""} />
      </div>
      <div className="createBlock">
        <Typography className="createTitle" variant="body1" component="h2" onClick={() => console.log(1, form)}>
          {messages?.room_number}
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {form?.room_number?.map((el, index) => (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem" }} key={el.id}>
              <TextField
                disabled={disabled}
                className="createSelect"
                variant="standard"
                onChange={(e) => setForm((prev) => ({ ...prev, room_number: prev.room_number.map((item) => (item.id === el.id ? { ...item, r: e.target.value } : item)) }))}
                type="text"
                value={el.r || ""}
              />
              {index + 1 === form?.room_number?.length ? (
                <IconButton onClick={() => setForm((prev) => ({ ...prev, room_number: [...prev.room_number, { id: el.id + 1, r: "" }] }))}>
                  <AddIcon />
                </IconButton>
              ) : null}
              {index === 0 ? null : (
                <IconButton onClick={() => setForm((prev) => ({ ...prev, room_number: prev?.room_number?.filter((item) => item.id !== el.id) }))}>
                  <RemoveIcon />
                </IconButton>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="createBlock">
        <Typography className="createTitle" variant="body1" component="h2">
          {messages?.free_parking}
        </Typography>
        <TextField disabled={disabled} className="createSelect" variant="standard" onChange={(e) => setForm((prev) => ({ ...prev, parking: e.target.value }))} type="text" value={form.parking || ""} />
      </div>
      <div className="createBlock">
        <Typography className="createTitle" variant="body1" component="h2">
          {messages?.comments}
        </Typography>
        <TextField
          disabled={disabled}
          className="createSelect"
          variant="standard"
          onChange={(e) => setForm((prev) => ({ ...prev, comments: e.target.value }))}
          type="text"
          value={form.comments || ""}
        />
      </div>
      <div className="createContainer">
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.booker}
          </Typography>
          <TextField disabled={disabled} className="createSelect" variant="standard" onChange={(e) => setForm((prev) => ({ ...prev, booker: e.target.value }))} type="text" value={form.booker || ""} />
        </div>
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.trade_group}
          </Typography>
          <TextField
            disabled={disabled}
            className="createSelect"
            variant="standard"
            onChange={(e) => setForm((prev) => ({ ...prev, trade_group: e.target.value }))}
            type="text"
            value={form.trade_group || ""}
          />
        </div>
        <div className="createBlock">
          <Typography className="createTitle" variant="body1" component="h2">
            {messages?.company}
          </Typography>
          <TextField
            disabled={disabled}
            className="createSelect"
            variant="standard"
            onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
            type="text"
            value={form.company || ""}
          />
        </div>
      </div>
    </div>
  );
}

export default EditFormSelects;

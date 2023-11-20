import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { List, ListItem, ListItemText, TextField, Pagination, Checkbox, Button, FormControlLabel, Menu, MenuList, MenuItem, Select, FormControl, Typography } from "@mui/material";
import { reducerTrailsTypes } from "../../../../store/Trails/trailsTypes";
import { useAppSelector } from "../../../../store/reduxHooks";
import Departure from "../../../../api/trails/departure";
import DepartureItem from "./DepartureItem";
import Spinner from "react-bootstrap/Spinner";
import { PageContainer } from "../../../../components/Page.styled";

function EditDeparture() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statebackground = !!localStorage.getItem("backroundImg");
  const { user, locale, country } = useAppSelector((store) => store.user);
  const { allDeparture, allDepartureDate } = useAppSelector((store) => store.trails);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [sortId, setSortId] = useState(true);
  const [count, setCount] = useState(1);
  const [departures, setDepartures] = useState([]);

  const messages = useMemo(() => {
    return {
      return: locale["return"],
      delete: locale["delete"],
      delete_dates: locale["delete_dates"],
      items_per_page: locale["items_per_page"],
      are_you_sure: locale["are_you_sure"],
      days_of_the_week: locale["days_of_the_week"],
      departure_dates: locale["trails_departure_dates"],
      from: locale["from"],
      to: locale["to"],
      create: locale["city_id_apply"],
      update_error: locale["departure_update_error"],
      dates_error: locale["departure_dates_error"],
    };
  }, [locale]);

  async function getDeparture() {
    setLoadingSpinner(false);
    const data = await Departure.getForEditing({
      sort: !sortId,
      pageSize: itemsPerPage,
      page: page + 1,
      country,
    });
    setLoadingSpinner(true);
    if (data) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DEPARTURE,
        payload: data?.departure || [],
      });
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DEPARTURE_DATE,
        payload: data?.departureDate || [],
      });
      if (data) {
        setCount(data.count);
      }
    }
  }

  useEffect(() => {
    setDepartures(allDeparture);
    // eslint-disable-next-line
  }, [allDeparture]);

  useEffect(() => {
    getDeparture();
    // eslint-disable-next-line
  }, [sortId, itemsPerPage, page, country]);

  return (
    <PageContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => navigate("/trails")} variant="outlined">
          {messages.return}
        </Button>
      </div>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", marginTop: "1rem" }}>
          {departures?.map((item) => (
            <DepartureItem key={item.id} country={country} item={item} sort={sortId} allDepartureDate={allDepartureDate} messages={messages} getDeparture={getDeparture} />
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spinner animation="border" role="status" style={{ height: "200px", width: "200px" }}></Spinner>
        </div>
      )}

      <Pagination className="paginationButtonsWithoutPosition" color="primary" count={count} onChange={(e, value) => setPage(Number(value) - 1)} page={Number(page + 1)} />

      <div className="paginationCountWithoutPosition">
        <TextField
          id="outlined-number"
          label={messages.items_per_page}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setItemsPerPageForInput(Number(e.target.value))}
          onBlur={(e) => setItemsPerPage(Number(e.target.value))}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setPage(0);
              setItemsPerPage(Number(e.target.value));
            }
          }}
          value={itemsPerPageForInput}
          sx={{ m: 1, width: "170px" }}
          size="small"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
        />
      </div>
    </PageContainer>
  );
}

export default EditDeparture;

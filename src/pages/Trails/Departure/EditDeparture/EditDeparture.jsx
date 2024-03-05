import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { TextField, Pagination, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyDatePicker from "../../../../components/forPages/MyDatePicker";
import { reducerTrailsTypes } from "../../../../store/Trails/trailsTypes";
import { useAppSelector } from "../../../../store/reduxHooks";
import Trail from "../../../../api/trails/trails";
import Departure from "../../../../api/trails/departure";
import DepartureItem from "./DepartureItem";
import Spinner from "react-bootstrap/Spinner";
import { PageContainer } from "../../../../components/Page.styled";

function EditDeparture() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statebackground = !!localStorage.getItem("backroundImg");
  const { user, locale, country } = useAppSelector((store) => store.user);
  const { allDeparture, allDepartureDate, allDictionary } = useAppSelector((store) => store.trails);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [sortId, setSortId] = useState(true);
  const [count, setCount] = useState(1);
  const [departures, setDepartures] = useState([]);
  const yesterday = new Date().setDate(new Date().getDate() - 1);
  let date = new Date();
  date.setDate(date.getDate() - 1);
  date = date.toISOString().split("T")[0];
  const [filterDate, setFilterDate] = useState({ dateFrom: date });

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
      route_number: locale["trails_route_number"],
      company: locale["trails_company"],
    };
  }, [locale]);

  async function getDeparture(filterDate) {
    setLoadingSpinner(false);
    const data = await Departure.getForEditing({
      sort: !sortId,
      pageSize: itemsPerPage,
      page: page + 1,
      country,
      ...filterDate,
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

  async function getAllDictionary({ country }) {
    const allDictionary = await Trail.getAllDictionary({ country });
    if (allDictionary) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DICTIONARY,
        payload: allDictionary,
      });
    }
  }

  useEffect(() => {
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    setDepartures(allDeparture);
    // eslint-disable-next-line
  }, [allDeparture]);

  useEffect(() => {
    getDeparture(filterDate);
    // eslint-disable-next-line
  }, [sortId, filterDate, itemsPerPage, page, country]);

  return (
    <PageContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => navigate("/trails")} variant="outlined">
          {messages.return}
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <MyDatePicker
          defaultValue={dayjs(yesterday)}
          label={messages?.from}
          onChange={(e) =>
            setFilterDate((prev) => {
              let date = new Date(e);
              let dateFrom = null;
              try {
                dateFrom = date.toISOString().split("T")[0];
              } catch {
                return prev;
              }
              if (!e) {
                dateFrom = null;
              }
              return { ...prev, dateFrom };
            })
          }
        />

        <MyDatePicker
          label={messages?.to}
          onChange={(e) =>
            setFilterDate((prev) => {
              console.log(1, e);
              if (e) {
              }
              let date = new Date(e);
              date.setDate(date.getDate() + 1);
              let dateTo = null;
              try {
                dateTo = date.toISOString().split("T")[0];
              } catch {
                return prev;
              }
              if (!e) {
                dateTo = null;
              }
              return { ...prev, dateTo };
            })
          }
        />
      </div>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", marginTop: "1rem" }}>
          {departures?.map((item) => (
            <DepartureItem
              key={item.id}
              country={country}
              item={item}
              sort={sortId}
              allDepartureDate={allDepartureDate}
              messages={messages}
              getDeparture={getDeparture}
              filterDate={filterDate}
              allDictionary={allDictionary}
            />
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

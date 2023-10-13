import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { reducerTrailsTypes } from "../../../../store/Users/trails/trailsTypes";
import { useAppSelector } from "../../../../store/reduxHooks";
import Departure from "../../../../api/trails/departure";
import { Pagination, PaginationItem } from "@mui/material";
import DepartureItem from "./DepartureItem";
import Spinner from "react-bootstrap/Spinner";

function EditDeparture() {
  const { country } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statebackground = !!localStorage.getItem("backroundImg");
  const { user, locale } = useAppSelector((store) => store.user);
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
        payload: { allDeparture: data?.departure || [], country },
      });
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DEPARTURE_DATE,
        payload: { allDepartureDate: data?.departureDate || [], country },
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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        color: "white",
      }}
      className={!statebackground ? "styleAdminPanel" : "styleAdminPanel2"}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "0px 50px",
          background: "rgba(17, 17, 18, 0.65)",
        }}
      >
        {" "}
        {loadingSpinner ? (
          <div style={{ overflowX: "auto", marginTop: "40px" }}>
            {departures?.map((item) => (
              <DepartureItem key={item.id} country={country} item={item} sort={sortId} allDepartureDate={allDepartureDate} messages={messages} getDeparture={getDeparture} />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Spinner animation="border" role="status" style={{ height: "200px", width: "200px" }}></Spinner>
          </div>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            marginTop: "20px",
            justifyContent: "center",
          }}
        >
          <div style={{ marginTop: "20px", color: "white" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <div onClick={() => navigate("/adminPanel")} className="tabl-flex-admin-button-global2" style={{ textAlign: "center", padding: "0px 50px" }}>
                {messages.return}
              </div>
            </div>
          </div>
        </div>
        <Pagination
          style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
          count={count}
          shape="rounded"
          onChange={(e, value) => setPage(Number(value) - 1)}
          renderItem={(item) => <PaginationItem {...item} />}
          page={Number(page + 1)}
        />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", margin: "20px 0px" }}>
          <h6 style={{ margin: "0px", paddingRight: "10px" }}>{messages.items_per_page}</h6>
          <input
            className="tabl-flex-admin-pages"
            style={{ color: "white", borderRadius: "5px" }}
            type="number"
            name="name"
            value={itemsPerPageForInput}
            placeholder="Елементов на странице"
            // className={styles.input}
            onChange={(e) => setItemsPerPageForInput(Number(e.target.value))}
            onBlur={(e) => setItemsPerPage(Number(e.target.value))}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setPage(0);
                setItemsPerPage(Number(e.target.value));
              }
            }}
            autoComplete="off"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default EditDeparture;

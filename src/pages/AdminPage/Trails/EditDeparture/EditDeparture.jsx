import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { reducerTrailsTypes } from "../../../../store/Users/trails/trailsTypes";
import { useAppSelector } from "../../../../store/reduxHooks";
import Departure from "../../../../api/trails/departure";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import DepartureItem from "./DepartureItem";

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
      apply: locale["city_id_apply"],
      delete: locale["delete"],
      items_per_page: locale["items_per_page"],
    };
  }, [locale]);

  async function getDeparture({ sortId, itemsPerPage, page, country }) {
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
    getDeparture({ sortId, itemsPerPage, page, country });
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
        <div style={{ overflowX: "auto", marginTop: "40px" }}>
          {departures?.map((item) => (
            <DepartureItem key={item.id} item={item} sort={sortId} allDepartureDate={allDepartureDate} messages={messages} />
          ))}
        </div>
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
              <div className="tabl-flex-admin-button-global" onClick={() => null}>
                {messages.apply}
              </div>
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
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
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

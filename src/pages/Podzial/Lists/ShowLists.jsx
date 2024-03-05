import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, useTheme } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import DeleteIcon from "@mui/icons-material/Delete";
import Lists from "../../../api/lists/lists";
import "../../../components/forPages/input.css";
import { OtherStyle } from "../../../components/Page.styled";
import { PageContainer } from "../../../components/Page.styled";
import PaginationBlock from "../../../components/forPages/PaginationBlock";
import ShowListsRow from "./ShowListsRow";
import { useAppSelector } from "../../../store/reduxHooks";
import { socket } from "../../../App";
import { customAlert } from "../../../components/Alert/AlertFunction";

function ShowLists({ id_for_base, setIsOpen }) {
  //const { id_for_base } = useParams();
  const theme = useTheme();
  const { country, locale } = useAppSelector((store) => store.user);
  const [loading, setLoading] = useState(false);
  const [currentlists, setCurrentLists] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(20);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [deleteLists, setDeleteLists] = useState([]);
  const [zoom, setZoom] = useState(Number(localStorage.getItem("tableZoomShowLists")) || 1);

  const messages = useMemo(() => {
    return {
      city_lokal: locale["city_lokal"],
      status: locale["status"],
      citiesStatus: locale["cities_status"],
      add: locale["lists_add"],
      show: locale["lists_show"],
      items_per_page: locale["items_per_page"],
      not_found: locale["lists_not_found"],
      present: locale["lists_present"],
      full_name: locale["lists_full_name"],
      coupon_number: locale["lists_coupon_number"],
      telephone: locale["lists_telephone"],
      guests: locale["lists_guests"],
      couples: locale["lists_couples"],
      passport: locale["lists_passport"],
      age: locale["lists_age"],
      instead: locale["lists_instead"],
      guest_full_name: locale["lists_guest_full_name"],
      client_with_bank_refusal: locale["lists_client_with_bank_refusal"],
      guest_telephone: locale["lists_guest_telephone"],
      left_not_admitted: locale["lists_left_not_admitted"],
      reason: locale["lists_reason"],
      sms: locale["lists_sms"],
      notes: locale["lists_notes"],
      presentation_number: locale["lists_presentation_number"],
      location: locale["lists_location"],
      time: locale["lists_time"],
      address: locale["lists_address"],
      team: locale["lists_team"],
      who_called: locale["lists_who_called"],
      save: locale["trails_dictionary_save"],
      search: locale["search"],
      choose_all: locale["choose_all"],
      clear_all: locale["clear_all"],
      delete: locale["delete"],
    };
  }, [locale]);

  async function getLists({ country, id_for_base, search, itemsPerPage, page }) {
    setLoading(true);
    const result = await Lists.getByIdsForBase({ idsForBase: [id_for_base], country, page: page + 1, pageSize: itemsPerPage, search });
    setLoading(false);
    if (result?.lists) {
      setCurrentLists(result?.lists);
      setCount(result?.count);
    } else {
      customAlert({ message: "Something went wrong" });
    }
  }

  async function updateList({ item, setDisabled }) {
    setDisabled(true);
    const list = { ...item, telephone: item.telephone.map((el) => el.tel) };
    const result = await Lists.update(list, country);
    setDisabled(false);
    if (result && !result?.message) {
      customAlert({ message: "Sucess", severity: "success" });
    } else {
      customAlert({ message: "Something went wrong" });
    }
  }

  async function removeLists({ deleteLists, country }) {
    const result = await Lists.remove(deleteLists, country, false);
    if (result && !result?.message) {
      customAlert({ message: "Sucess", severity: "success" });
      setDeleteLists([]);
      getLists({ country, id_for_base: id_for_base, search, itemsPerPage, page });
    } else {
      customAlert({ message: result?.message || "Something went wrong" });
    }
  }

  function changeDeleteLists(checked, id) {
    if (checked) {
      setDeleteLists((prev) => [...prev, id]);
    } else {
      setDeleteLists((prev) => prev.filter((item) => item !== id));
    }
  }

  function changeZoom(e, value) {
    localStorage.setItem("tableZoomShowLists", value);
    setZoom(value);
  }

  useEffect(() => {
    getLists({ country, id_for_base: id_for_base, search, itemsPerPage, page });
    // eslint-disable-next-line
  }, [id_for_base, country, search, itemsPerPage, page]);

  useEffect(() => {
    socket.on("updateLists", ({ data }) => {
      if (country === data.country) {
        setCurrentLists((prev) =>
          prev?.map((list) => {
            const updatedList = data.lists.find((el) => Number(el.id) === list.id);
            return updatedList ? updatedList : list;
          })
        );
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <OtherStyle>
      <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)", zIndex: 1001 }} className="modalStyles">
        <div
          onClick={(e) => e.stopPropagation()}
          className="modalContentStyles"
          style={{
            background: theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d",
            color: theme.palette.text.primary,
            alignItems: "center",
            position: "relative",
            maxHeight: "90vh",
            maxWidth: "95vw",
            overflow: loading ? "hidden" : "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "1rem", width: "100%" }}>
            <TextField
              size="small"
              style={{ paddingBottom: "1rem" }}
              label={messages.search}
              variant="outlined"
              id="Search"
              value={searchForInput}
              onChange={(e) => setSearchForInput(e.target.value?.toLowerCase())}
              onBlur={(e) => {
                setPage(0);
                setSearch(e.target.value?.toLowerCase()?.trim());
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setPage(0);
                  setSearch(e.target.value?.toLowerCase()?.trim());
                }
              }}
            />

            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              <Button variant="outlined" style={{ maxHeight: "40px" }} onClick={async () => await removeLists({ deleteLists, country })} hidden={!deleteLists[0]}>
                <DeleteIcon />
              </Button>

              <Button
                variant="outlined"
                style={{ maxHeight: "40px", width: "max-content" }}
                onClick={async () => {
                  setDeleteLists([]);
                }}
                hidden={!deleteLists[0]}
              >
                {messages.clear_all}
              </Button>

              <Button
                variant="outlined"
                style={{ maxHeight: "40px", width: "max-content" }}
                onClick={async () => {
                  setDeleteLists((prev) => [...prev, ...currentlists?.map((item) => item.id)]);
                }}
              >
                {messages.choose_all}
              </Button>
            </div>
          </div>

          {!loading ? (
            <TableContainer component={Paper} className="scroll">
              <Table sx={{ minWidth: 650, minHeight: 650, color: "white", zoom }} aria-label="simple table" className="centerTable colorTable tableWithoutTdMaxWidth" size="small">
                <TableHead>
                  <TableRow className="tableHeader">
                    <TableCell className="basesTableCell"></TableCell>
                    <TableCell className="basesTableCell">ID</TableCell>
                    <TableCell className="basesTableCell">{messages?.present}</TableCell>
                    <TableCell className="basesTableCell">{messages?.full_name}</TableCell>
                    <TableCell className="basesTableCell">{messages?.coupon_number}</TableCell>
                    <TableCell className="basesTableCell">{messages?.telephone}</TableCell>
                    <TableCell className="basesTableCell">{messages?.guests}</TableCell>
                    <TableCell className="basesTableCell">{messages?.couples}</TableCell>
                    <TableCell className="basesTableCell">{messages?.passport}</TableCell>
                    <TableCell className="basesTableCell">{messages?.age}</TableCell>
                    <TableCell className="basesTableCell">{messages?.instead}</TableCell>
                    <TableCell className="basesTableCell">{messages?.guest_full_name}</TableCell>
                    <TableCell className="basesTableCell">{messages?.client_with_bank_refusal}</TableCell>
                    <TableCell className="basesTableCell">{messages?.guest_telephone}</TableCell>
                    <TableCell className="basesTableCell">{messages?.left_not_admitted}</TableCell>
                    <TableCell className="basesTableCell">{messages?.reason}</TableCell>
                    <TableCell className="basesTableCell">{messages?.sms}</TableCell>
                    <TableCell className="basesTableCell">{messages?.notes}</TableCell>
                    <TableCell className="basesTableCell">{messages?.presentation_number}</TableCell>
                    <TableCell className="basesTableCell">{messages?.location}</TableCell>
                    <TableCell className="basesTableCell">{messages?.time}</TableCell>
                    <TableCell className="basesTableCell">{messages?.address}</TableCell>
                    <TableCell className="basesTableCell">{messages?.team}</TableCell>
                    <TableCell className="basesTableCell">{messages?.who_called}</TableCell>
                    <TableCell className="basesTableCell" style={{ width: "auto " }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>{messages?.delete}</div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!currentlists[0] ? (
                    currentlists
                      // ?.sort((a, b) => a.id - b.id)
                      //.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                      ?.map((list) => <ShowListsRow key={list.id} item={list} messages={messages} updateList={updateList} deleteLists={deleteLists} changeDeleteLists={changeDeleteLists} />)
                  ) : (
                    <TableRow>
                      <TableCell colSpan={100}>
                        <Typography variant="h4" component="h1">
                          {messages.not_found}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <Spinner animation="border" role="status" style={{ height: "200px", width: "200px" }}></Spinner>
            </div>
          )}

          <PaginationBlock
            count={count}
            page={page}
            setPage={setPage}
            setItemsPerPage={setItemsPerPage}
            itemsPerPageForInput={itemsPerPageForInput}
            setItemsPerPageForInput={setItemsPerPageForInput}
            messages={messages}
            zoom={zoom}
            changeZoom={changeZoom}
          />
        </div>
      </div>
    </OtherStyle>
  );
}

export default ShowLists;

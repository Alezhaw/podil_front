import { useEffect, useState } from "react";
import { Container, Box, IconButton, Checkbox, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Departure from "../../../../api/trails/departure";
import DepartureDate from "../../../../api/trails/departureDate";
import CreateDeparture from "../CreateDeparture";
import { customAlert } from "../../../../components/Alert/AlertFunction";
import { getValueById } from "../../../../components/functions";
import { getFormatDate } from "../../../../utils/utils";

function DepartureItem({ country, item, sort, allDepartureDate, messages, getDeparture, filterDate, allDictionary }) {
  const [dates, setDates] = useState([]);
  const [deleteDates, setDeleteDates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [updatedDeparture, setUpdatedDeparture] = useState({});

  const replaceDots = (date) => String(date)?.replaceAll("-", ".");

  async function updateDeparture({ newDeparture, setNewDeparture, setIsOpen }) {
    const departure = newDeparture;
    if (!departure.dateTo || !departure.dateFrom) {
      return customAlert({ message: messages.update_error, severity: "success" });
    }
    const checkDates = departure.dates ? departure.dates[0] : false;
    if (!checkDates) {
      return customAlert({ message: messages.dates_error, severity: "success" });
    }
    const result = await Departure.update(departure, country);
    if (result && !result?.message) {
      await getDeparture(filterDate);
      customAlert({ message: "Success", severity: "success" });
      setNewDeparture({});
      setIsOpen(false);
    } else {
      await getDeparture(filterDate);
      return customAlert({ message: result.message });
    }
  }

  async function deleteDeparture(e) {
    const { value } = e.target;
    let checkConfirm = window.confirm(messages?.are_you_sure);
    if (checkConfirm) {
      try {
        const result = await Departure.remove(Number(value), country);
        if (result) {
          await getDeparture(filterDate);
          customAlert({ message: "Success", severity: "success" });
        } else {
          customAlert({ message: "Something went wrong" });
        }
      } catch (e) {
        customAlert({ message: "Something went wrong" });
      }
    } else {
      return;
    }
  }

  async function deleteDate() {
    try {
      if (!deleteDates[0]) {
        return customAlert({ message: "Not date for delete" });
      }
      const result = await Promise.all(deleteDates?.map(async (id) => await DepartureDate.remove(Number(id), country)));
      if (result ? result[0] : null) {
        setDeleteDates([]);
        await getDeparture(filterDate);
        customAlert({ message: "Success", severity: "success" });
      } else {
        customAlert({ message: "Something went wrong" });
      }
    } catch (e) {
      customAlert({ message: "Something went wrong" });
    }
  }

  function changeDeleteDates(e) {
    const { value, checked } = e.target;
    if (checked) {
      setDeleteDates((prev) => [...prev, value]);
    } else {
      setDeleteDates((prev) => prev.filter((item) => item !== value));
    }
  }

  useEffect(() => {
    setDates(
      allDepartureDate
        .filter((date) => item.id === date.departure_id)
        .sort((a, b) => {
          a = new Date(a.data);
          b = new Date(b.data);

          return sort ? b - a : a - b;
        })
    );
    // eslint-disable-next-line
  }, [allDepartureDate, sort]);

  useEffect(() => {
    setUpdatedDeparture({ ...item, dateFrom: item.range[0], dateTo: item.range[1] });
    //setUpdatedDeparture(item);
    // eslint-disable-next-line
  }, [item]);

  return (
    <Container style={{ textAlign: "center", paddingBottom: "10px" }}>
      {isOpen ? (
        <CreateDeparture
          setIsOpen={setIsOpen}
          messages={messages}
          newDeparture={updatedDeparture}
          setNewDeparture={setUpdatedDeparture}
          weekDays={messages.days_of_the_week}
          createDeparture={updateDeparture}
          replaceDots={replaceDots}
          forEdit={true}
        />
      ) : null}
      <Typography variant="h5" component="h2" style={{ paddingBottom: "1rem" }}>
        <div>
          {getFormatDate(replaceDots(item?.range[sort ? 1 : 0]))} - {getFormatDate(replaceDots(item?.range[sort ? 0 : 1]))}{" "}
          <IconButton onClick={() => setIsOpen(true)}>
            <EditIcon style={{ margin: "0px 5px" }} />
          </IconButton>
          <Button style={{ fontWeight: 600 }} value={item.id} onClick={deleteDeparture}>
            {messages.delete}
          </Button>
        </div>{" "}
        <div>
          {item?.route_number} / {getValueById(item.company_id, "name", allDictionary?.regiments)}
        </div>
      </Typography>
      <Box style={{ position: "relative" }}>
        {dates?.map((date) => (
          <Typography variant="body1" component="h2" style={{ padding: "5px" }} key={date.id}>
            {getFormatDate(replaceDots(date.data))}
            <Checkbox color="primary" value={date.id} onChange={changeDeleteDates} />
          </Typography>
        ))}
      </Box>
      {dates?.length ? (
        <Button variant="outlined" onClick={deleteDate}>
          {messages.delete_dates}
        </Button>
      ) : null}
    </Container>
  );
}

export default DepartureItem;

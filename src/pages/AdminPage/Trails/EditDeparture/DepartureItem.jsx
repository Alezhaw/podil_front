import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Checkbox, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Departure from "../../../../api/trails/departure";
import DepartureDate from "../../../../api/trails/departureDate";
import CreateDeparture from "../../components/CreateDeparture";

function DepartureItem({ country, item, sort, allDepartureDate, messages, getDeparture }) {
  const [dates, setDates] = useState([]);
  const [deleteDates, setDeleteDates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [updatedDeparture, setUpdatedDeparture] = useState({});

  const replaceDots = (date) => String(date)?.replaceAll("-", ".");

  async function updateDeparture({ newDeparture, setNewDeparture, setIsOpen }) {
    const departure = newDeparture;
    if (!departure.dateTo || !departure.dateFrom) {
      return alert(messages.update_error);
    }
    const checkDates = departure.dates ? departure.dates[0] : false;
    if (!checkDates) {
      return alert(messages.dates_error);
    }
    const result = await Departure.update(departure, country);
    if (result && !result?.message) {
      await getDeparture();
      alert("Sucess");
      setNewDeparture({});
      setIsOpen(false);
    } else {
      await getDeparture();
      alert(result.message);
    }
  }

  async function deleteDeparture(e) {
    const { value } = e.target;
    let checkConfirm = window.confirm(messages?.are_you_sure);
    if (checkConfirm) {
      try {
        const result = await Departure.remove(Number(value), country);
        if (result) {
          await getDeparture();
          alert("Sucess");
        } else {
          alert("Something went wrong");
        }
      } catch (e) {
        alert("Something went wrong");
      }
    } else {
      return;
    }
  }

  async function deleteDate() {
    try {
      if (!deleteDates[0]) {
        return alert("Not date for delete");
      }
      const result = await Promise.all(deleteDates?.map(async (id) => await DepartureDate.remove(Number(id), country)));
      if (result ? result[0] : null) {
        setDeleteDates([]);
        await getDeparture();
        alert("Success");
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      alert("Something went wrong");
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
    setUpdatedDeparture({ ...item, dateFrom: item.range[0] });
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
        />
      ) : null}
      <Typography variant="h5" component="h2" style={{ paddingBottom: "20px" }}>
        {replaceDots(item?.range[sort ? 1 : 0])} - {replaceDots(item?.range[sort ? 0 : 1])}{" "}
        <IconButton onClick={() => setIsOpen(true)}>
          <EditIcon style={{ color: "white", margin: "0px 5px" }} />
        </IconButton>
        <Button style={{ color: "white", fontWeight: 600 }} value={item.id} onClick={deleteDeparture}>
          {messages.delete}
        </Button>
      </Typography>
      <Box style={{ position: "relative" }}>
        {dates?.map((date) => (
          <Typography variant="body1" component="h2" style={{ padding: "5px" }} key={date.id}>
            {replaceDots(date.data)}
            <Checkbox color="default" value={date.id} onChange={changeDeleteDates} style={{ color: "white" }} />
          </Typography>
        ))}
      </Box>
      {dates?.length ? (
        <Button style={{ color: "white" }} onClick={deleteDate}>
          {messages.delete_dates}
        </Button>
      ) : null}
    </Container>
  );
}

export default DepartureItem;

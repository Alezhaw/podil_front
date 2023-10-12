import { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function DepartureItem({ item, sort, allDepartureDate, messages }) {
  const [dates, setDates] = useState([]);

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
  return (
    <Container style={{ textAlign: "center", paddingBottom: "10px" }}>
      <Typography variant="h5" component="h2" style={{ paddingBottom: "20px" }}>
        {item?.range[sort ? 1 : 0]} - {item?.range[sort ? 0 : 1]} <Button style={{ color: "white", fontWeight: 600 }}>{messages.delete}</Button>
      </Typography>
      <Box style={{ position: "relative" }}>
        {dates?.map((date) => (
          <Typography variant="body1" component="h2" style={{ padding: "5px" }} key={date.id}>
            {date.data} <CloseIcon style={{ marginLeft: "20px", cursor: "pointer" }} />
          </Typography>
        ))}
      </Box>
    </Container>
  );
}

export default DepartureItem;

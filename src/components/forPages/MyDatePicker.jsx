import React, { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useAppSelector } from "../../store/reduxHooks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "dayjs/locale/ru";
import "dayjs/locale/en";
import "dayjs/locale/pl";
//dayjs.extend(customParseFormat);

const MyDatePicker = (data) => {
  const { selectedLang } = useAppSelector((store) => store.user);
  useEffect(() => {
    dayjs.locale(selectedLang);
  }, [selectedLang]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={{ options: { weekStartsOn: 1 } }}>
      <DatePicker
        {...data}
        format="DD.MM.YYYY"
        dayOfWeekFormatter={(day) => `${day}`}
        slotProps={{
          textField: { size: "small" },
          actionBar: {
            actions: ["clear"],
          },
        }}
      />
    </LocalizationProvider>

  );
};

export default MyDatePicker;

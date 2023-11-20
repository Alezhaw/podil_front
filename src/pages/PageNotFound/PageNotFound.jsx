import React from "react";
import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useMemo } from "react";
import { useAppSelector } from "../../store/reduxHooks";

export default function PageNotFound() {
  const { locale } = useAppSelector((store) => store.user);
  const primary = purple[500];

  const messages = useMemo(() => {
    return {
      text: locale["text_404"],
    };
  }, [locale]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        {messages.text}
      </Typography>
    </Box>
  );
}

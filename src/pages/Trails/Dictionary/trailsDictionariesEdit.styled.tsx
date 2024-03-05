import styled from "styled-components";
import { useTheme } from "@mui/material";

export const TrailsDictionariesEditTable = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(17, 17, 18, 0.95);
  display: flex;
  justify-content: center;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  flex-direction: column;
  z-index: 1;
`;

export const ContainerForEditMenu = styled.div(() => {
  const theme = useTheme();
  // console.log("theme", theme);
  return `
  overflow: auto;
  display: flex;
  gap: 1rem;
  margin: 1rem;
  color: white;
  backdrop-filter: blur(5.5px);
  padding: 2.5rem 1rem 1rem;
  border: 0.5px solid rgba(90, 89, 89, 0.75);
  flex-direction: column;
  background: ${theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d"}; 
`;
});

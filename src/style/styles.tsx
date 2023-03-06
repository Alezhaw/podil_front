import { styled } from "@mui/material/styles";

export const StyledInput = styled("input")`
  &::-webkit-search-cancel-button {
    -webkit-filter: grayscale(100%);
    filter: brightness(0) invert(1);
    padding-right: 5px;
  }
`;

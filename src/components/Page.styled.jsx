import styled from "styled-components";
import { useTheme } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export const PageContainer = styled.div(() => {
  const theme = useTheme();
  // console.log("theme", theme);
  return `
  // background: linear-gradient(122deg, #48788d, #83a8c7, #80bcce, #75b9e0); #F3F1F2 #1b1b1d
   background: ${theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d"}; 
  min-height: calc(100vh - 60px);
  padding: 1rem;
  position: relative;
  color: ${theme.palette.text.primary};

  .noBorder {
    border: 0;
  }

  .background {
    background: ${theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d"}; 
  }

  .scroll::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

  .scroll::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #cccccc;
  }

  .sizeForBases {
    min-width: 0;
  }

  .selectInputNoWrap {
    .css-17idfle-MuiSelect-select-MuiInputBase-input-MuiInput-input.MuiSelect-select {
      white-space: unset;
    }
  }

  .basePadding {
    padding: 6px;
    input {
      padding: 8px 10px;
    }
  }

  .baseWidth {
    width: -webkit-fill-available;
  }

  .inputBaseID {
    max-width: 400px;
    max-height: 350px;
  }

  .checkboxOnWhiteBackground {
    .MuiSvgIcon-root  { 
      font-size: 28px; 
      color: rgba(0, 0, 0, 0.4);
    }
  }

  .modalStyles {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(17, 17, 18, 0.65);
    display: flex;
    justify-content: center;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    flex-direction: column;
    z-index: 2;
  }

  .textArea {
    resize: none;
    text-align: center;
    border: none;

  }
  .tableHeader {
    background: ${theme.palette.mode === "light" ? "#DBDEE1" : "#242526"}; 
    color: ${theme.palette.text.primary};
  }

  .leaflet-routing-container {
    background: rgba(0,0,0,.7);
    .leaflet-routing-alt {
      table {
        display: none;
      }
    }
  }

  .createBlock {
    background: ${theme.palette.mode === "light" ? "#DBDEE1" : "#242526"};
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 15px 20px;
  }

  .createColumn {
    display: flex;
    flex-direction: column !important;
    align-items: center;
  }

  .createContainer {
    background: ${theme.palette.mode === "light" ? "#DBDEE1" : "#242526"};
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .createTitle {
    width: 165px;
    text-align: left;
    display: flex;
    align-items: center;
  }

  .createSelect {
    width: 600px;
    text-align: left;
  }

  .disableBlackColor {
    input {
      -webkit-text-fill-color: ${theme.palette.text.primary};
    }
  }

  .disablePrimaryColor {
    .Mui-disabled {
      color: gray;
      border: 1px solid gray;
    }
    
  }

  .modalContentStyles {
    border: 1px solid ${theme.palette.text.primary};
    padding: 2rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .secondaryBack {
    background: ${theme.palette.info.main}
  }

  .black {
    .MuiInputBase-root {
      color: black;
    }

    .MuiFormLabel-root {
      color: black;
    }

    .MuiInputBase-root::before {
      border-bottom: 1px solid black;
    }

    .MuiSvgIcon-root {
      color: black;
    }

    .Mui-disabled {
      -webkit-text-fill-color: gray;
    }
  }

  .bases {
    background: ${theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d"}; 
  }

  .vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .centerTable {
    thead {
    tr {
      th {
        text-align: center;
        }
      } 
    }
    tbody {
      tr {
        th {
          text-align: center;
          }
        td {
          text-align: center;
          }
        } 
        }
    }

  .colorTable {
    tbody {
      background: ${theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d"}; 
      td {
        color: ${theme.palette.text.primary};
      }
    }

    .tableInput {
      color: ${theme.palette.text.primary};
      font-size: 1rem;
      font-size: Max(1rem, 1em);
      font-family: inherit;
      padding: 0.25em 0.5em;
      background-color: unset;
      border: 2px solid var(--input-border);
      border-radius: 4px;
      transition: 180ms box-shadow ease-in-out;
      width: 7.5rem;
    }

    .tableInput[disabled] {
      color: ${theme.palette.text.primary};
      background-color: unset;
    }
    
  }

  .autoWidth {
      width: auto !important;
  }

  .pointer {
    cursor: pointer
  }

  .paginationButtons {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    position: absolute;
    bottom: 96px;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .paginationButtonsWithoutPosition {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .paginationCount {
    position: absolute;
    right: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    bottom: 40px;
  }
  
  .paginationCountWithoutPosition {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .containerForTable {
  width: 100%;
  margin-top: 24px;



  .table-wrapper {
    min-height: 300px;
    color: text.primary;
    // overflow: auto;
    // padding-right: 12px;

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: #e4e6ef;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #cccccc;
    }

    scrollbar-width: 6px;
    scrollbar-height: 6px;
    scrollbar-color: #cccccc #e4e6ef;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 1200px;
  }

  thead {
    height: 50px;
    td {
      padding: 12px;
      font-family: "Verdana";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      // color: #0d0d0e;
    }

    tr {
      // position: sticky;
      // top: 0;
      z-index: 2;
      // background-color: #f2f3f4;
    }
  }

  .product-img {
    max-width: 160px;
    max-height: 150px;
    object-fit: contain;
  }

  tbody {
     
    td {
      max-width: 80px;
      padding: 12px;
      font-family: "Verdana";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #0d0d0e;
    }
  }

  .col-padding {
    padding: 7.5px 0;
  }

  .row-borders {
    border: 1px solid #cdcdcd;
  }

  .footer-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 24px;
  }

  .button-styled {
    width: 130px;
    padding: 6px 0;
  }

  .check-col:first-child {
    min-width: 30px;
    max-width: 30px;
  }

  .rekodow-col {
    min-width: 78.4px;
    max-width: 78.4px;
  }

  .checkbox-col {
    min-width: 85px;
    max-width: 85px;
  }

  .coming-col {
    min-width: 86px;
    max-width: 86px;
  }

  .Ilość-col {
    min-width: 87px;
    max-width: 87px;
  }

  .weryfikacja-col {
    min-width: 94px;
    max-width: 94px;
  }

  .podpinanie-col {
    min-width: 96px;
    max-width: 96px;
  }

  .scenario-col {
    min-width: 97.5px;
    max-width: 97.5px;
  }

  .limit-col {
    min-width: 100.8px;
    max-width: 100.8px;
  }

  .dzien-col {
    min-width: 130px;
    max-width: 130px;
  }

  .dodawanie-col {
    min-width: 140px;
    max-width: 140px;
  }

  .coming-check-col {
    background: #f2ffac;
  }

  .project-check-col {
    background: lightgreen;
  }

  .miasto-col {
    min-width: 250px;
    max-width: 250px;
  }

  .timezone-col {
    min-width: 78px;
    max-width: 78px;
  }

  .name-col {
    min-width: 100px;
    max-width: 100px;
  }

  .name-col {
    word-break: break-word;
  }

  .type-col {
    min-width: 70px;
    max-width: 70px;
  }

  .status-col {
    min-width: 70px;
    max-width: 70px;
  }

  .not-bold {
    font-weight: 400;
  }

  .details-col {
    min-width: 80px;
    max-width: 80px;
    cursor: pointer;

    div {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 4px;
    }
  }

  .default-col:first-child {
    min-width: 70.8px;
    max-width: 70.8px;
    height: 48px;
  }

  .icon-col {
    cursor: pointer;
  }

  .clickable {
    cursor: pointer;
  }

  .differences-col {
    background: rgba(177, 177, 177, 0.3);
    height: 48px;
    font-weight: 600;
  }

  .MuiSelect-select {
  }

  .paging {
    width: 100%;
    overflow: auto;
  }
}`;
});

export const OtherStyle = styled.div(() => {
  const theme = useTheme();
  return `
  .close {
    background: ${theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d"};
    position: absolute;
    top: 1rem;
    right: 4rem;
    z-index: 402;
  }

  .close:hover {
    background: ${theme.palette.mode === "light" ? "#DBDEE1" : "#242526"}; 
    box-shadow: none;
  }

  .resize {
    min-width: calc(600px - 1rem - 60px);
    max-width: 80vw;
    min-height: 500px;
    max-height: 100vh;
    overflow: auto;
    resize: both;
  }

  .scroll::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

  .scroll::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #cccccc;
  }

  .editForm {
  background: ${theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d"}; 
  color: ${theme.palette.text.primary};
  position: absolute;
  z-index: 401;
  padding: 2.5rem 1rem 2rem 60px;
  border: 1px solid black;

  .createContainer {
    background: ${theme.palette.mode === "light" ? "#DBDEE1" : "#242526"};
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .createBlock {
    background: ${theme.palette.mode === "light" ? "#DBDEE1" : "#242526"};
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 15px 20px;
  }

  .createTitle {
    min-width: 165px;
    text-align: left;
    display: flex;
    align-items: center;
  }

  .createSelect {
    width: 100%;
    text-align: left;
  }

  .close {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .edit {
    position: absolute;
    right: 2.5rem;
    top: 0px;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 1rem;
    overflow: auto;
  }

  .spaceBetween {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
  }

  .tableWithoutTdMaxWidth {
    td {
      max-width: none;
    }
  }
  `;
});

export const CustomTooltipMUI = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    fontSize: "16px",
    background: "rgba(0, 0, 0, .9)",
  },
});

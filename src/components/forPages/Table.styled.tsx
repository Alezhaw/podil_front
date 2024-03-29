import styled from "styled-components";

export const ContainerForTable = styled.div`
  width: 100%;
  margin-top: 24px;
  color: white;
  min-height: calc(100vh - 60px - 1rem - 58px - 36.5px - 48px);
  max-height: calc(100vh - 60px - 1rem - 58px - 36.5px - 48px);

  .table-wrapper {
    min-height: 300px;
    color: black;
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
      color: #0d0d0e;
    }

    tr {
      // position: sticky;
      // top: 0;
      z-index: 2;
      background-color: #f2f3f4;
    }
  }

  .product-img {
    max-width: 160px;
    max-height: 150px;
    object-fit: contain;
  }

  tbody {
    background-color: white;
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
`;

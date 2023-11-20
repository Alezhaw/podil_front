import { TextField, Pagination } from "@mui/material";

function PaginationBlock({ count, page, setPage, setItemsPerPage, itemsPerPageForInput, setItemsPerPageForInput, messages }) {
  return (
    <>
      <Pagination className="paginationButtonsWithoutPosition" color="primary" count={count} onChange={(e, value) => setPage(Number(value) - 1)} page={Number(page + 1)} />

      <div className="paginationCountWithoutPosition">
        <TextField
          id="outlined-number"
          label={messages.items_per_page}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setItemsPerPageForInput(Number(e.target.value))}
          onBlur={(e) => setItemsPerPage(Number(e.target.value))}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setPage(0);
              setItemsPerPage(Number(e.target.value));
            }
          }}
          value={itemsPerPageForInput}
          sx={{ m: 1, width: "170px" }}
          size="small"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
        />
      </div>
    </>
  );
}

export default PaginationBlock;

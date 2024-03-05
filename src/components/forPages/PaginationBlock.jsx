import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { TextField, Pagination, Stack, Slider, Box } from "@mui/material";

function PaginationBlock({ count, page, setPage, setItemsPerPage, itemsPerPageForInput, setItemsPerPageForInput, messages, zoom, changeZoom, noZoom }) {
  return (
    <>
      <Pagination className="paginationButtonsWithoutPosition" color="primary" count={count} onChange={(e, value) => setPage(Number(value) - 1)} page={Number(page + 1)} />

      <div className="paginationCountWithoutPosition">
        <div>
          {noZoom ? null : (
            <Box sx={{ margin: "0 8px" }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <ZoomOutIcon />
                <Slider aria-label="Volume" value={zoom} onChange={changeZoom} step={0.1} min={0.4} max={1.5} />
                <ZoomInIcon />
              </Stack>
            </Box>
          )}
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
      </div>
    </>
  );
}

export default PaginationBlock;

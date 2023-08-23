import { MenuItem } from "@mui/material";

function MenuItemForPanel({ el, title, index, countries, visibleItem, setPage, setAnchorEl }) {
  return (
    <MenuItem
      onClick={() => {
        visibleItem(el);
        setPage(` ${title} ${countries[index]} `);
        setAnchorEl(null);
      }}
    >
      {countries[index]}
    </MenuItem>
  );
}

export default MenuItemForPanel;

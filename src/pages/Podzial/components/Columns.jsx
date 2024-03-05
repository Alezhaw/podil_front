import { useState } from "react";
import { Checkbox, Button, Menu, MenuList, MenuItem } from "@mui/material";

function Columns({ messages, filterColumns, setFilterColumns, selectedLang }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button variant="outlined" id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
        {messages.columns}
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          {filterColumns.map((el, index) => (
            <MenuItem
              id={el.column}
              key={index}
              onClick={(e) => {
                let updatedFilterColumns = [];
                setFilterColumns((prev) => {
                  const newColumns = prev.map((fc) => {
                    if (fc.column === e.target.id) {
                      return { ...fc, value: !fc.value };
                    }
                    return fc;
                  });
                  updatedFilterColumns = newColumns;
                  console.log(3, newColumns);
                  return newColumns;
                });
                localStorage.setItem(`filterColumns ${selectedLang}`, JSON.stringify(updatedFilterColumns));
              }}
            >
              <Checkbox checked={el.value} id={el.column} />
              {el.column}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default Columns;

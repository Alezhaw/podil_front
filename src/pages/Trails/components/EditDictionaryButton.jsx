import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import TrailsDictionatiesEdit from "../Dictionary/TrailsDictionatiesEdit";

function EditDictionaryButton({ isOpen, setIsOpen, name, country, item }) {
  return (
    <>
      <IconButton onClick={() => setIsOpen(name)}>
        <AddIcon />
      </IconButton>
      {isOpen === name && <TrailsDictionatiesEdit country={country} setIsOpen={setIsOpen} item={item} />}
    </>
  );
}

export default EditDictionaryButton;

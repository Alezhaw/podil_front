import CloseIcon from "@mui/icons-material/Close";

function CreateTemplate({ setIsOpen }) {
  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", width: "59%", flexDirection: "row-reverse", color: "white" }}>
        <CloseIcon style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)}></CloseIcon>
      </div>
    </div>
  );
}

export default CreateTemplate;

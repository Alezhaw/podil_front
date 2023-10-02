import { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "../../../store/reduxHooks";
import AllTrailsDictionaryID from "../Trails/AllTrailsDictionaryID";

function EditTrailsDictionaryTable({ message }) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useAppSelector((store) => store.user);

  const messages = useMemo(() => {
    return {
      edit_trails_dictionary: locale["admin_panel_edit_trails_dictionary"],
    };
  }, [locale]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", margin: "20px" }}>
        {message}
        <div onClick={() => setIsOpen(true)} style={{ maxWidth: "205px !important", margin: "10px" }} className="tabl-flex-admin-button-global2">
          {messages.edit_trails_dictionary}
        </div>
      </div>
      {isOpen ? <AllTrailsDictionaryID setIsOpen={setIsOpen} /> : ""}
    </>
  );
}
export default EditTrailsDictionaryTable;

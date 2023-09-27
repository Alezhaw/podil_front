import EditTrailsDictionary from "../components/EditTrailsDictionary";
import { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "../../../store/reduxHooks";

function AllTrailsDictionary({ country }) {
  const { locale } = useAppSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);

  const messages = useMemo(() => {
    return {
      edit_trails_dictionary: locale["admin_panel_edit_trails_dictionary"],
    };
  }, [locale]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "40px" }}>
        <div onClick={() => setIsOpen(true)} style={{ maxWidth: "205px !important" }} className="tabl-flex-admin-button-global2">
          {messages.edit_trails_dictionary}
        </div>
      </div>
      {isOpen ? <EditTrailsDictionary /> : ""}
    </>
  );
}

export default AllTrailsDictionary;

import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../../../store/reduxHooks";

import CloseIcon from "@mui/icons-material/Close";

function AllTrailsDictionaryID({ country, setIsOpen }) {
  const { locale } = useAppSelector((store) => store.user);
  const { trails } = useAppSelector((store) => store.trails);

  console.log(trails);

  const messages = useMemo(() => {
    return {};
  }, [locale]);

  return (
    <>
      <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
        <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", width: "59%", flexDirection: "row-reverse" }}>
          <CloseIcon style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)}></CloseIcon>
        </div>
      </div>
    </>
  );
}

export default AllTrailsDictionaryID;

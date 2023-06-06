import { useState } from "react";

function LogsBasesTableRow({ item, getCorrectTime }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="clickable" key={item.id} onClick={() => setOpen((prev) => !prev)}>
        <th className="default-col not-bold">{item.base_id}</th>
        <th className="default-col not-bold">{item.id_base}</th>
        <th className="default-col not-bold">{item.country}</th>
        <th className="default-col not-bold">{item.action}</th>
        <th className="default-col not-bold">{item.differencesLength}</th>
        {/* <th className="miasto-col not-bold">{item.miasto_lokal}</th> */}
        <th className="default-col not-bold">{getCorrectTime(item)}</th>
        <th className="default-col not-bold">{item.user_email}</th>
      </tr>

      {open
        ? item.differences?.map((el, index) => (
            <tr key={`${index} ${item.id}`}>
              <th className="not-bold differences-col" colSpan="7">
                {el[0]}: {el[1]} {"=>"} {el[2]}
              </th>
            </tr>
          ))
        : null}
    </>
  );
}

export default LogsBasesTableRow;

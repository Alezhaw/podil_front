import { useState } from "react";

function LogsCitiesTableRow({ items, getCorrectTime }) {
  const [open, setOpen] = useState(false);
  const generalItem = items[0];

  return (
    <>
      <tr className="clickable" key={generalItem.id} onClick={() => setOpen((prev) => !prev)}>
        <th className="default-col not-bold">{generalItem.id}</th>
        <th className="default-col not-bold">{generalItem.id_for_base}</th>
        <th className="default-col not-bold">{generalItem.country}</th>
        <th className="default-col not-bold">{generalItem.action}</th>
        <th className="default-col not-bold">{generalItem.differencesLength}</th>
        <th className="miasto-col not-bold">{generalItem.miasto_lokal}</th>
        <th className="default-col not-bold">{getCorrectTime(generalItem)}</th>
        <th className="default-col not-bold">{generalItem.user_email}</th>
      </tr>

      {open
        ? items
            ?.sort((a, b) => Number(a?.godzina?.split(":")[0]) - Number(b?.godzina?.split(":")[0]))
            ?.map((item) =>
              item.differences?.map((el, index) => (
                <tr key={`${index} ${generalItem.id}`}>
                  <th className="not-bold differences-col" colSpan="8">
                    {item.godzina && `время: ${item.godzina} | `} {el[0]}: {el[1]} {"=>"} {el[2]}
                  </th>
                </tr>
              ))
            )
        : null}
    </>
  );
}

export default LogsCitiesTableRow;

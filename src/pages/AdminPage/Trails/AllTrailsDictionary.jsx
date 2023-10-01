import { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "../../../store/reduxHooks";
import EditTrailsDictionaryTable from "../components/EditTrailsDictionaryTable";

function AllTrailsDictionary({ country }) {
  const { locale } = useAppSelector((store) => store.user);

  const messages = useMemo(() => {
    return {
      trails_call_template: locale["admin_panel_trails_call_template"],
      trails_cities_with_reg: locale["admin_panel_trails_cities_with_reg"],
      trails_contact_status: locale["admin_panel_trails_contact_status"],
      trails_form: locale["admin_panel_trails_form"],
      trails_planning_person: locale["admin_panel_trails_planning_person"],
      trails_presentation_time: locale["admin_panel_trails_presentation_time"],
      trails_project_concent: locale["admin_panel_trails_project_concent"],
      trails_project_sales: locale["admin_panel_trails_project_sales"],
      trails_regiment: locale["admin_panel_trails_regiment"],
      trails_region: locale["admin_panel_trails_region"],
      trails_reservation_status: locale["admin_panel_trails_reservation_status"],
      trails_dictionary: locale["admin_panel_trails_dictionary"],
    };
  }, [locale]);

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1000 }}>
        <div>
          {" "}
          <table>
            <thead style={{ background: "#5a5959" }}>
              <tr style={{ background: "none" }}>
                <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  RELEVANCE DICTIONARIES
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(messages).map((key) => (
                <EditTrailsDictionaryTable key={key} message={messages[key]} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllTrailsDictionary;

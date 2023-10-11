import { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "../../../store/reduxHooks";
import { useDispatch } from "react-redux";
import Trail from "../../../api/trails/trails";
import { reducerTrailsTypes } from "../../../store/Users/trails/trailsTypes";
import TrailsDictionatiesEdit from "../components/TrailsDictionatiesEdit";
import CallTemplate from "../../../api/trails/callTemplate";
import ContactStatus from "../../../api/trails/contactStatus";
import PlanningPeople from "../../../api/trails/planningPerson";
import PresentationTime from "../../../api/trails/presentationTime";
import ProjectConcent from "../../../api/trails/projectConcent";
import ProjectSales from "../../../api/trails/projectSales";
import Regiment from "../../../api/trails/regiment";
import Region from "../../../api/trails/region";

function AllTrailsDictionary({ country }) {
  const dispatch = useDispatch();
  const { locale } = useAppSelector((store) => store.user);
  const { allDictionary } = useAppSelector((store) => store.trails);
  const [isOpen, setIsOpen] = useState(null);
  const [dictionary, setDictionary] = useState([]);

  const messages = useMemo(() => {
    return {
      trails_call_template: locale["admin_panel_trails_call_template"],
      trails_cities_with_reg: locale["admin_panel_trails_cities_with_reg"],
      trails_contract_status: locale["admin_panel_trails_contact_status"],
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

  async function getAllDictionary({ country }) {
    const allDictionary = await Trail.getAllDictionary({ country });
    if (allDictionary) {
      console.log("zalupka", allDictionary);
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DICTIONARY,
        payload: { allDictionary, country },
      });
    }
  }
  useEffect(() => {
    setDictionary([
      { array: allDictionary?.callTamplates, title: messages?.trails_call_template, key: "name", update: CallTemplate.update, remove: CallTemplate.remove, create: CallTemplate.create },
      { array: allDictionary?.contractStatuses, title: messages?.trails_contract_status, key: "name", update: ContactStatus.update, remove: ContactStatus.remove, create: ContactStatus.create },
      { array: allDictionary?.planningPeople, title: messages?.trails_planning_person, key: "name", update: PlanningPeople.update, remove: PlanningPeople.remove, create: PlanningPeople.create },
      {
        array: allDictionary?.presentationTimes,
        title: messages?.trails_presentation_time,
        key: "presentation_hour",
        update: PresentationTime.update,
        remove: PresentationTime.remove,
        create: PresentationTime.create,
      },
      { array: allDictionary?.projectConcent, title: messages?.trails_project_concent, key: "name", update: ProjectConcent.update, remove: ProjectConcent.remove, create: ProjectConcent.create },
      { array: allDictionary?.projectSales, title: messages?.trails_project_sales, key: "name", update: ProjectSales.update, remove: ProjectSales.remove, create: ProjectSales.create },
      { array: allDictionary?.regiments, title: messages?.trails_regiment, key: "name", update: Regiment.update, remove: Regiment.remove, create: Regiment.create },
      { array: allDictionary?.regions, title: messages?.trails_region, key: "region", update: Region.update, remove: Region.remove, create: Region.create },
    ]);
    console.log("popka", dictionary, allDictionary?.callTamplates);
  }, [allDictionary]);

  useEffect(() => {
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

  return (
    <>
      <div style={{ alignItems: "center", marginTop: "40px", display: "flex", flexDirection: "column" }}>
        {dictionary.map((item, index) => (
          <div key={index}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "40px" }}>
              <div onClick={() => setIsOpen(index)} style={{ maxWidth: "205px !important" }} className="tabl-flex-admin-button-global2">
                {item.title}
              </div>
            </div>
            {isOpen === index ? <TrailsDictionatiesEdit country={country} setIsOpen={setIsOpen} item={item} key={index} /> : null}
          </div>
        ))}
      </div>
    </>
  );
}

export default AllTrailsDictionary;

import { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "../../../store/reduxHooks";
import { useDispatch } from "react-redux";
import Trail from "../../../api/trails/trails";
import { reducerTrailsTypes } from "../../../store/Trails/trailsTypes";
import TrailsDictionatiesEdit from "./TrailsDictionatiesEdit";
import CallTemplate from "../../../api/trails/callTemplate";
import ContactStatus from "../../../api/trails/contactStatus";
import PresentationTime from "../../../api/trails/presentationTime";
import ProjectConcent from "../../../api/trails/projectConcent";
import ProjectSales from "../../../api/trails/projectSales";
import Regiment from "../../../api/trails/regiment";
import Region from "../../../api/trails/region";
import { PageContainer } from "../../../components/Page.styled";
import { Button } from "@mui/material";

function AllTrailsDictionary() {
  const dispatch = useDispatch();
  const { locale, country } = useAppSelector((store) => store.user);
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
      trails_project_concent: locale["trails_project_concent"],
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
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DICTIONARY,
        payload: allDictionary,
      });
    }
  }
  useEffect(() => {
    setDictionary([
      {
        array: allDictionary?.callTamplates,
        title: messages?.trails_call_template,
        keyName: "callTamplates",
        key: "name",
        update: CallTemplate.update,
        remove: CallTemplate.remove,
        create: CallTemplate.create,
      },
      {
        array: allDictionary?.contractStatuses,
        title: messages?.trails_contract_status,
        keyName: "contractStatuses",
        key: "name",
        update: ContactStatus.update,
        remove: ContactStatus.remove,
        create: ContactStatus.create,
      },
      {
        array: allDictionary?.presentationTimes,
        title: messages?.trails_presentation_time,
        key: "presentation_hour",
        keyName: "presentationTimes",
        update: PresentationTime.update,
        remove: PresentationTime.remove,
        create: PresentationTime.create,
      },
      {
        array: allDictionary?.projectConcent,
        title: messages?.trails_project_concent,
        keyName: "projectConcent",
        key: "name",
        update: ProjectConcent.update,
        remove: ProjectConcent.remove,
        create: ProjectConcent.create,
      },
      {
        array: allDictionary?.projectSales,
        title: messages?.trails_project_sales,
        keyName: "projectSales",
        key: "name",
        update: ProjectSales.update,
        remove: ProjectSales.remove,
        create: ProjectSales.create,
      },
      { array: allDictionary?.regiments, title: messages?.trails_regiment, keyName: "regiments", key: "name", update: Regiment.update, remove: Regiment.remove, create: Regiment.create },
      { array: allDictionary?.regions, title: messages?.trails_region, keyName: "regions", key: "region", update: Region.update, remove: Region.remove, create: Region.create },
    ]);
  }, [allDictionary, messages]);

  useEffect(() => {
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

  return (
    <PageContainer>
      <div style={{ alignItems: "center", marginTop: "40px", display: "flex", flexDirection: "column" }}>
        {dictionary.map((item, index) => (
          <div key={index}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "40px" }}>
              <Button onClick={() => setIsOpen(index)} style={{ maxWidth: "205px !important" }}>
                {item.title}
              </Button>
            </div>
            {isOpen === index ? <TrailsDictionatiesEdit country={country} setIsOpen={setIsOpen} item={item} key={index} /> : null}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export default AllTrailsDictionary;

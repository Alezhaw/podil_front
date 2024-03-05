import * as React from "react";
import { Box, Drawer, Button } from "@mui/material";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, LayersControl, LayerGroup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { useAppSelector } from "../../../store/reduxHooks";
import Forms from "../../../api/trails/forms";
import CitiesWithRegion from "../../../api/trails/citiesWithRegion";
import EditForm from "./EditForm";
import { OtherStyle } from "../../../components/Page.styled";
import { customAlert } from "../../../components/Alert/AlertFunction";
import MapCityForm from "./MapCityForm";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map({ isOpenMap, setIsOpenMap, selectedDeparture, getDictionary }) {
  const dispatch = useDispatch();
  const { locale, country } = useAppSelector((store) => store.user);
  const { trails, departure, forms, citiesWithRegions } = useAppSelector((store) => store.trails);
  const [currentTrails, setCurrentTrails] = useState([]);
  const [currentCities, setCurrentCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [selectedForms, setSelectedForms] = useState([]);
  const mapRef = useRef();
  const [currentForm, setCurrentForm] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  const messages = useMemo(() => {
    return {
      close: locale["close"],
    };
  }, [locale]);

  async function getForms({ departureId, trails }) {
    if (!departureId) return;

    const formIds = trails
      ?.filter((item) => item.departure_id === departureId)
      ?.map((el) => el.form_id)
      ?.filter((item) => !!item);

    if (!formIds[0]) {
      setIsOpenMap(false);
      return customAlert({ message: "Institution not found" });
    }

    let data = await Forms.getByIds({ ids: formIds, country });

    if (data?.forms) {
      data.forms = data?.forms?.filter((el) => !!el.start_coord && !!el.end_coord);
      if (!!data.forms[0]) {
        setSelectedForms(data?.forms);
      } else {
        setIsOpenMap(false);
        return customAlert({ message: "Institution not found" });
      }
    } else {
      setIsOpenMap(false);
      customAlert({ message: "Something went wrong" });
    }
  }

  async function getCities({ departureId, trails, citiesWithRegions }) {
    const currentTrails = trails?.filter((el) => el?.departure_id === departureId);
    setCurrentTrails(currentTrails);
    const citiesId = currentTrails?.map((el) => el.city_id);
    const currentCities = citiesWithRegions?.filter((el) => !!citiesId?.find((city) => city === el.id));
    let cityWithoutCoord = currentCities?.filter((el) => !el?.start_coord)?.map((el) => ({ ...el, search: `${el.city_name} ${el.county}` }));
    if (cityWithoutCoord[0]) {
      const provider = new OpenStreetMapProvider();
      cityWithoutCoord = await Promise.all(cityWithoutCoord?.map(async (el) => ({ ...el, result: await provider.search({ query: el.search }) })));
      cityWithoutCoord = cityWithoutCoord?.map((el) => ({ ...el, result: el?.result[0] }));
      cityWithoutCoord = cityWithoutCoord?.map((el) => ({ ...el, start_coord: el?.result?.x, end_coord: el?.result?.y }));
      await Promise.all(cityWithoutCoord?.map((el) => CitiesWithRegion.update(el, country)));
      await getDictionary({ country, trails });
    }
    const cityWithCoord = currentCities?.filter((el) => !!el.start_coord);
    const cities = [cityWithCoord, cityWithoutCoord]?.flat();
    setCurrentCities(cities);
  }

  useEffect(() => {
    getForms({ departureId: selectedDeparture, trails });
    getCities({ departureId: selectedDeparture, trails, citiesWithRegions });
    // eslint-disable-next-line
  }, [selectedDeparture, trails]);

  return (
    <Box role="presentation">
      {!!currentCities[0] ? (
        <Drawer anchor={"top"} open={isOpenMap} onClose={() => setIsOpenMap(false)}>
          <Box style={{ position: "relative" }}>
            <OtherStyle>
              <Button className="close" variant="outlined" onClick={() => setIsOpenMap(false)}>
                {messages.close}
              </Button>
            </OtherStyle>

            {/* {currentForm?.id ? <EditForm currentForm={currentForm} setCurrentForm={setCurrentForm} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} /> : null} */}
            {currentCity?.id ? <MapCityForm currentCity={currentCity} setCurrentCity={setCurrentCity} currentTrails={currentTrails} /> : null}
            <MapContainer center={[currentCities[0].end_coord, currentCities[0].start_coord]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh" }} ref={mapRef}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LayersControl position="topright">
                <LayersControl.Overlay checked name={`Marker from departure`}>
                  <LayerGroup>
                    <MarkerClusterGroup>
                      {currentCities?.map((el) => (
                        <Marker
                          key={el.id}
                          position={[el.end_coord, el.start_coord]}
                          eventHandlers={{
                            click: (e) => {
                              //setSelectedAddress(el?.address);
                              setCurrentCity((prev) =>
                                prev.id === el.id
                                  ? {}
                                  : {
                                      ...el,
                                      // telephone: el.telephone.map((item, index) => ({ id: index, tel: item })),
                                      // cost: el.cost.map((item, index) => ({ id: index, c: item })),
                                      //room_number: el.room_number.map((item, index) => ({ id: index, r: item })),
                                      //starting_price: el.starting_price.map((item, index) => ({ id: index, c: item })),
                                    }
                              );
                            },
                          }}
                        ></Marker>
                      ))}
                    </MarkerClusterGroup>
                  </LayerGroup>
                </LayersControl.Overlay>
              </LayersControl>
            </MapContainer>
          </Box>
        </Drawer>
      ) : null}
    </Box>
  );
}
export default Map;

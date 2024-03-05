import * as React from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { reducerTrailsTypes } from "../../store/Trails/trailsTypes";
import Departure from "../../api/trails/departure";
import Trail from "../../api/trails/trails";
import CitiesWithRegion from "../../api/trails/citiesWithRegion";
import Forms from "../../api/trails/forms";
import PaginationBlock from "../../components/forPages/PaginationBlock";
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Collapse, Autocomplete } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import MyDatePicker from "../../components/forPages/MyDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PageContainer } from "../../components/Page.styled";
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle, CircleMarker, Polyline, Polygon, Rectangle, SVGOverlay, useMapEvents, LayersControl, LayerGroup, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import Cluster from "./Cluster";
import RoutineMachine from "./RoutineMachine";
import { customAlert } from "../../components/Alert/AlertFunction";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapsPage() {
  const dispatch = useDispatch();
  const { locale, country } = useAppSelector((store) => store.user);
  const { trails, departure, forms } = useAppSelector((store) => store.trails);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [clickedAddress, setClickedAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchLocations, setSearchLocations] = useState([]);
  const [searchLocation, setSearchLocation] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(5);
  const [count, setCount] = useState(1);
  const [filterDate, setFilterDate] = useState({ dateFrom: new Date() });
  const yesterday = new Date().setDate(new Date().getDate() - 1);
  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedForms, setSelectedForms] = useState([]);

  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef();

  const startCoords = L.latLng(51.505, -0.09);
  const endCoords = L.latLng(51.51, -0.1);

  const messages = useMemo(() => {
    return {
      city_search: locale["trails_city"],
      trails: locale["trails_title"],
      from: locale["from"],
      to: locale["to"],
      items_per_page: locale["items_per_page"],
      departure: locale["trails_departure"],
    };
  }, [locale]);

  const replaceDots = (date) => String(date)?.replaceAll("-", ".");

  async function setTownPoints() {
    const data = await CitiesWithRegion.getAll(country);
    let cities = data?.slice(0, 10)?.map((el) => ({ ...el, search: `${el.city_name} ${el.county}` }));
    const provider = new OpenStreetMapProvider();

    cities = await Promise.all(cities?.map(async (el) => ({ ...el, result: await provider.search({ query: el.search }) })));
    cities = cities?.map((el) => ({ ...el, result: el?.result[0] }));
    cities = cities?.map((el) => ({ ...el, start_coord: el?.result?.x, end_coord: el?.result?.y }));
    console.log("cities", cities);
    //  cities = cities?.map((el) => ({ start_coord: el?.x, end_coord: el?.y }));
    // let test = cities[0];

    // setSearchLocations(test);
    // console.log("CitiesWithRegion", test);
    // test = test?.map((el) => ({ start_coord: el?.x, end_coord: el?.y }));
    // test = test[0];
    // console.log("CitiesWithRegion", test);
    // setSearchLocation([test.end_coord, test.start_coord]);
    // mapRef.current.setView([test.end_coord, test.start_coord], 13);
  }

  async function getFilteredTrails({ search, filterDate, sortId, itemsPerPage, page, country }) {
    const data = await Departure.getFiltered({
      search,
      planningPersonIds: [],
      ...filterDate,
      sort: !sortId,
      pageSize: itemsPerPage,
      page: page + 1,
      country,
    });
    dispatch({
      type: reducerTrailsTypes.GET_TRAILS,
      payload: data?.trails || [],
    });
    dispatch({
      type: reducerTrailsTypes.GET_DEPARTURE,
      payload: data?.departure || [],
    });
    dispatch({
      type: reducerTrailsTypes.GET_DEPARTURE_DATE,
      payload: data?.departureDate || [],
    });
    if (data) {
      setCount(data.count);
    }
  }

  async function getForms({ departureId, trails }) {
    if (!departureId) return;

    const formIds = trails
      ?.filter((item) => item.departure_id === departureId)
      ?.map((el) => el.form_id)
      ?.filter((item) => !!item);

    if (!formIds[0]) return customAlert({ message: "Institution not found" });

    let data = await Forms.getByIds({ ids: formIds, country });

    if (data?.forms) {
      data.forms = data?.forms?.filter((el) => !!el.start_coord && !!el.end_coord);
      if (!!data.forms[0]) {
        setSelectedForms(data?.forms);
        const form = data.forms[0];
        mapRef.current.setView([form.end_coord, form.start_coord], 13);
      }
    } else {
      customAlert({ message: "Something went wrong" });
    }
  }

  // async function getDictionary({ country, trails }) {
  //   if (!!trails[0]) {
  //     const data = await Trail.getDictionary({ country, trails });
  //     if (data) {
  //       const dictionary = [
  //         { reducer: reducerTrailsTypes.GET_CALL_TEMPLATES, key: "callTamplates" },
  //         { reducer: reducerTrailsTypes.GET_PRESENTATION_TIMES, key: "presentationTimes" },
  //         { reducer: reducerTrailsTypes.GET_FORMS, key: "forms" },
  //         { reducer: reducerTrailsTypes.GET_CITIES_WITH_REGIONS, key: "citiesWithRegions" },
  //         { reducer: reducerTrailsTypes.GET_PLANNING_PEOPLE, key: "planningPeople" },
  //         { reducer: reducerTrailsTypes.GET_PROJECT_SALES, key: "projectSales" },
  //         { reducer: reducerTrailsTypes.GET_PROJECT_CONCENT, key: "projectConcent" },
  //         { reducer: reducerTrailsTypes.GET_REGIMENTS, key: "regiments" },
  //         { reducer: reducerTrailsTypes.GET_REGIONS, key: "regions" },
  //         { reducer: reducerTrailsTypes.GET_RESERVATION_STATUSES, key: "reservationStatuses" },
  //       ];
  //       dictionary.map((item) => {
  //         dispatch({
  //           type: item.reducer,
  //           payload: data[item.key] || [],
  //         });
  //       });
  //     }
  //   }
  //   setAllTrails(trails || []);
  // }

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    const provider = new OpenStreetMapProvider();
    if (!value) return;
    try {
      const results = await provider.search({ query: value });
      if (results) {
        setSearchLocations(results);
      }
    } catch (e) {
      console.log("map search", e);
    }
  };

  const handleOptionSelect = (event, value) => {
    console.log("value", value);
    setSelectedAddress(value);
    if (!value) return;
    setSearchLocation([value.y, value.x]);
    mapRef.current.setView([value.y, value.x], 13);
  };

  const handleMapClick = async (e) => {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: `${e.latlng.lat}, ${e.latlng.lng}` });

    if (results.length > 0) {
      setClickedAddress(results[0].label);
      setSelectedAddress(results[0]);
      console.log(results[0]);
    } else {
      setClickedAddress("Street address not found");
      console.log("Street address not found");
    }
    setClickedLocation(e.latlng);
    console.log(e);
  };

  function MapClickHandler({ onClick }) {
    const map = useMapEvents({
      click: (e) => {
        //map.locate();
        onClick(e);
      },
      locationfound: (location) => {
        console.log("location found:", location);
        map.flyTo(location.latlng, map.getZoom());
      },
    });

    return null;
  }

  const position = [52.95958, 18.83861];

  const markers = [
    {
      geocode: [52.95958, 20.83861],
      popUp: "marker 1",
    },
    {
      geocode: [52.95958, 21.009],
      popUp: "marker 2",
    },
    {
      geocode: [52.95958, 21.02],
      popUp: "marker 3",
    },
  ];
  const myIcon = new Icon({
    iconUrl: "https://img.icons8.com/ios/100/region-code.png",
    iconSize: [38, 38],
  });

  const handleClick = (e) => {
    console.log(e);
  };
  const geoJSONData = require("./geo/Bardzo_duze_150.json");

  useEffect(() => {
    if (mapLoaded) {
      const map = mapRef.current;
      if (!map) return;
      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      const drawControl = new L.Control.Draw({
        draw: {
          polyline: false,
          polygon: false,
          circle: false,
          rectangle: false,
          marker: {
            icon: myIcon,
          },
        },
        edit: {
          featureGroup: drawnItems,
        },
      });

      map.addControl(drawControl);

      map.on(L.Draw.Event.CREATED, (e) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
      });
    }
  }, [mapLoaded]);

  useEffect(() => {
    getFilteredTrails({ search, filterDate, sortId: false, itemsPerPage, page, country });
    // eslint-disable-next-line
  }, [search, filterDate, itemsPerPage, page, country]);

  // useEffect(() => {
  //   getDictionary({ trails, country });
  //   // eslint-disable-next-line
  // }, [trails]);

  useEffect(() => {
    getForms({ departureId: selectedDeparture, trails });
    // eslint-disable-next-line
  }, [selectedDeparture, trails]);

  return (
    <PageContainer>
      <div onClick={() => setTownPoints()}>123</div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Autocomplete
          size="small"
          value={selectedAddress}
          onChange={handleOptionSelect}
          filterOptions={(options) => options}
          options={searchLocations?.map((el) => ({ ...el, label: `${el.label}/${el.raw.place_id}` }))}
          isOptionEqualToValue={(option, value) => {
            return `${option.label}/${option.raw.place_id}` === `${value.label}/${value.raw.place_id}`;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // onChange={(e) => handleSearch(e)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
              onBlur={(e) => handleSearch(e)}
              label="Search for an address"
              variant="outlined"
            />
          )}
          renderOption={(props, option) => <li {...props}>{option.label}</li>}
        />
        <Box>
          <Button variant="outlined" onClick={() => setOpen((prev) => !prev)}>
            {messages.trails}
          </Button>
        </Box>

        <Box>
          <Collapse in={open}>
            <Box style={{ display: "flex", flexDirection: "column", paddingTop: ".3rem", paddingBottom: "1rem" }}>
              <Box style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                <TextField
                  size="small"
                  label={messages.city_search}
                  variant="outlined"
                  id="Search"
                  value={searchForInput}
                  onChange={(e) => setSearchForInput(e.target.value?.toLowerCase())}
                  onBlur={(e) => {
                    setPage(0);
                    setSearch(e.target.value?.toLowerCase()?.trim());
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      setPage(0);
                      setSearch(e.target.value?.toLowerCase()?.trim());
                    }
                  }}
                />

                <MyDatePicker
                  defaultValue={dayjs(yesterday)}
                  label={messages?.from}
                  onChange={(e) =>
                    setFilterDate((prev) => {
                      let date = new Date(e);
                      date.setDate(date.getDate() + 1);
                      return { ...prev, dateFrom: date };
                    })
                  }
                />
                <MyDatePicker
                  label={messages?.to}
                  onChange={(e) =>
                    setFilterDate((prev) => {
                      let date = new Date(e);
                      date.setDate(date.getDate() + 1);
                      return { ...prev, dateTo: date };
                    })
                  }
                />

                <FormControl variant="outlined" sx={{ minWidth: "200px" }} size="small">
                  <InputLabel>{messages.departure}</InputLabel>
                  <Select
                    style={{ textAlign: "center" }}
                    label={messages.departure}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedDeparture}
                    onChange={(e) => setSelectedDeparture(e.target.value)}
                  >
                    <MenuItem value={""}>None</MenuItem>
                    {departure.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {replaceDots(item.range[0])} - {replaceDots(item.range[1])}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <PaginationBlock
                count={count}
                page={page}
                setPage={setPage}
                setItemsPerPage={setItemsPerPage}
                itemsPerPageForInput={itemsPerPageForInput}
                setItemsPerPageForInput={setItemsPerPageForInput}
                messages={messages}
                noZoom
              />
            </Box>
          </Collapse>
        </Box>
      </Box>

      <MapContainer center={position} zoom={6} scrollWheelZoom={true} style={{ height: "520px" }} onClick={handleClick} ref={mapRef} whenReady={handleMapLoad}>
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <RoutineMachine waypoints={[startCoords, endCoords]} />
        {clickedLocation && (
          <Marker position={clickedLocation} icon={myIcon}>
            <Popup>
              Clicked location: {clickedLocation.lat}, {clickedLocation.lng}
            </Popup>
          </Marker>
        )}
        {searchLocation && (
          <Marker position={searchLocation} icon={myIcon}>
            <Popup>Search location</Popup>
          </Marker>
        )}
        <LayersControl position="topright">
          <LayersControl.Overlay checked name={`Marker from departure`}>
            {selectedForms?.map((el) => (
              <Marker
                key={el.id}
                position={[el.end_coord, el.start_coord]}
                eventHandlers={{
                  click: (e) => {
                    console.log("marker clicked", el, [el.end_coord, el.start_coord]);
                  },
                }}
              >
                <Popup>
                  {el.local}
                  {/* <button onClick={() => console.log(2, "test")}>123</button> */}
                </Popup>
              </Marker>
            ))}
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Marker with popup">
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                <button onClick={() => console.log(2, "test")}>123</button>
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Marker from object">
            <LayerGroup>
              {markers.map((marker, i) => (
                <Marker key={"marker_" + i} position={marker.geocode} icon={myIcon}>
                  <Popup>{marker.popUp}</Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <Cluster myIcon={myIcon} />
        </LayersControl>
        <MapClickHandler onClick={handleMapClick} />
        {/* <Search provider={new OpenStreetMapProvider()} /> */}
      </MapContainer>
    </PageContainer>
  );
}

export default MapsPage;

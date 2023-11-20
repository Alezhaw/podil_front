import * as React from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import {
  Box,
  TextField,
  Pagination,
  PaginationItem,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormGroup,
  FormControlLabel,
  Typography,
  Autocomplete,
} from "@mui/material";
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
import Search from "./Search";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapsPage() {
  const dispatch = useDispatch();
  const { locale, country } = useAppSelector((store) => store.user);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [clickedAddress, setClickedAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchLocations, setSearchLocations] = useState([]);
  const [searchLocation, setSearchLocation] = useState(null);
  const [search, setSearch] = useState("");

  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef();
  const routingControlRef = useRef();

  const startCoords = L.latLng(51.505, -0.09);
  const endCoords = L.latLng(51.51, -0.1);
  const geoList = ["Bardzo_duze_150", "Duze_50_150", "Layer_6MW_wszystkie", "Layer_07_09.11", "Layer_24_25_26.10.2023", "Mega_Wiochy", "Rozjazdowki_Ma_e_5_15", "ROZJAZDOWKI", "Srednie_15_50"];
  // useEffect(() => {
  //   const test = routingControlRef.current;
  //   console.log(1, test);
  //   if (mapLoaded) {
  //     const map = mapRef.current;
  //     console.log("mapLoaded", routingControlRef.current);
  //     console.log(map);
  //     // if (routingControlRef?.current) {
  //     //   routingControlRef?.current?.removeFrom(map);
  //     // }

  //     const routingControl = L.Routing.control({
  //       waypoints: [startCoords, endCoords],
  //       lineOptions: {
  //         styles: [
  //           {
  //             color: "blue",
  //             opacity: 0.6,
  //             weight: 4,
  //           },
  //         ],
  //       },
  //       addWaypoints: false,
  //       draggableWaypoints: true,
  //       fitSelectedRoutes: false,
  //       showAlternatives: false,
  //     }).addTo(map);

  //     console.log("routing", mapRef);
  //     routingControlRef.current = routingControl;
  //   }
  // }, [mapLoaded, startCoords, endCoords]);

  useEffect(() => {
    if (mapLoaded) {
      const map = mapRef.current;
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

  const messages = useMemo(() => {
    return {
      search: locale["search"],
      title: locale["all_cities_title"],
      canceled: locale["canceled"],
      in_progress: locale["in_progress"],
      closed: locale["closed"],
      columns: locale["columns"],
      new_presentation: locale["all_cities_new_presentation"],
      sort: locale["sort"],
      delete: locale["delete"],
      items_per_page: locale["items_per_page"],
      from: locale["from"],
      to: locale["to"],
      citiesStatus: locale["cities_status"],
    };
  }, [locale]);

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
  // function Cluster() {
  //   return geoList.map((geo, i) => (
  //     <LayersControl.Overlay name={geo} key={i}>
  //       <LayerGroup>
  //         {/* <MarkerClusterGroup>
  //             <GeoJSON data={require(`./geo/${geo}.json`)} />
  //           </MarkerClusterGroup> */}
  //         <GeoJSON
  //           data={require(`./geo/${geo}.json`)}
  //           pointToLayer={(feature, latlng) => {
  //             //console.log(geo,feature)
  //             if (geo === "Bardzo_duze_150") {
  //               return L.marker(latlng, { icon: myIcon });
  //             } else {
  //               // Use the default icon for other features
  //               return L.marker(latlng);
  //             }
  //           }}
  //         />
  //       </LayerGroup>
  //     </LayersControl.Overlay>
  //   ));
  // }
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

  return (
    <PageContainer>
      <Box sx={{ mb: "1rem" }}>
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
          <LayersControl.Overlay name="Marker with popup">
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
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

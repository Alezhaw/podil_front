import { useEffect, useState, useMemo, useRef } from "react";
import { Map, useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

const Search = (props) => {
  const map = useMap(); // access to leaflet map
  const { provider } = props;

  useEffect(() => {
    const searchControl = GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: false,
      searchLabel: "search",
    });

    map.addControl(searchControl); // this is how you add a control in vanilla leaflet
    return () => map.removeControl(searchControl);
  }, [props]);

  return null; // don't want anything to show up from this comp

  //   return GeoSearchControl({
  //     provider: provider,
  //     style: "bar",
  //     showMarker: true,
  //     showPopup: false,
  //     autoClose: true,
  //     retainZoomLevel: false,
  //     animateZoom: true,
  //     keepResult: false,
  //     searchLabel: "search",
  //   });
};

export default Search;

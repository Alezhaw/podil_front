import { MapContainer, TileLayer, useMap, Marker, Popup, Circle, CircleMarker, Polyline, Polygon, Rectangle, SVGOverlay, useMapEvents, LayersControl, LayerGroup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

function Cluster({ myIcon }) {
  const geoList = ["Bardzo_duze_150", "Duze_50_150", "Layer_6MW_wszystkie", "Layer_07_09.11", "Layer_24_25_26.10.2023", "Mega_Wiochy", "Rozjazdowki_Ma_e_5_15", "ROZJAZDOWKI", "Srednie_15_50"];
  return geoList.map((geo, i) => (
    <LayersControl.Overlay name={geo} key={i}>
      <LayerGroup>
        <MarkerClusterGroup>
          <GeoJSON
            data={require(`./geo/${geo}.json`)}
            pointToLayer={(feature, latlng) => {
              //console.log(geo,feature)
              if (geo === "Bardzo_duze_150") {
                return L.marker(latlng, { icon: myIcon });
              } else {
                // Use the default icon for other features
                return L.marker(latlng);
              }
            }}
            onEachFeature={(feature, leafletLayer) => {
              const popupOptions = {
                minWidth: 100,
                maxWidth: 250,
                className: "popup-classname",
              };
              console.log(1, feature);
              const data = feature.properties;
              leafletLayer.bindPopup(() => {
                return [data.Miasto, data.Rejonizacja].join(",");
              }, popupOptions);
            }}
          />
        </MarkerClusterGroup>
      </LayerGroup>
    </LayersControl.Overlay>
  ));
}

export default Cluster;

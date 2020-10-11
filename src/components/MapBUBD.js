import "react-leaflet-markercluster/dist/styles.min.css";
import "../css/map.css";
import { Map, TileLayer, Marker, GeoJSON } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import React, { useContext, useEffect, useRef } from "react";
import Contex from "../store/context";
import markers from "../data/bu_bd.json";

delete L.Icon.Default.prototype._getIconUrl;

const BUBDMap = () => {
  // const [tp, setTp] = useState("");
  const { globalState, globalDispach } = useContext(Contex);
  const mapRef = useRef();
  const markerRef = useRef([]);
  const handleChange = (event, value) => {
    //console.log(event, value);
    globalDispach({
      type: "BUBD",
      isOpenSidebar: true,
      markerValue: event.sourceTarget.options.extra_data,
    });
  };

  useEffect(() => {
    if (Object.keys(globalState.markerValue).length > 0) {
      let markerReference = markerRef.current[globalState.markerValue.kgis_id];

      let popupText = '<span class="popup-text">Вероятность бездоговорного потребления: </span>';
      let popupNumber = globalState.markerValue.percent_probability_BD;

      if (popupNumber === 0) {
        popupText = '<span class="popup-text">Вероятность безучетного потребления: </span>';
        popupNumber = globalState.markerValue.percent_probability_BU;
      }

      let binedPopup = markerReference.leafletElement.bindPopup(
        '<div class="popup-div">' +
          popupText +
          '<span class="popup-number"><b>' +
          popupNumber +
          '%<b></span></div>'
      );

      let latlng = L.latLng(
        globalState.markerValue.lat,
        globalState.markerValue.lon
      );
      mapRef.current.leafletElement.setView(latlng, 17);

      binedPopup.openPopup();
    }
  }, [globalState.markerValue]);

  const mapStyle = {
    height: "100%",
    position: "fixed",
  };

  return (
    <Map
      className="markercluster-map"
      style={mapStyle}
      center={position}
      zoom={16}
      ref={mapRef}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        spiderLegPolylineOptions={{
          weight: 0,
          opacity: 0,
        }}
      >
        {markers.map((item, i) => (
          <Marker
            extra_data={item}
            position={[item.lat, item.lon]}
            // key={item.kgis_id}
            ref={(reference) => (markerRef.current[item.kgis_id] = reference)}
            icon={MarkerColor(item)}
            onClick={handleChange}
          />
        ))}
        {/* <PlaceMarkers/> */}
      </MarkerClusterGroup>
    </Map>
  );
};

const position = [60.047135, 30.384553];
const createClusterCustomIcon = (cluster) => {
  return new L.divIcon({
    html: `<span  class="marker-cluster-custom-label">${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: new L.point(40, 40, true),
  });
};

const MarkerColor = (item) => {
  let color = "grey.png";
  let comparator;

  if (item.percent_probability_BU === 0) {
    comparator = item.percent_probability_BD;
  } else {
    comparator = item.percent_probability_BU;
  }

  if (parseInt(comparator) > 75) {
    color = "red.png";
  } else if (parseInt(comparator) > 50) {
    color = "orange.png";
  } else if (parseInt(comparator) > 25) {
    color = "yellow.png";
  } else {
    color = "grey.png";
  }

  return new L.Icon({
    iconUrl: require("../img/" + color),
    iconSize: [40, 40],
  });
};

export default BUBDMap;

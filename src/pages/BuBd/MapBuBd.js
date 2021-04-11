import "react-leaflet-markercluster/dist/styles.min.css";
import "assets/css/map.css";
import { Map, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import React, { useContext, useEffect, useRef, useState } from "react";
import Contex from "store/context";
import "leaflet/dist/leaflet.css";
import iconYellow from "pages/BuBd/img/yellow.png";
import iconRed from "pages/BuBd/img/red.png";
import iconGrey from "pages/BuBd/img/grey.png";
import iconOrange from "pages/BuBd/img/orange.png";
import ServicesBuBd from "pages/BuBd/api/ServicesBuBd";
delete L.Icon.Default.prototype._getIconUrl;

const BUBDMap = () => {
  const [markers, setMarkers] = useState([]);
  const { globalState, globalDispach } = useContext(Contex);
  const mapRef = useRef();
  const markerRef = useRef([]);
  const handleChange = (event, value) => {
    globalDispach({
      isOpenSidebar: true,
      markerValue: event.sourceTarget.options.extra_data
    });
  };

//Get the list of markers
  useEffect(() => {
    ServicesBuBd.getBuBd()
      .then(result => {
        setMarkers(result);
      })
      .catch(error => {});
  }, []);

  useEffect(() => {
    if (typeof globalState.markerValue !== "undefined") {
      if (Object.keys(globalState.markerValue).length > 0) {

          let latlng = L.latLng(
          globalState.markerValue.lat,
          globalState.markerValue.lon
          );

          //Zoom to the selected marker
          mapRef.current.leafletElement.setView(latlng, 17);
      }
    }
  }, [globalState.markerValue]);

  const mapStyle = {
    height: "100%",
    position: "fixed"
  };

  const TooltipStyled = ({data}) => {
    let backgroundColorClass = "popup-background";
    let label = 'БУ';
    let value = data.percent_probability_BU;

    if(data.probability_BD === 1){
      label = 'БД';
      value = data.percent_probability_BD;
    }

    if(data === globalState.markerValue){
      backgroundColorClass = "popup-background-selected";
    }

     return(
       <Tooltip permanent className={backgroundColorClass}>
       <span className="popup-text">{label}: </span>
       <span className="popup-number">{value}%</span>
     </Tooltip>
        );
  }

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
          opacity: 0
        }}
      >
        {markers.map((item, i) => (
          <Marker
            extra_data={item}
            position={[item.lat, item.lon]}
            key={i}
            ref={reference => (markerRef.current[item.fias_id] = reference)}
            icon={MarkerColor(item)}
            onClick={handleChange}
          >
            <TooltipStyled data={item}/>
          </Marker>
        ))}
        {/* <PlaceMarkers/> */}
      </MarkerClusterGroup>
    </Map>
  );
};

const position = [60.043645903621545, 30.398917555994377];
const createClusterCustomIcon = cluster => {
  return new L.divIcon({
    html: `<span  class="marker-cluster-custom-label">${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: new L.point(40, 40, true)
  });
};

const MarkerColor = item => {
  let color = iconGrey;
  let comparator;

  if (item.percent_probability_BU === 0) {
    comparator = item.percent_probability_BD;
  } else {
    comparator = item.percent_probability_BU;
  }

  if (parseInt(comparator) > 75) {
    color = iconRed;
  } else if (parseInt(comparator) > 50) {
    color = iconOrange;
  } else if (parseInt(comparator) > 25) {
    color = iconYellow;
  } else {
    color = iconGrey;
  }

  return new L.Icon({
    iconUrl: color,
    iconSize: [40, 40]
  });
};

export default BUBDMap;

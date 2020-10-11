import "react-leaflet-markercluster/dist/styles.min.css";
import "../css/map.css";
import { CircularProgress } from "@material-ui/core";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import LoadingOverlay from "react-loading-overlay";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  createRef,
} from "react";
import {
  GetBalanceGroupObj,
  GetAllObjBalanaceId,
  GetAllBuildingByFiasList,
  GetAllSubstationsByFiasList,
  GetPhantomicBuildingsObjects,
  GetSingleBuildingByFiasId,
  GetAllLinesBalanaceId,
  GetBuildingObjBalanaceId,
} from "../scripts/mapHelpers.js";
import Contex from "../store/context";
import buildingsPolygon from "../data/building_polygon.json";
import axios from "axios";
import substation_other from "../data/substation_other.json";

delete L.Icon.Default.prototype._getIconUrl;

const PhantomicBuildingstyle = {
  fillColor: "rgba(241, 158, 105, 0.4)",
  weight: 1,
  opacity: 1,
  color: "#EC8041", //Outline color
  fillOpacity: 0.7,
};

const NonPhantomicBuildingstyle = {
  fillColor: "rgba(37, 47, 74, 0.24)",
  weight: 1,
  opacity: 1,
  color: "#252F4A", //Outline color
  fillOpacity: 0.7,
};

const LineStyle = {
  // fillColor: "rgba(37, 47, 74, 0.24)",
  weight: 2,
  opacity: 1,
  color: "#EC8041", //Outline color
};

const TStyle = {
  fillColor: "rgba(37, 47, 74, 0.24)",
  weight: 1,
  opacity: 1,
  color: "#252F4A", //Outline color
  fillOpacity: 0.7,
};

const PhantomicBuilding = (fiasId, mapRef) => {
  let final_array = [];

  final_array = GetSingleBuildingByFiasId(fiasId);

  const phantomicLayerAdded = (event) => {
    let bounds = event.target.getBounds();
    mapRef.current.leafletElement.fitBounds(bounds);
  };

  const phantomicLayerRemoved = (event) => {
    console.log("phantom layer removed");
  };

  return (
    <GeoJSON
      key={fiasId}
      data={final_array}
      onAdd={phantomicLayerAdded}
      onRemove={phantomicLayerRemoved}
      style={PhantomicBuildingstyle}
    />
  );
};

const DisplayMultipleBalanceGroups = (globalState) => {
  const { globalDispach } = useContext(Contex);

  const handleTsClick = (event) => {
    let balance_group_obj = GetBalanceGroupObj(
      event.sourceTarget.feature.properties.fiasId
    );

    if (globalState.balance_index_array.length > 1) {
      globalDispach({
        type: "FILTERCOMPONENT",
        fiasId: event.sourceTarget.feature.properties.fiasId,
        isPhantomic: event.sourceTarget.feature.properties.isPhantomic,
        balance_index: balance_group_obj.balance_index,
        isClean: balance_group_obj.isClean,
        objSelected: true,
        building_address: event.sourceTarget.feature.properties.name,
        obj_from: "map_click",
        isInPSK: false,
      });
    }
  };

  const NonPhantomicStyle = {
    fillColor: "rgba(37, 47, 74, 0.24)",
    weight: 1,
    opacity: 1,
    color: "#252F4A", //Outline color
    fillOpacity: 0.7,
  };

  const PhantomicStyle = {
    fillColor: "rgba(241, 158, 105, 0.4)",
    weight: 1,
    opacity: 1,
    color: "#EC8041", //Outline color
    fillOpacity: 0.7,
  };

  var branch_ids = [];
  var array = [];
  for (const balance_index of globalState.balance_index_array) {
    branch_ids.push(GetAllObjBalanaceId(balance_index));
  }

  for (const obj of branch_ids) {
    array.push(
      <GeoJSON
        key={obj[0]}
        data={GetAllBuildingByFiasList(obj)}
        style={(features) => {
          return features.properties.isPhantomic
            ? PhantomicStyle
            : NonPhantomicStyle;
        }}
        onClick={handleTsClick}
      />
    );
  }

  return array;
};

const GeneralMap = () => {
  const [layerData, setLayer] = useState([]);
  const { globalState, globalDispach } = useContext(Contex);
  const mapRef = useRef();
  const layerRef = useRef();
  const position = [60.059873444307016, 30.37063139051443];
  const zoom_level = 12;
  const style_main = {
    fillColor: "rgba(74, 156, 255, 0.25)",
    weight: 1,
    opacity: 1,
    color: "#4A9CFF", //Outline color
    // fillOpacity: 0.7
  };
  const mapStyle = {
    height: "80vh",
  };

  const handleClick = (event) => {
    mapRef.current.leafletElement.fitBounds(event.sourceTarget.getBounds());

    let balance_group_obj = GetBalanceGroupObj(
      event.sourceTarget.feature.properties.fiasId
    );

    globalDispach({
      type: "FILTERCOMPONENT",
      fiasId: event.sourceTarget.feature.properties.fiasId,
      isPhantomic: event.sourceTarget.feature.properties.isPhantomic,
      balance_index: balance_group_obj.balance_index,
      isClean: balance_group_obj.isClean,
      objSelected: true,
      building_address: event.sourceTarget.feature.properties.name,
      obj_from: "map_click",
      isInPSK: event.sourceTarget.feature.properties.isInPSK,
    });
  };

  useEffect(() => {

    axios
      .post(
        "/line_data",
        {}, //Keep it empty
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          //Send the needed params to the server side
          params: {
            fiasId: globalState.fiasId,
            isPhantomic: globalState.isPhantomic,
            balance_index: globalState.balance_index,
            obj_from: globalState.obj_from,
            isClean: globalState.isClean,
          },
        }
      )
      .then((response) => {
        layerRef.current.leafletElement.clearLayers().addData(response.data);
        let bounds =layerRef.current.leafletElement.getBounds();
        if(bounds.isValid()){
          mapRef.current.leafletElement.flyToBounds(bounds);
        }
        setLayer(response.data);

      });
  }, [
    globalState.balance_index,
    globalState.isPhantomic,
    globalState.fiasId,
    globalState.isClean,
  ]);

  return (
    // <LoadingOverlay
    //   active={false}
    //   spinner={<CircularProgress />}
    //   text=""
    //   styles={{
    //     overlay: (base) => ({
    //       ...base,
    //       background: "rgba(34, 47, 74, 0.3)",
    //     }),
    //   }}
    // >
    <Map
      className="markercluster-map"
      center={position}
      zoom={zoom_level}
      ref={mapRef}
      style={mapStyle}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        key={"building_polygons"}
        data={buildingsPolygon}
        onClick={handleClick}
        style={style_main}
      />
      <GeoJSON key={"ts_polygons"} data={substation_other} style={style_main} />
      <GeoJSON
        key="dynamic_layer"
        data={layerData}
        ref={layerRef}
        style={(params) => LayerStyle(params)}
      />

    </Map>
    // </LoadingOverlay>
  );
};

// const PhantomicBuilding = (fiasId, mapRef) => {
//   let final_array = [];
//
//   final_array =  GetSingleBuildingByFiasId(fiasId);
//
//
//   const phantomicLayerAdded = (event)=>{
//     let bounds = event.target.getBounds();
//     mapRef.current.leafletElement.fitBounds(bounds);
//   }
//
//   const phantomicLayerRemoved = (event)=>{
//     console.log('phantom layer removed');
//   }

const LayerStyle = (param) => {
  let style = TStyle;

  if (param.properties.type === "ACLineSegment") {
    style = LineStyle;
  } else if (param.properties.isPhantomic === true) {
    style = PhantomicBuildingstyle;
  } else if (param.properties.type === "ConsumerBuilding") {
    style = NonPhantomicBuildingstyle;
  }

  return style;
};

export default GeneralMap;

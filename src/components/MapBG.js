import "react-leaflet-markercluster/dist/styles.min.css";
import "../css/map.css";
import { CircularProgress } from "@material-ui/core";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import LoadingOverlay from "react-loading-overlay";
import React, { useContext, useEffect, useRef } from "react";
import {
  GetBalanceGroupObj,
  GetAllObjBalanaceId,
  GetAllBuildingByFiasList,
  GetAllSubstationsByFiasList,
  GetPhantomicBuildingsObjects,
  GetSingleBuildingByFiasId,
} from "../scripts/mapHelpers.js";
import Contex from "../store/context";
import buildingsPolygon from "../data/building_polygon.json";

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

const PhantomicBuilding = (fiasId, mapRef) => {
  let final_array = [];

  final_array =  GetSingleBuildingByFiasId(fiasId);


  const phantomicLayerAdded = (event)=>{
    let bounds = event.target.getBounds();
    mapRef.current.leafletElement.fitBounds(bounds);
  }

  const phantomicLayerRemoved = (event)=>{
    console.log('phantom layer removed');
  }

  return <GeoJSON
    key={fiasId}
    data={final_array}
    onAdd={phantomicLayerAdded}
    onRemove={phantomicLayerRemoved}
    style={PhantomicBuildingstyle}
  />;
};

const NonePhantomicBuilding = (globalState, mapRef) => {
  let bi = globalState.balance_index;
  let fiasId = globalState.fiasId;
  let final_array = [];

  if(bi === '' && globalState.isClean === "balance_id_not_found"){
    final_array =  GetSingleBuildingByFiasId(fiasId);
  }else{
    let fiasId_building_list = GetAllObjBalanaceId(bi);
    let phantomic_building_objects = GetPhantomicBuildingsObjects(bi);
    let building_objects = GetAllBuildingByFiasList(
      fiasId_building_list.concat(phantomic_building_objects)
    );
    let substations = GetAllSubstationsByFiasList(fiasId_building_list);
    final_array = [...substations, ...building_objects];
  }

  const nonPhantomicLayerAdded = (event)=>{
    let bounds = event.target.getBounds();
    mapRef.current.leafletElement.fitBounds(bounds);
  }

  const nonPhantomicLayerRemoved = (event)=>{
    console.log('non phantomic layer removed');
  }

  return (
    <GeoJSON
      key={bi}
      data={final_array}
      onAdd={nonPhantomicLayerAdded}
      onRemove={nonPhantomicLayerRemoved}
      style={(features) => {
        return features.properties.isPhantomic
          ? PhantomicBuildingstyle
          : NonPhantomicBuildingstyle;
      }}
    />
  );
};

const DisplayMultipleBalanceGroups = (globalState) => {
  const { globalDispach } = useContext(Contex);

  const handleTsClick = (event) => {
    let balance_group_obj = GetBalanceGroupObj(event.sourceTarget.feature.properties.fiasId);

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
          return features.properties.isPhantomic ? PhantomicStyle : NonPhantomicStyle;
        }}
        onClick={handleTsClick}
      />
    );
  }

  return array;
};

const GeneralMap = () => {
  const { globalState, globalDispach } = useContext(Contex);
  const mapRef = useRef();
  const position = [60.04506711185432, 30.39647037897212];
  const zoom_level = 15;
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

    let balance_group_obj = GetBalanceGroupObj(event.sourceTarget.feature.properties.fiasId);

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

        {globalState.objSelected ? checkDisplay(globalState, mapRef) : null}
      </Map>
    // </LoadingOverlay>
  );
};

const checkDisplay = (globalState, mapRef) => {
  if (globalState.obj_from === "ts_select") {
    return DisplayMultipleBalanceGroups(globalState, mapRef);
  } else {
    if (globalState.isPhantomic) {
      return PhantomicBuilding(globalState.fiasId, mapRef);
    } else {
      return NonePhantomicBuilding(globalState, mapRef);
    }
  }

};
export default GeneralMap;

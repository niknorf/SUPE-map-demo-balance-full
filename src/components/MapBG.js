import "react-leaflet-markercluster/dist/styles.min.css";
import "../css/map.css";
import { CircularProgress } from "@material-ui/core";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import LoadingOverlay from "react-loading-overlay";
import React, { useContext } from "react";
import {
  GetBalanceGroupObj,
  GetAllObjBalanaceId,
  GetBalanceIndexIsClean,
  GetAllBuildingByFiasList,
  GetAllSubstationsByFiasList,
  GetPhantomicBuildingsObjects,
} from "../scripts/kgisid_mapping.js";
import Contex from "../store/context";
import buildingsPolygon from "../building_polygon.json";

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

/*TODO CHNAGE KGISID TO FIAS // IDEA: */
const PhantomicBuilding = (fiasId) => {
  var temp;
console.log(fiasId);
  temp = buildingsPolygon.map((building) => {
    if (building.properties.fiasId === fiasId) {
      return building;
    }
});

  temp = temp.filter((obj) => {
    return typeof obj !== "undefined";
  });
  return <GeoJSON key={fiasId} data={temp} style={PhantomicBuildingstyle} />;
};

const NonePhantomicBuilding = (globalState) => {
  let bi = globalState.balance_index;
  let fiasId_building_list = GetAllObjBalanaceId(bi);
  let phantomic_building_objects = GetPhantomicBuildingsObjects(bi);
  let building_objects = GetAllBuildingByFiasList(
    fiasId_building_list.concat(phantomic_building_objects)
  );
  let substations = GetAllSubstationsByFiasList(fiasId_building_list);
  let final_array = [...substations, ...building_objects];

  return (
    <GeoJSON
      key={bi}
      data={final_array}
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
    if (globalState.balance_index_array.length > 1) {
      globalDispach({
        type: "FILTERCOMPONENT",
        kgis_id: event.sourceTarget.feature.properties.kgisId,
        fiasId: event.sourceTarget.feature.properties.fiasId,
        isPhantomic: event.sourceTarget.feature.properties.isPhantomic,
        balance_index: GetBalanceIndexIsClean(
          GetBalanceGroupObj(event.sourceTarget.feature.properties.fiasId)
        ).balance_index,
        isClean: GetBalanceIndexIsClean(
          GetBalanceGroupObj(event.sourceTarget.feature.properties.fiasId)
        ).isClean,
        objSelected: true,
        building_address: event.sourceTarget.feature.properties.name,
        obj_from: "map_click",
        isInPSK: false,
      });
    }
  };

  const style = {
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
          return features.properties.isPhantomic ? PhantomicStyle : style;
        }}
        onClick={handleTsClick}
      />
    );
  }

  return array;
};

const GeneralMap = () => {
  const { globalState } = useContext(Contex);
  const { globalDispach } = useContext(Contex);

  const position = [60.04506711185432, 30.39647037897212];
  const zoom_level = 15;

  let map = "";
  let basic_layer = "";

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
    // map.leafletElement.fitBounds(event.sourceTarget.getBounds());

    globalDispach({
      type: "FILTERCOMPONENT",
      kgis_id: event.sourceTarget.feature.properties.kgisId,
      fiasId: event.sourceTarget.feature.properties.fiasId,
      isPhantomic: event.sourceTarget.feature.properties.isPhantomic,
      balance_index: GetBalanceIndexIsClean(
        GetBalanceGroupObj(event.sourceTarget.feature.properties.fiasId)
      ).balance_index,
      isClean: GetBalanceIndexIsClean(
        GetBalanceGroupObj(event.sourceTarget.feature.properties.fiasId)
      ).isClean,
      objSelected: true,
      building_address: event.sourceTarget.feature.properties.name,
      obj_from: "map_click",
      isInPSK: event.sourceTarget.feature.properties.isInPSK,
    });
  };

  return (
    <LoadingOverlay
      active={false}
      spinner={<CircularProgress />}
      text=""
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(34, 47, 74, 0.3)",
        }),
      }}
    >
      <Map
        className="markercluster-map"
        center={position}
        zoom={zoom_level}
        ref={(ref) => {
          map = ref;
        }}
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
          ref={(ref) => {
            basic_layer = ref;
          }}
          style={style_main}
        />

        {globalState.objSelected ? checkDisplay(globalState) : null}
      </Map>
    </LoadingOverlay>
  );
};

const checkDisplay = (globalState) => {
  if (globalState.obj_from === "ts_select") {
    return DisplayMultipleBalanceGroups(globalState);
  } else {
    if (globalState.isPhantomic) {
      return PhantomicBuilding(globalState.fiasId);
    } else {
      return NonePhantomicBuilding(globalState);
    }
  }
};
export default GeneralMap;

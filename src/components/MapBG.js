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
  weight: 2,
  opacity: 1,
  color: "#EC8041", //Outline color
};

const TStyle = {
  fillColor: "rgba(249, 217, 52, 0.5)",
  weight: 1,
  opacity: 1,
  color: "#F1C010", //Outline color
  fillOpacity: 0.7,
};

const DisplayMultipleBalanceGroups = (globalState) => {
  const { globalDispach } = useContext(Contex);

  const handleTsClick = (event) => {
    let balance_group_obj = GetBalanceGroupObj(
      event.sourceTarget.feature.properties.fiasId
    );

    if (globalState.balance_index_array.length > 1) {
      globalDispach({
        isLoggedIn: true, //TODO check the token
        type: "FILTERCOMPONENT",
        fiasId: event.sourceTarget.feature.properties.fiasId,
        isPhantomic: event.sourceTarget.feature.properties.isPhantomic,
        balance_index: balance_group_obj.balance_index,
        isClean: balance_group_obj.isClean,
        objSelected: true,
        building_address: event.sourceTarget.feature.properties.name,
        obj_from: "ts_select",
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
  const [substationData, setSubstation] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef();
  const layerRef = useRef();
  const substationsRef = useRef();
  const polygonRef = useRef();

  const { globalState, globalDispach } = useContext(Contex);
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
    // height: "100%",
  };

  const handleClick = (event) => {
    mapRef.current.leafletElement.fitBounds(event.sourceTarget.getBounds());

      globalDispach({
        type: "FILTERCOMPONENT",
        kgisId: event.sourceTarget.feature.properties.kgisId,
        fiasId: event.sourceTarget.feature.properties.fiasId,
        isPhantomic: event.sourceTarget.feature.properties.isPhantomic,
        balance_index: '',
        isClean: false,
        objSelected: true,
        building_address: event.sourceTarget.feature.properties.name,
        obj_from: "map_address",
        isInPSK: event.sourceTarget.feature.properties.isInPSK,
      });
  };

  const callManager = (values, layerRef) => {
    setLoading(true);
    switch (values.obj_from) {
      case "ts_select":
        // console.log("ts select");
        break;
      case "table_click":
        getBalanceGroupObjectsByIndex(values.balance_index);
        break;
      case "map_address":
        if (values.isPhantomic) {
          console.log("phantomic");
          getObjectPolygonByFias(values.fiasId);
        } else {
          console.log("non phantomic");
          getBalanceIndexObjectsByFias(values.fiasId, layerRef);
        }

        break;

      default:
        setLoading(false);
    }
  };

  const getBalanceIndexObjectsByFias = (fiasId, layerRef) => {
    fetch("/api/Results/GetHouseBalanceInfo/" + fiasId)
      .then((res) => res.json())
      .then(
        (result) => {
            if(typeof result.properties !== 'undefined' && layerRef.current !== null){
              layerRef.current.leafletElement.clearLayers().addData(result);
              setLayer(result);
              setLoading(false);
              let bounds = layerRef.current.leafletElement.getBounds();
              if (bounds.isValid()) {
                mapRef.current.leafletElement.flyToBounds(bounds);
              }

            }else if(typeof result.balance_id !== 'undefined'){

              globalDispach({
                isLoggedIn: true, //TODO check the token
                type: "FILTERCOMPONENT",
                fiasId: fiasId,
                isPhantomic: false,
                balance_index: result.balance_id,
                isClean: result.is_clean,
                objSelected: true,
                building_address: '',
                obj_from: "map_address",
                isInPSK: false,
              });

              console.log(result.balance_id);
              fetch("/api/Results/GetBalanceGroupObjects/" + result.balance_id)
                .then((res) => res.json())
                .then(
                  (result) => {
                    if(layerRef.current !== null){
                      layerRef.current.leafletElement.clearLayers().addData(result);
                      setLayer(result);
                      setLoading(false);
                      let bounds = layerRef.current.leafletElement.getBounds();
                      if (bounds.isValid()) {
                        mapRef.current.leafletElement.flyToBounds(bounds);
                      }
                    }

                  },
                  (error) => {
                    setLoading(true);
                    setError(error);
                  }
                );
            }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setLoading(true);
          // setError(error);
        }
      );
  };

  const getObjectPolygonByFias = (fiasId) => {
    fetch("/api/GeoData/GetBuildingsGeometry/" + fiasId)
      .then((res) => res.json())
      .then(
        (result) => {
          if(layerRef.current !== null){
            layerRef.current.leafletElement.clearLayers().addData(result);
            setLayer(result);
            setLoading(false);
            let bounds = layerRef.current.leafletElement.getBounds();
            if (bounds.isValid()) {
              mapRef.current.leafletElement.flyToBounds(bounds);
            }
        }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setLoading(false);
          // setError(error);
        }
      );
  };

  const getBalanceGroupObjectsByIndex = (balance_index) => {
    fetch("/api/Results/GetBalanceGroupObjects/" + balance_index)
      .then((res) => res.json())
      .then(
        (result) => {
          if(layerRef.current !== null){
            layerRef.current.leafletElement.clearLayers().addData(result);
            setLayer(result);
            setLoading(false);
            let bounds = layerRef.current.leafletElement.getBounds();
            if (bounds.isValid()) {
              mapRef.current.leafletElement.flyToBounds(bounds);
            }
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setLoading(true);
          // setError(error);
        }
      );
  };

  const getBalanceIndexByFias = (fiasId, event) => {
    let balance_group_obj = {
      balance_index: "",
      isClean: false,
    };
    fetch("/api/Results/GetHouseBalanceInfo/" + fiasId)
      .then((res) => res.json())
      .then(
        (result) => {
          if (typeof result.balance_id !== "undefined") {
            balance_group_obj = {
              balance_index: result.balance_id,
              isClean: result.is_clean,
            };
          }
          globalDispach({
            isLoggedIn: true, //TODO check the token
            type: "FILTERCOMPONENT",
            kgisId: event.sourceTarget.feature.properties.kgisId,
            fiasId: event.sourceTarget.feature.properties.fiasId,
            isPhantomic: event.sourceTarget.feature.properties.isPhantomic,
            balance_index: balance_group_obj.balance_index,
            isClean: balance_group_obj.isClean,
            objSelected: true,
            building_address: event.sourceTarget.feature.properties.name,
            obj_from: "map_address",
            isInPSK: event.sourceTarget.feature.properties.isInPSK,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setLoading(true);
          // setError(error);
        }
      );
  };

  useEffect(() => {
    callManager(globalState, layerRef);
  }, [globalState.balance_index, globalState.fiasId]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/GeoData/GetSubstationGeometry")
      .then((res) => res.json())
      .then(
        (result) => {
          if(substationsRef.current !== null){
            substationsRef.current.leafletElement.clearLayers().addData(result);
            setSubstation(result);
          }
          setLoading(false);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setLoading(true);
          // setError(error);
        }
      );
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <LoadingOverlay
        active={loading}
        spinner={<CircularProgress style={{ color: "#252F4A" }} />}
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
          ref={mapRef}
          style={mapStyle}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON
            key={"building_polygons"}
            data={buildingsPolygon}
            ref={polygonRef}
            onClick={handleClick}
            style={style_main}
          />
          <GeoJSON
            key={"ts_polygons"}
            data={substationData}
            ref={substationsRef}
            style={TStyle}
          />
          <GeoJSON
            key="dynamic_layer"
            data={layerData}
            ref={layerRef}
            style={(params) => LayerStyle(params)}
          />
        </Map>
      </LoadingOverlay>
    </div>
  );
};

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

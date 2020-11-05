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
    height: "80vh",
  };

  const handleClick = (event) => {
    mapRef.current.leafletElement.fitBounds(event.sourceTarget.getBounds());

    let balance_group_obj = GetBalanceGroupObj(
      event.sourceTarget.feature.properties.fiasId
    );

    globalDispach({
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
  };

  const callManager = (values) => {
    setLoading(true);
    switch (values.obj_from) {
      case "ts_select":
        // console.log("ts select");
        break;
      case "table_click":
        // console.log("table click");
        getBalanceGroupObjectsByIndex(values.balance_index);
        break;
      case "map_address":

        if (values.isPhantomic) {
          // console.log('phantomic');
          getObjectPolygonByFias(values.fiasId);
        } else {
          // console.log('non phantomic');
          getBalanceIndexObjectsByFias(values.fiasId);
        }

        break;

      default:
        setLoading(false);
    }
  };

  const getBalanceIndexObjectsByFias = (fiasId) => {

    fetch("/api/Results/GetHouseBalanceInfo/" + fiasId)
      .then((res) => res.json())
      .then(
        (balance_index) => {
          // console.log(balance_index);
          setLoading(false);
          // fetch("/api/Results/GetBalanceGroupObjects/" + balance_index)
          //   .then((res) => res.json())
          //   .then(
          //     (result) => {
          //       console.log(result);
          //       // layerRef.current.leafletElement.clearLayers().addData(result);
          //       setLayer(result);
          //       setLoading(false);
          //       // let bounds = layerRef.current.leafletElement.getBounds();
          //       // if (bounds.isValid()) {
          //       //   // mapRef.current.leafletElement.flyToBounds(bounds);
          //       // }
          //     },
          //     // Note: it's important to handle errors here
          //     // instead of a catch() block so that we don't swallow
          //     // exceptions from actual bugs in components.
          //     (error) => {
          //       setLoading(true);
          //       setError(error);
          //     }
          //   );
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
          /*Remove when error will be fixed*/
          result.geometry.type = "Polygon";

          layerRef.current.leafletElement.clearLayers().addData(result);
          setLayer(result);
          setLoading(false);
          let bounds = layerRef.current.leafletElement.getBounds();
          if (bounds.isValid()) {
            mapRef.current.leafletElement.flyToBounds(bounds);
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

  const getBalanceGroupObjectsByIndex = (balance_index) => {
    fetch("/api/Results/GetBalanceGroupObjects/" + balance_index)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          // console.log(result);
          // layerRef.current.leafletElement.clearLayers().addData(result);
          // setLayer(result);
          // setLoading(false);
          // let bounds = layerRef.current.leafletElement.getBounds();
          // if (bounds.isValid()) {
          //   // mapRef.current.leafletElement.flyToBounds(bounds);
          // }
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

  const getBalanceIndexByFias = (fiasId) => {
    // console.log(fiasId);
    fetch("/api/Results/GetHouseBalanceInfo/" + fiasId)
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          // layerRef.current.leafletElement.clearLayers().addData(result);
          // setLayer(result);
          // setLoading(false);
          // let bounds = layerRef.current.leafletElement.getBounds();
          // if (bounds.isValid()) {
          //   // mapRef.current.leafletElement.flyToBounds(bounds);
          // }
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
    // setLoading(true);

    callManager(globalState, layerRef);


  }, [globalState.balance_index, globalState.fiasId]);

  useEffect(() => {
    // setLoading(true);
    // const polygon_request = axios.get("/api/GeoData/GetBuildingsGeometry");
    // const substations_request = axios.get("/api/GeoData/GetSubstationGeometry");
    /*TODO add API call for address filter and for ts filter*/
    // axios
    //   .all([polygon_request, substations_request])
    //   .then(
    //     axios.spread((...responses) => {
    //       console.log(responses);
    //       setLoading(false);
    //
    //       /*TODO finish respones
    //         set the response[0] to */
    //
    //       // polygonRef.current.leafletElement.clearLayers().addData(response[0]);
    //       // setSubstation(result); /*TODO do we need it?*/
    //
    //       // substationsRef.current.leafletElement.clearLayers().addData(response[1]);
    //       // setSubstation(result); /*TODO do we need it?*/
    //       // const responseOne = responses[0];
    //       // const responseTwo = responses[1];
    //       // const responesThree = responses[2];
    //       // use/access the results
    //     })
    //   )
    //   .catch((errors) => {
    //     /*TODO set erros*/
    //     // react on errors.
    //   });
  }, []);

  return (
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
          style={style_main}
        />
        <GeoJSON
          key="dynamic_layer"
          data={layerData}
          ref={layerRef}
          style={(params) => LayerStyle(params)}
        />
      </Map>
    </LoadingOverlay>
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

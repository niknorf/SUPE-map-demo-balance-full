import { useReducer } from "react";

const reducer = (state, action) => {
  return {
    kgisId: action.kgisId,
    fiasId: action.fiasId,
    isPhantomic: action.isPhantomic,
    isInPSK: action.isInPSK,
    data_for_item_not_found: action.data_for_item_not_found,
    balance_index: action.balance_index,
    isClean: action.isClean,
    objSelected: action.objSelected,
    building_address: action.building_address,
    obj_from: action.obj_from,
    balance_index_array: action.balance_index_array,
    isLoading: action.isLoading,
    mapRef: action.mapRef,
    isOpenSidebar: action.isOpenSidebar,
    markerValue: action.markerValue
  };
};

const useGlobalState = () => {
  const [globalState, globalDispach] = useReducer(reducer, {
    kgisId: "",
    fiasId: "",
    mapRef: "",
    isPhantomic: false,
    balance_index_array: [],
    balance_index: "",
    isLoading: false,
    isClean: "",
    obj_from: "",
    objSelected: false,
    data_for_item_not_found: false,
    isInPSK: false,
    isOpenSidebar: false,
    building_address: "",
    markerValue: []
  });

  return { globalState, globalDispach };
};
export default useGlobalState;

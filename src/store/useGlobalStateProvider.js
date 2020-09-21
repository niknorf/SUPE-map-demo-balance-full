import { useReducer } from 'react';

const reducer = (state, action) => {

	switch (action.type) {
		case "FILTERCOMPONENT":
			return {
				kgis_id: action.kgis_id,
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
			};
			case "BUBD":
			return{
				isOpenSidebar: action.isOpenSidebar,
				markerValue:	action.markerValue
			}
      default: {
			return state;
		}
	}
};

const useGlobalState = () => {
	const [globalState, globalDispach] = useReducer(reducer, {
		kgis_id: '',
		fiasId: '',
		isPhantomic: false,
		balance_index_array: [],
		balance_index: '',
		isLoading: false,
		isClean: '',
		obj_from: '',
		objSelected: false,
		data_for_item_not_found: false,
		isInPSK: false,
		isOpenSidebar: false,
		building_address: "",
		markerValue: []
	});

	return { globalState, globalDispach };
}
export default useGlobalState;

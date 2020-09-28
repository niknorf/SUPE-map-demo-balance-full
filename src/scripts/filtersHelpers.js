import building_polygons from "../data/building_polygon.json";
import ts_balance_dict from "../data/ts_balance_dict.json";

/*
    Function returns all street addresses
*/
const GetStreetAdresses = () => {
  var street_array = [];
  for (const key of Object.keys(building_polygons)) {
    var temp_obj = {};
    temp_obj.name = building_polygons[key].properties.name;
    temp_obj.key = building_polygons[key].properties.fiasId;
    temp_obj.fiasId = building_polygons[key].properties.fiasId;
    temp_obj.isPhantomic = building_polygons[key].properties.isPhantomic;
    temp_obj.isInPSK = building_polygons[key].properties.isInPSK;
    street_array.push(temp_obj);
  }
  return street_array;
};

export { GetStreetAdresses };

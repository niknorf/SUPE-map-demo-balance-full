import balance_result_full from "../data/balance_result_full_full.json";
import kgis_upe from "../data/kgis_upe.json";
import buildingsPolygon from "../data/building_polygon.json";
import substations from "../data/substation_other.json";
import phantomic_buildings from "../data/balance_phantom_dict.json";
import ksgis_upeid from "../data/kgis_upe.json";
import axios from 'axios';

/*
    Function returns all building objects by fias building list
*/
const GetAllBuildingByFiasList = (fias_building_list) => {
  let temp;

  temp = buildingsPolygon.map((building) => {
    for (const element of fias_building_list) {
      if (building.properties.fiasId !== '' && building.properties.fiasId === element) {
        return building;
      }
    }
  });
  temp = temp.filter((obj) => {
    return typeof obj !== "undefined";
  });

  return temp;
};

/*
    Function returns all objects realted to the balance group (not Consume buildings)
*/
const GetAllSubstationsByFiasList = (fiasId_building_list) => {
  let temp;

  temp = substations.map((building) => {
    for (const element of fiasId_building_list) {
      if (building.properties.kgis_id.toString() === element.toString()) {
        return building;
      }
    }
  });

  temp = temp.filter((obj) => {
    return typeof obj !== "undefined";
  });

  return temp;
};

/*
    Function returns all phantomic buildings realted to the balance group
*/
const GetPhantomicBuildingsObjects = (balance_index) => {
  return typeof phantomic_buildings[balance_index] === 'undefined' ? [] : phantomic_buildings[balance_index];
};

/*
    Function searches and returns the balance group object by provided fiasId
*/
const GetBalanceGroupObj = (fiasId) => {
  if (fiasId !== "" && typeof fiasId !== "undefined") {
    let balance_group_obj = {};
    for(var i = 0; i < balance_result_full.length; i++){
        if(balance_result_full[i].branch_id === fiasId){
            balance_group_obj = balance_result_full[i];
        }
    }

    var temp_obj = {
      isClean: "balance_id_not_found",
      balance_index: "",
    };

    if (Object.keys(balance_group_obj).length) {
      temp_obj.isClean = balance_group_obj.is_clean;
      temp_obj.balance_index = balance_group_obj.balance_index;
    }

    return temp_obj;
  }
};

const GetSingleBuildingByFiasId = (fiasId) => {

  var temp = {};

  for(var i = 0; i < buildingsPolygon.length; i++){
    if(buildingsPolygon[i].properties.fiasId === fiasId){
      temp = buildingsPolygon[i];
    }
  }

  return temp;
}

const GetIsCleanByBalanceIndex = (balance_index) => {
  var balance_index_obj = balance_result_full.find((element) => {
    return (
      element.balance_index === balance_index &&
      element.type === "ConsumerBuilding"
    );
  });

  return balance_index_obj;
};

const GetKgisIdByBranchId = (branch_id) => {
  var obj = kgis_upe.find((element) => {
    return element.upe_id.toString() === branch_id;
  });

  return typeof obj !== "undefined" ? obj.kgis_id.toString() : "";
};

/*
    Function returns an array of fiasid's that belong to the selected balance group
*/
const GetAllObjBalanaceId = (balance_index) => {
  //get all the balance group objects
  var object_ep_list = balance_result_full.filter((element) => {
    return element.balance_index.toString() === balance_index.toString() && element.type !== 'ACLineSegment';
  });

  //extract to array branch ids
  let result = object_ep_list.map((a) => a.branch_id);

  return result;
};

const GetBuildingObjBalanaceId = (balance_index) => {
  //get all the balance group objects
  var object_ep_list = balance_result_full.filter((element) => {
    return element.balance_index.toString() === balance_index.toString() && element.type === 'ConsumerBuilding';
  });

  //extract to array branch ids
  let result = object_ep_list.map((a) => a.branch_id);

  return result;
};

const GetAllLinesBalanaceId = (balance_index) => {
  //get all the balance group objects
  var object_ep_list = balance_result_full.filter((element) => {
    return element.balance_index.toString() === balance_index.toString() && element.type === 'ACLineSegment';
  });

  //extract to array branch ids
  let result = object_ep_list.map((a) => a.branch_id);

let finla =   upeIdToKgisId(result);


console.log(finla);
  return null;
};

const upeIdToKgisId = (upeid_array) =>{

let kgis_array = [];
  for(const upeid of upeid_array){
    for(const mapper of ksgis_upeid){
      if(upeid === mapper.upe_id){
        kgis_array.push(mapper.kgis_id);
      }
    }
  }

  console.log(upeid_array, kgis_array);

  let final_obj = [];
  let kgisId  = [2394732,2399817,2390296];


  // axios.get("/line_data", {
	// headers: {
	//   'Access-Control-Allow-Origin': '*',
	// },
	// proxy: {
	//   host: 'http://localhost',
	//   port: 5000
	// }
	// }).then(response => {
  //     console.log(response);
  // });
axios.post("/line_data", {},
   {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    params: { kgisId }
}).then(response => {

    return response.data;
  });


//   axios({
//     method: 'post',
//     url: `${'http://localhost:3000/data.php'}`,
//     headers: { 'content-type': 'application/json' },
//     data: kgisId
//   })
//     .then(result => {
// console.log(result);
//     })
//     .catch(error => {console.log('error occured');});

  // for(const kgisId of kgis_array){
  //   for(const obj of line_1)
  //   if(kgisId === obj.properties.kgis_id){
  //     final_obj.push(obj);
  //   }
  // }

}

export {
  GetAllObjBalanaceId,
  GetBalanceGroupObj,
  GetIsCleanByBalanceIndex,
  GetKgisIdByBranchId,
  GetAllBuildingByFiasList,
  GetAllSubstationsByFiasList,
  GetPhantomicBuildingsObjects,
  GetSingleBuildingByFiasId,
  GetAllLinesBalanaceId,
  GetBuildingObjBalanaceId,
};

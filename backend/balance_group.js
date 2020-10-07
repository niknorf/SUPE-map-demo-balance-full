const express = require("express");
const fs = require("fs");
const app = express();
const port = 5000;
let lines1_rawdata = fs.readFileSync("data/lines/1.json");
let lines2_rawdata = fs.readFileSync("data/lines/2.json");
let lines3_rawdata = fs.readFileSync("data/lines/3.json");
let lines4_rawdata = fs.readFileSync("data/lines/4.json");
let line1 = JSON.parse(lines1_rawdata);
let line2 = JSON.parse(lines2_rawdata);
let line3 = JSON.parse(lines3_rawdata);
let line4 = JSON.parse(lines4_rawdata);

let balanceresult_rawdata = fs.readFileSync("data/balance_result_full.json");
let balance_result_full = JSON.parse(balanceresult_rawdata);

let phantomicbuildings_rawdata = fs.readFileSync(
  "data/balance_phantom_dict.json"
);
let phantomic_buildings = JSON.parse(phantomicbuildings_rawdata);

let buildingspolygon_rawdata = fs.readFileSync("data/building_polygon.json");
let buildings_polygons = JSON.parse(buildingspolygon_rawdata);

let ksgistoupeid_rawdata = fs.readFileSync("data/kgis_upe.json");
let ksgisToUpeid = JSON.parse(ksgistoupeid_rawdata);


function PhantomicBuilding(params) {}

function NonPhantomicBuilding(params) {
  if (
    params.balance_index === "" &&
    params.isClean === "balance_id_not_found"
  ) {
    //show only one building based on its fiasid
    // GetSingleBuildingByFiasId(fiasId)
  } else {
    let consumerBuildingAndLines = GetConsumerBuildingsAndLinesByBalanaceId(
      params.balance_index
    );
    // console.log(consumerBuildingAndLines);
    let phantomicBuildings = GetPhantomicBuildingsObjects(params.balance_index);
    // console.log(phantomicBuildings);
    let merged_building = phantomicBuildings.concat(consumerBuildingAndLines.consumer_building);
    // console.log(merged_building);
    let buildingPolygons = GetPolygonBuildings(merged_building);
		let upeToKgis = UpeIdtoKgisId(consumerBuildingAndLines.lines);
		let linesPolygons = GetPolygonLines(upeToKgis);

		let final_array = buildingPolygons.concat(linesPolygons);

		return final_array;

    /*
		Follow the steps:
		V 1. Get all CinsumerBuilding and lines using the balance_index
		V 2. Get all phantomic building associated with a balance_index_obj
		V	3. Combine ConsumerBuilding and phantomic building list
		V 4. Get all polygons of ConsumerBuilding and phantomic buildings
		V	5. Transfer fiaid of the lines to kgisids
		V 6. Get all polygons of lines
		V 7. Merge building and lines together
		V 8. Return the merged array of objects
		*/
  }
}

// const GetSingleBuildingByFiasId = (fiasId) => {
//
//   var temp = {};
//
//   for(var i = 0; i < buildingsPolygon.length; i++){
//     if(buildingsPolygon[i].properties.fiasId === fiasId){
//       temp = buildingsPolygon[i];
//     }
//   }
//
//   return temp;
// }

function GetConsumerBuildingsAndLinesByBalanaceId(balance_index) {
  let obj = {};
  obj.consumer_building = [];
  obj.lines = [];

  for (var i = 0; i < balance_result_full.length; i++) {
    if (balance_result_full[i].balance_index.toString() === balance_index) {
      if (balance_result_full[i].type === "ConsumerBuilding") {
        obj.consumer_building.push(balance_result_full[i].branch_id);
      }
      if (balance_result_full[i].type === "ACLineSegment") {
        obj.lines.push(balance_result_full[i].branch_id);
      }
    }
  }

  return obj;
}

function GetPhantomicBuildingsObjects(balance_index) {
  return typeof phantomic_buildings[balance_index] === "undefined"
    ? []
    : phantomic_buildings[balance_index];
}

function GetPolygonBuildings(fias_building_list) {
  let polygon_objects = [];

  for (var i = 0; i < buildings_polygons.length; i++) {
    for (const element of fias_building_list) {
      if (
        buildings_polygons[i].properties.fiasId !== "" &&
        buildings_polygons[i].properties.fiasId === element
      ) {
        polygon_objects.push(buildings_polygons[i]);
      }
    }
  }

	return polygon_objects;

}

function UpeIdtoKgisId(upeid_array){
	let kgis_array = [];
	  for(const upeid of upeid_array){
	    for(const mapper of ksgisToUpeid){
	      if(upeid === mapper.upe_id){
	        kgis_array.push(mapper.kgis_id);
	      }
	    }
	  }
		return kgis_array;
}

function GetPolygonLines(fias_building_list) {
  let polygon_objects = [];

  for (var i = 0; i < line1.length; i++) {
    for (const element of fias_building_list) {
      if (
        line1[i].properties.kgis_id !== "" &&
        line1[i].properties.kgis_id.toString() === element.toString()
      ) {
        polygon_objects.push(line1[i]);
      }
    }
  }

	for (var i = 0; i < line2.length; i++) {
		for (const element of fias_building_list) {
			if (
				line2[i].properties.kgis_id !== "" &&
				line2[i].properties.kgis_id.toString() === element.toString()
			) {
				polygon_objects.push(line1[i]);
			}
		}
	}

	for (var i = 0; i < line3.length; i++) {
		for (const element of fias_building_list) {
			if (
				line3[i].properties.kgis_id !== "" &&
				line3[i].properties.kgis_id.toString() === element.toString()
			) {
				polygon_objects.push(line1[i]);
			}
		}
	}

	for (var i = 0; i < line4.length; i++) {
		for (const element of fias_building_list) {
			if (
				line4[i].properties.kgis_id !== "" &&
				line4[i].properties.kgis_id.toString() === element.toString()
			) {
				polygon_objects.push(line1[i]);
			}
		}
	}

	return polygon_objects;

}

//add CORS support
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/line_data", (req, res) => {

let returnArray = [];

  if (req.query.obj_from) {
    if (req.query.obj_from === "ts_select") {
    } else {
      if (req.query.isPhantomic === "true") {
        PhantomicBuilding(req.query);
      } else {
      returnArray =  NonPhantomicBuilding(req.query);
      }
    }
  }

  res.json(returnArray);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

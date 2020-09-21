import { Autocomplete } from "@material-ui/lab";
import { FormControl, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import {
  GetBalanceGroupObj,
  GetBalanceIndexIsClean,
} from "../scripts/kgisid_mapping.js";
import Contex from "../store/context";
import building_polygons from "../building_polygon.json";
import ts_balance_dict from "../data/ts_balance_dict.json";

const TsSearchComponent = () => {
  const { globalDispach } = useContext(Contex);

  const handleChange = (event, value) => {
    globalDispach({
      type: "FILTERCOMPONENT",
      balance_index_array: value === null ? "" : value.bg_index,
      objSelected: value === null ? false : true,
      obj_from: "ts_select",
    });
  };

  var ts_search = [];
  for (const key of Object.keys(ts_balance_dict)) {
    var obj = {};
    obj.ts_name = key;
    obj.bg_index = ts_balance_dict[key];
    ts_search.push(obj);
  }

  return (
    <FormControl>
      <Autocomplete
        id="ts_search"
        options={ts_search}
        getOptionLabel={(option) => option.ts_name}
        style={{ width: 300 }}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Выберете из списка " margin="normal" />
        )}
      />
    </FormControl>
  );
};

const SearchComponent = () => {
  const { globalDispach } = useContext(Contex);

  const handleChange = (event, value) => {
    // map.leafletElement.fitBounds(event.sourceTarget.getBounds());
      globalDispach({
        type: "FILTERCOMPONENT",
        kgis_id: value === null ? "" : value.kgisId,
        fiasId: value === null ? "" : value.fiasId,
        isPhantomic: value === null ? "" : value.isPhantomic,
        balance_index:
          value === null
            ? ""
            : GetBalanceIndexIsClean(GetBalanceGroupObj(value.fiasId))
                .balance_index,
        isClean:
          value === null
            ? ""
            : GetBalanceIndexIsClean(GetBalanceGroupObj(value.fiasId)).isClean,
        objSelected: value === null ? false : true,
        fromTsFilter: false,
        obj_from: "street_select",
        isInPSK: value === null ? false : value.isInPSK,
        isLoading: true,
      });

  };

  //Create array of the steet from the building_polygon file
  var street_array = [];

  building_polygons.map((obj) => {
    let temp_obj = {};
    temp_obj.name = obj.properties.name;
    temp_obj.fiasId = obj.properties.fiasId;
    temp_obj.isPhantomic = obj.properties.isPhantomic;
    temp_obj.isInPSK = obj.properties.isInPSK;
    street_array.push(temp_obj);

    return obj;
  });

  return (
    <FormControl>
      <Autocomplete
        id="street_search"
        options={street_array}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        onChange={handleChange}
        disableListWrap={true}
        disablePortal={true}
        noOptionsText='Варинты не найдены'
        autoSelect={true}
        renderInput={(params) => (
          <TextField {...params} label="Найти адрес" margin="normal" />
        )}
      />
    </FormControl>
  );
};

export { SearchComponent, TsSearchComponent };

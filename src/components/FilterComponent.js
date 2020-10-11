import { Autocomplete } from "@material-ui/lab";
import { FormControl, TextField, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { GetBalanceGroupObj,} from "../scripts/mapHelpers.js";
import { GetStreetAdresses,} from "../scripts/filtersHelpers.js";
import Contex from "../store/context";
import ts_balance_dict from "../data/ts_balance_dict.json";

const TsSearchComponent = () => {
  const { globalDispach } = useContext(Contex);

  const handleChange = (event, value) => {
    globalDispach({
      type: "FILTERCOMPONENT",
      balance_index_array: value === null ? "" : value.bg_index,
      objSelected: value === null ? false : true,
      obj_from: value === null ? "" : "ts_select",
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
        style={{ width: 450}}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Трансформаторная подстанция" margin="normal" placeholder="Выберете из списка" />
        )}
      />
    </FormControl>
  );
};

const SearchComponent = () => {
  const { globalDispach } = useContext(Contex);

  const handleChange = (event, value) => {
    let obj = {
      balance_index: '',
      isClean: false,
    }

    if(value !== null){
      obj = GetBalanceGroupObj(value.fiasId);
    }

    globalDispach({
      type: "FILTERCOMPONENT",
      kgisId: value === null ? "" : value.kgisId,
      fiasId: value === null ? "" : value.fiasId,
      isPhantomic: value === null ? false : value.isPhantomic,
      balance_index: value === null ? "": obj.balance_index,
      isClean: value === null ? "" : obj.isClean,
      objSelected: value === null ? false : true,
      fromTsFilter: false,
      obj_from: value === null ? "" : "street_select",
      isInPSK: value === null ? false : value.isInPSK,
      isLoading: true,
    });
  };

  let options = GetStreetAdresses();

  return (
    <FormControl>
      <Autocomplete
        id="street_search"
        options={options}
        getOptionLabel={(option) => option.name}
        style={{ width: 450 }}
        onChange={handleChange}
        filterOptions={(options, state) => options}
        noOptionsText="Варианты не найдены"
        renderInput={(params) => (
          <TextField {...params} label="Найти адрес" margin="normal" placeholder="Выберете из списка" />
        )}
        />
    </FormControl>
  );
};

export { SearchComponent, TsSearchComponent };

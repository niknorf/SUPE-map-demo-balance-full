import { Autocomplete } from "@material-ui/lab";
import { FormControl, TextField, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { GetBalanceGroupObj } from "../scripts/mapHelpers.js";
import { GetStreetAdresses } from "../scripts/filtersHelpers.js";
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
    <FormControl fullWidth>
      <Autocomplete
        id="ts_search"
        options={ts_search}
        getOptionLabel={(option) => option.ts_name}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Трансформаторная подстанция"
            margin="normal"
            placeholder="Выберете из списка"
          />
        )}
      />
    </FormControl>
  );
};

const SearchComponent = () => {
  const { globalDispach } = useContext(Contex);
  const [streets, setStreets] = useState([]);

  const handleStreetChange = (event, value) => {
    let obj = {
      balance_index: "",
      isClean: false,
    };

    console.log(value === null);

    if (value !== null) {
      obj = GetBalanceGroupObj(value.fias);
    }

    globalDispach({
      type: "FILTERCOMPONENT",
      fiasId: value === null ? "" : value.fias,
      /*TODO change to value.isPhantomic*/
      isPhantomic: value === null ? false : obj.balance_index === '' ? true : false,
      balance_index: value === null ? "" : obj.balance_index,
      isClean: value === null ? "" : obj.isClean,
      objSelected: value === null ? false : true,
      obj_from: value === null ? "" : "map_address",
      /*TODO change to value.isPhantomic*/
      isInPSK: value === null ? false : true,
      isLoading: true,
    });
  };

  useEffect(() => {
    fetch("/api/DataCompare/GetBuildingAddressByFias")
      .then((res) => res.json())
      .then(
        (result) => {
          /*TODO add loading indicator for whole page*/
          setStreets(result);
        },
        (error) => {
          /*TODO catch errors if any*/
          // setLoading(true);
          // setError(error);
        }
      );
  }, []);

  /*TODO fix filtering of the address filter*/

  return (
    <FormControl fullWidth>
      <Autocomplete
        id="street_search"
        options={streets}
        getOptionLabel={(option) => option.address}
        onChange={handleStreetChange}
        filterOptions={(options, state) => options}
        noOptionsText="Варианты не найдены"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Найти адрес"
            margin="normal"
            placeholder="Выберете из списка"
          />
        )}
      />
    </FormControl>
  );
};

export { SearchComponent, TsSearchComponent };

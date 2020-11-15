import { Autocomplete } from "@material-ui/lab";
import { FormControl, TextField, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
// import { GetBalanceGroupObj } from "../scripts/mapHelpers.js";
import { GetStreetAdresses } from "../scripts/filtersHelpers.js";
import Contex from "../store/context";
import ts_balance_dict from "../data/ts_balance_dict.json";
import { List, AutoSizer } from "react-virtualized";
import {matchSorter} from 'match-sorter';

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, role, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = 36;
  return (
        <div ref={ref}>
          <div {...other}>
            <List
              height={300}
              width={600}
              rowHeight={itemSize}
              overscanCount={5}
              rowCount={itemCount}
              rowRenderer={props => {
                return React.cloneElement(children[props.index], {
                  style: props.style
                });
              }}
              role={role}
            />
          </div>
        </div>

  );
});

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
        // getOptionLabel={(option) => option.ts_name}
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
  const [loadingState, setLoadingState] = useState(false);
  const [fiasId, setFiasId] = useState('');

  const handleStreetChange = (event, value) => {
    let obj = {
      balance_index: "",
      isClean: false,
    };

    if (value !== null) {
      setFiasId(value.fias);
    //   obj = GetBalanceGroupObj(value.fias);
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
      /*TODO change to value.isInPsk*/
      isInPSK: value === null ? false : true,
      isLoading: true,
    });
  };


  useEffect(() => {
    setLoadingState(true)
    fetch("/api/DataCompare/GetBuildingAddressByFiasOnlyPoly")
      .then((res) => res.json())
      .then(
        (result) => {
          /*TODO add loading indicator for whole page*/
          setStreets(result);
          setLoadingState(false);
        },
        (error) => {
          /*TODO catch errors if any*/
          // setLoading(true);
          // setError(error);
        }
      );
  }, []);

/*TODO when they add isPhantomic to the address list and the reques twill be made from maps side*/

  /*TODO fix filtering of the address filter*/

  const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue, {keys: ['address']});

  return (
    <FormControl fullWidth>
      <Autocomplete
        id="street_search"
        options={streets}
        getOptionLabel={(option) => option.address}
        onChange={handleStreetChange}
        laoding={loadingState}
        loadingText="Данные загружаются..."
        // disableListWrap
        ListboxComponent={ListboxComponent}
      filterOptions={filterOptions}
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

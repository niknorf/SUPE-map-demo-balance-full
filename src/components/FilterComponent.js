import { Autocomplete } from "@material-ui/lab";
import { FormControl, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Contex from "store/context";
// import ts_balance_dict from "../data/ts_balance_dict.json";
import { List } from "react-virtualized";
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

    console.log(value);

    if (value !== null) {
      setFiasId(value.fias);
      // obj = GetBalanceGroupObj(value.fias);
    }


    globalDispach({
      type: "FILTERCOMPONENT",
      fiasId: value === null ? "" : value.fias,
      isPhantomic: value === null ? false : value.is_phantomic ? true : false,
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
    fetch("/api/PSK/GetCurrentConsumersList")
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

export { SearchComponent };

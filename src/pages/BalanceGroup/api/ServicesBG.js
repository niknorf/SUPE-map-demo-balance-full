import axios from "axios";

export default {
  getResImbalanceFrontKWH: async function () {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/Results/GetResImbalanceFrontKWH"
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getMeterpointStats: async function (balance_id) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/Results/GetBalanceGroupMeterpointStats/" +
          balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getResImbalanceByYear: async function (balance_id, year) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/Results/GetResImbalanceFrontByYear/" +
          year +
          "/" +
          balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getResImbalanceFront: async function (balance_id) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/Results/GetResImbalanceFront/" +
          balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getImbalancePhantom: async function (balance_id) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/Results/GetImbalancePhantom/" +
          balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getIndexes: async function (balance_id) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/Results/GetResultIndexes/" +
          balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getHouseBalanceInfo: async function (fias_id) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/Results/GetHouseBalanceInfo/" +
          fias_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getBalanceGroupObjects: async function (balance_id) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/Results/GetBalanceGroupObjects/" +
          balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getBuildingsGeometry: async function (fias_id) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/GeoData/GetBuildingsGeometry/" +
          fias_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getSubstationGeometry: async function () {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/GeoData/GetSubstationGeometry"
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getBalanceResultFull: async function (balance_id) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/Results/GetBalanceResultFull/" +
          balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getMeterpointsInfo: async function (balance_id) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/Results/GetBalanceGroupMeterpointsInfo/" +
          balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
};

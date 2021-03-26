import axios from "axios";

export default {
  getResImbalanceFront: async function(id) {
    try {
      const response = await axios.get("/api/Results/GetResImbalanceFrontKWH");
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getMeterpointStats: async function(balance_id) {
    try {
      const response = await axios.get(
        "/api/Results/GetBalanceGroupMeterpointStats/" + balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getResImbalanceByYear: async function(balance_id, year) {
    try {
      const response = await axios.get(
        "/api/Results/GetResImbalanceFrontByYear/" + year + "/" + balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getResImbalanceFront: async function(balance_id) {
    try {
      const response = await axios.get(
        "/api/Results/GetResImbalanceFront/" + balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getImbalancePhantom: async function(balance_id) {
    try {
      const response = await axios.get(
        "/api/Results/GetImbalancePhantom/" + balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getIndexes: async function(balance_id) {
    try {
      const response = await axios.get(
        "/api/Results/GetResultIndexes/" + balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getHouseBalanceInfo: async function(fias_id) {
    try {
      const response = await axios.get(
        "/api/Results/GetHouseBalanceInfo/" + fias_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getBalanceGroupObjects: async function(balance_id) {
    try {
      const response = await axios.get(
        "/api/Results/GetBalanceGroupObjects/" + balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getBuildingsGeometry: async function(fias_id) {
    try {
      const response = await axios.get(
        "/api/GeoData/GetBuildingsGeometry/" + fias_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getSubstationGeometry: async function() {
    try {
      const response = await axios.get("/api/GeoData/GetSubstationGeometry");
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getBalanceResultFull: async function(balance_id) {
    try {
      const response = await axios.get(
        "/api/Results/GetBalanceResultFull/" + balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getMeterpointsInfo: async function(balance_id) {
    try {
      const response = await axios.get(
        "/api/Results/GetBalanceGroupMeterpointsInfo/" + balance_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getTaskStatus: async function(fias_id) {
    try {
      const response = await axios.get(
        "/api/UserTasks/TasksForFiasExists/" + fias_id
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
};

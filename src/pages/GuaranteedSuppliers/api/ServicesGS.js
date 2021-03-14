import axios from "axios";
import { BASE_URL, AUTH_API_CONFIG, LOGIN_API_CONFIG } from "./config";
export default {
  getLegalPSKData: async function(fias_id) {
    try {
      const response = await axios.get(
        BASE_URL + "/api/PSK/GetLegalPSKData/1281/" + fias_id,
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getFizTimeSeries: async function(fias_id) {
    try {
      const response = await axios.get(
        BASE_URL + "/api/DataCompare/GetFizTimeSeries/1281/" + fias_id,
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getCommonPSKData: async function(fias_id) {
    try {
      const response = await axios.get(
        BASE_URL + "/api/PSK/GetCommonPSKData/1281/" + fias_id,
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getFiasStatQuarter: async function(fias_id) {
    try {
      const response = await axios.get(
        BASE_URL + "/api/Results/GetFiasStatQuarter/" + fias_id,
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getFiasPskStat: async function(fias_id) {
    try {
      const response = await axios.get(
        BASE_URL + "/api/Results/GetFiasPskStat/" + fias_id,
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getFullPSKData: async function(fias_id) {
    try {
      const response = await axios.get(
        BASE_URL + "/api/PSK/GetFullPSKData/1281/" + fias_id,
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getFiasClusterMedian: async function(fias_id) {
    try {
      const response = await axios.get(
        BASE_URL + "/api/Results/GetFiasClusterMedian/" + fias_id,
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getConsumersPSKData: async function(fias_id) {
    try {
      const response = await axios.get(
        BASE_URL + "/api/PSK/GetConsumersPSKData/" + fias_id,
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getBuildFeatClean: async function(fias_id) {
    try {
      const response = await axios.get(
        BASE_URL + "/api/Results/GetBuildFeatClean/" + fias_id,
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
};

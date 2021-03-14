import axios from "axios";
import { BASE_URL, AUTH_API_CONFIG, LOGIN_API_CONFIG } from "./config";
export default {
  getCurrentStatistic: async function() {
    try {
      const response = await axios.get(
        BASE_URL + "/api/UserTasks/CurrentStatistic",
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getWeekStatistic: async function() {
    try {
      const response = await axios.get(
        BASE_URL + "/api/UserTasks/WeekStatistic",
        AUTH_API_CONFIG
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
};

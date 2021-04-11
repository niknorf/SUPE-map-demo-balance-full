import axios from "axios";

export default {
  getCurrentStatistic: async function() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/UserTasks/CurrentStatistic",
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getWeekStatistic: async function() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/UserTasks/WeekStatistic",
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
};

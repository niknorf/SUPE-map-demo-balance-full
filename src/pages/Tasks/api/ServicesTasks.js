import axios from "axios";

export default {
  getWorkerList: async function() {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL +"/api/UserTasks/Workers");
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getTasksList: async function() {
    try {
      const response = await axios.get( process.env.REACT_APP_API_URL +"/api/UserTasks");
      return response.data;
    } catch (e) {
      return e;
    }
  },
  createTask: async function(requestOptions) {
    try {
      const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/UserTasks/AddTask",
        requestOptions
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  updateTask: async function(requestOptions) {
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + "/api/UserTasks/UpdateTask",
        requestOptions
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  createFeedback: async function(requestOptions) {
    try {
      const response = await axios.post( process.env.REACT_APP_API_URL + "/api/UserTasks/AddFeedback", null, {
        params: requestOptions
      });
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getFeedback: async function(taskId) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/UserTasks/Feedback?taskId=" + taskId
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
};

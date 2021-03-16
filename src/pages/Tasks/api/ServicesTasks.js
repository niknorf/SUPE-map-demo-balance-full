import axios from "axios";
// import { BASE_URL, AUTH_API_CONFIG, LOGIN_API_CONFIG } from "./config";
export default {
  getWorkerList: async function() {
    try {
      const response = await axios.get("/api/UserTasks/Workers");
      return response.data;
    } catch (e) {
      return e;
    }
  },
  getTasksList: async function() {
    try {
      const response = await axios.get("/api/UserTasks");
      return response.data;
    } catch (e) {
      return e;
    }
  },
  createTask: async function(requestOptions) {
    try {
      const response = await axios.post(
        "/api/UserTasks/AddTask",
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
        "/api/UserTasks/UpdateTask",
        requestOptions
      );
      return response.data;
    } catch (e) {
      return e;
    }
  },
  createFeedback: async function(requestOptions) {
    try {
      const response = await axios.post("/api/UserTasks/AddFeedback", null, {
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
        "/api/UserTasks/Feedback?taskId=" + taskId
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
};

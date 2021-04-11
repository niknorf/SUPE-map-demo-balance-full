import axios from "axios";

let API_URL = process.env.REACT_APP_API_URL;
process.env.NODE_ENV === 'development' ? API_URL = '' : API_URL = process.env.REACT_APP_API_URL;

export default {
  getBuBd: async function() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/Results/GetBuBd"
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
};

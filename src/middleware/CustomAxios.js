import axios from "axios";

const CustomAxios = axios.create({
  // baseURL: "https://api.automateevents.com"
  baseURL: "https://dev-api.automateevents.com:8444/"
});

CustomAxios.interceptors.request.use(
  (req) => {
    req.headers["Authorization"] = 'Bearer' + " " + localStorage.getItem("token");
    req.headers["Accept"] = "application/JSON";
    return req;
  },

  (err) => {
    return Promise.reject(err);
  }
);

CustomAxios.interceptors.response.use(
    (res) => {
      return res;
    },
  
    (err) => { 
      return Promise.reject(err);
    }
  );

export default CustomAxios;

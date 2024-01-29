import axios from "axios";

const instance = axios.create({
  // baseURL: "https://api.automateevents.com"
  // baseURL: "https://events-dev1.accellier.net/saasevent/public"
  baseURL: process.env.REACT_APP_BASE_URL
});

export default instance;
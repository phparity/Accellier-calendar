import axios from "axios";

const instance = axios.create({
  // baseURL: "https://api.automateevents.com"
  // baseURL: "https://events-dev1.accellier.net/saasevent/public"
  baseURL: "https://dev-api.automateevents.com:8444/"
});

export default instance;

// CustomerList.js -- change base_url and sample url 
// modale.js -- change windows.location.href
// Home.js -- change windows.location.href at 2 places
// Reports.js -- change the iframe url
// change the title and fav-con in index.html
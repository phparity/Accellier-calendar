import axios from "axios";
const BASEURL = "https://my-json-server.typicode.com/phparity/api-accellier-calendar/";
export const getEvent = async () => {
  const res = await axios.get(`${BASEURL}/events`);
const {data} =  res;
  console.log("🚀 ~ file: fackApis.js:7 ~ res:",data);
  return data;
};

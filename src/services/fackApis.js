import axios from "axios";
const BASEURL = "https://my-json-server.typicode.com/phparity/api-accellier-calendar/";
// const BASEURL = "http://localhost:3001";
export const getEvent = async () => {
  const res = await axios.get(`${BASEURL}/events`);
const {data} =  res;
  console.log("🚀 ~ file: fackApis.js:7 ~ res:",data);
  return data;
};
export const getManagers = async () => {
  const res = await axios.get(`${BASEURL}/profiles`);
const {data} =  res;
  console.log("🚀 ~ file: fackApis.js:7 ~ res:",data);
  return data;
};

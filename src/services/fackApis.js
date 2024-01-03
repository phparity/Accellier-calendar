import axios from "axios";
const BASEURL = "http://localhost:3001";
export const getEvent = async () => {
  const res = await axios.get(`${BASEURL}/events`);
const {data} =  res;
  console.log("🚀 ~ file: fackApis.js:7 ~ res:",data);
  return data;
};

import axios from "axios";
let development = process.env.NODE_ENV !== "production";

const instance = axios.create({
  // baseURL: "http://localhost" ,
  // baseURL: "http://www.rentsg.software" ,
  baseURL: development ? "http://localhost:5000/api" : "http://www.rentsg.software/api",
});

export default instance;

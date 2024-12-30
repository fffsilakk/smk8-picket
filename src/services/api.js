//import axios
import axios from "axios";
import { Helper } from "../helper";

const Api = axios.create({
  //set default endpoint API
  baseURL: Helper.urlApi,
});

export default Api;

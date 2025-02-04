import axios from "axios";
import { Helper } from "../helper";

const controller = "picket";

export const PicketService = {
  get: async () => {
    let response = await axios.get(`${controller}`);
    return Helper.getResult(response);
  },
  Pageninate: async (model) => {
    let response = await axios.post(`${controller}/paginate`, model);
    return Helper.getResult(response);
  },
};

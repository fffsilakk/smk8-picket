import axios from "axios";
import { Helper } from "../helper";

const controller = "student";

export const StudentService = {
  get: async () => {
    let response = await axios.get(`${Helper.url}/${controller}`);
    return Helper.getResult(response);
  },
  getActive: async () => {
    let response = await axios.get(`${Helper.url}/${controller}/active`);
    return Helper.getResult(response);
  },
  post: async (model) => {
    let response = await axios.post(`${Helper.url}/${controller}`, model);
    return Helper.getResult(response);
  },
  put: async (id, model) => {
    let response = await axios.put(`${Helper.url}/${controller}/${id}`, model);
    return Helper.getResult(response);
  },
  delete: async (id) => {
    let response = await axios.delete(`${Helper.url}/${controller}/${id}`);
    return Helper.getResult(response);
  },
  getById: async (id) => {
    let response = await axios.get(`${Helper.url}/${controller}/${id}`);
    return Helper.getResult(response);
  },
};

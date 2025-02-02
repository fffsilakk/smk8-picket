import axios from "axios";
import { Helper } from "../helper";

const controller = "student";

export const StudentService = {
  get: async () => {
    let response = await axios.get(`${controller}`);
    return Helper.getResult(response);
  },
  Pageninate: async (model) => {
    let response = await axios.post(`${controller}/paginate`,model);
    return Helper.getResult(response);
  },
  search: async (keyword) => {
    let response = await axios.get(`${controller}/search/${keyword}`);
    return Helper.getResult(response);
  },
  post: async (model) => {
    let response = await axios.post(`${controller}`, model);
    return Helper.getResult(response);
  },
  put: async (id, model) => {
    let response = await axios.put(`${controller}/${id}`, model);
    return Helper.getResult(response);
  },
  delete: async (id) => {
    let response = await axios.delete(`${controller}/${id}`);
    return Helper.getResult(response);
  },
  getById: async (id) => {
    let response = await axios.get(`${controller}/${id}`);
    return Helper.getResult(response);
  },
  updateFoto: async (id, data) => {
    let response = await axios.put(`${controller}/photo/${id}`, data);
    return Helper.getResult(response);
  },
};

import axios from "axios";
import { Helper } from "../helper";

const controller = "schedule";

export const ScheduleService = {
  get: async () => {
    let response = await axios.get(`${Helper.url}/${controller}`);
    return Helper.getResult(response);
  },
  getBySchoolYearId: async (scheduleId) => {
    let response = await axios.get(`${Helper.url}/${controller}/byschoolyearId/${scheduleId}`);
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

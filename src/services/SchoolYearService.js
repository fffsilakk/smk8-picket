import axios from "axios"
import { Helper } from '../helper'

const controller = "schoolyear";

export const SchoolYearService = {
    get: async () => {
        var response = await axios.get(`${Helper.url}/${controller}`);
        return Helper.getResult(response);
    },
    post: async (model) => {
        var response = await axios.post(`${Helper.url}/${controller}`, model);
        return Helper.getResult(response);
    },
    put: async (id, model) => {
        var response = await axios.put(`${Helper.url}/${controller}/${id}`, model);
        return Helper.getResult(response);
    },
    delete: async (id) => {
        var response = await axios.delete(`${Helper.url}/${controller}/${id}`);
        return Helper.getResult(response);
    }
}
import axios from "axios"
import { Helper } from '../helper'

const controller = "classroom";

export const ClassRoomService = {
    get: async () => {
        var response = await axios.get(`${controller}`);
        return Helper.getResult(response);
    },
    getById: async (id) => {
        var response = await axios.get(`${controller}/${id}`);
        return Helper.getResult(response);
    },
    post: async (model) => {
        var response = await axios.post(`${controller}`, model);
        return Helper.getResult(response);
    },
    addStudentToClass: async (classroomId, model) => {
        var response = await axios.post(`${controller}/addstudent/${classroomId}`, model);
        return Helper.getResult(response);
    },
    put: async (id, model) => {
        var response = await axios.put(`${controller}/${id}`, model);
        return Helper.getResult(response);
    },
    delete: async (id) => {
        var response = await axios.delete(`${controller}/${id}`);
        return Helper.getResult(response);
    },
    removeStudent: async (classroomId, studentId) => {
        var response = await axios.delete(`${controller}/removestudent/${classroomId}/${studentId}`);
        return Helper.getResult(response);
    },

}
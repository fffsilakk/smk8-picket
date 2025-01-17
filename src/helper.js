export const Helper = {
  url: "https://picket.ocph23.tech",
  urlApi: "https://picket.ocph23.tech/api/",
  getResult: (response) => {
    return response.status === 200
      ? { data: response.data, isSuccess: true }
      : { data: response.data, isSuccess: false };
  },
  getWeartherString: (value) => {
    switch (value) {
      case 0:
        return "Cerah";
      case 1:
        return "Mendung";
      case 2:
        return "Hujan";
      case 3:
        return "Apalah";

      default:
        return "-";
    }
  },

  readDetailError: (error) => {
    if ("detail" in error) return error.detail;

    if (errors && propName) {
      var result = errors.find((x) => x.code === propName);
      return result ? result.description : null;
    }
    return null;
  },

  readError: (errors, propName) => {
    if (errors && propName) {
      var result = errors.find((x) => x.code === propName);
      return result ? result.description : null;
    }
    return null;
  },

  formatDate: (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  },

  getTeacherAvatar: (photo) => {
    if (photo) return `${Helper.url}/photos/teacher/${photo}`;
    return "/man.png";
  },
  getStudentAvatar: (photo) => {
    if (photo) return `${Helper.url}/photos/student/${photo}`;
    return "/man.png";
  },
};

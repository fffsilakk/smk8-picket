export const Helper = {
  // url: "http://localhost:5003",
  // urlApi: "http://localhost:5003/api/",
  url: "http://192.168.1.22",
  urlApi: "http://192.168.1.22/api/",
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
        return "Gerimis";
      case 3:
        return "Hujan";
      default:
        return "Cerah";
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


  getIndonesiaDay: (value) => {
    switch (value) {
      case 0:
        return "Minggu";
      case 1:
        return "Senin";
      case 2:
        return "Selasa";
      case 3:
        return "Rabu";
      case 4:
        return "Kamis";
      case 5:
        return "Jumat";
      case 6:
        return "Sabtu";
      default:
        return value;
    }
  },


  formatDate: (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  },

  getTeacherAvatar: (photo) => {
    if (photo) return `${Helper.url}/photos/teacher/${photo}`;
    return "/man.png";
  },
  getStudentAvatar: (photo) => {
    if (photo) return `${Helper.url}/photos/student/${photo}`;
    return "/man.png";
  },
  fileToBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }

};

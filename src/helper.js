export const Helper = {
    url: "https://picket.ocph23.tech/api",
    getResult: (response) => {
        return response.status === 200 ? { data: response.data, isSuccess: true } : { errors: response.data.errors, data: null, isSuccess: false };
    },

    readError: (errors, propName) => {
        if (errors && propName) {
            var result = errors.find(x => x.code === propName);
            return result ? result.description : null;
        }
        return null;
    }

}
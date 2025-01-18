import axios, { AxiosError, type AxiosResponse } from "axios";
import { ref } from "vue";
import { Helper } from "./helper.js"
import { ToastService } from "./services/ToastService";

const authString = localStorage.getItem("authToken");
const auth = JSON.parse(authString!);
axios.defaults.baseURL = Helper.urlApi;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = auth ? 'Bearer ' + auth.token : '';


const onNotFound = () => {
    ToastService.dangerToast('Alamat URL Tidak Ditemukan.');
}

const onError = () => {
    ToastService.dangerToast('Maaf terjadi kesalahan. Coba Uangi lagi/Silahkan Hubungi administrator.');
}

const isRefreshToken = ref(false);
axios.interceptors.response.use(function (response,) {
    // Optional: Do something with response data
    return response;
}, function (err) {
    try {
        const axiosError = err as AxiosError;
        const axiosResponse = axiosError.response as AxiosResponse;
        const response = err.response.data;
        const pesanError: string = 'Password lama yang anda masukkan tidak sesuai';
        if (axiosResponse.status == 401) {
            if (response.messages.error !== pesanError) {
                ToastService.dangerToast(response.messages.error);
                // AuthService.logout();
                // router.push('/login');
            }
            ToastService.dangerToast(response.messages.error);
            return err;
        }

        if (axiosResponse.status == 404) {
            onNotFound();
            return err;
        }
        if (axiosResponse.status == 405) {
            onError();
            return err;
        }

        if (axiosResponse.status == 503) {
            onError();
            // ToastService.dangerToast(response.messages.err);
            // const router = useRouter();
            // router.push(`/error-page${axiosResponse.status}`);
            return err;
        }
        if (axiosResponse.status == 500) {
            onError();
            return err;
        }


        let errorMessage="";
        if (response.detail) {
            return err.response;
        }
        else if (response.messages) {
            errorMessage = response.messages.error
        }
        throw new Error(errorMessage);
    } catch (error: any) {
        console.log(error);
        ToastService.dangerToast(error);
    }
    return Promise.reject(err);
});


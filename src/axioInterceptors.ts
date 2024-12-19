import axios, { AxiosError, type AxiosResponse } from "axios";
import { ref } from "vue";
import { Helper } from "./helper.js"
import { ToastService } from "./services/ToastService";
import { useRoute, useRouter } from "vue-router";

const authString = localStorage.getItem("authToken");
const auth = JSON.parse(authString!);
axios.defaults.baseURL = Helper.url;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = auth ? 'Bearer ' + auth.token : '';
const router = useRouter();

const onNotFound = () => {
    ToastService.addToast('Alamat URL Tidak Ditemukan.', 'error');
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
                ToastService.addToast(response.messages.error, 'error');
                // AuthService.logout();
                // router.push('/login');
            }
            ToastService.addToast(response.messages.error, 'error');
            return err;
        }

        if (axiosResponse.status == 404) {
            onNotFound();
            return err;
        }

        if (axiosResponse.status == 503) {
            ToastService.addToast(response.messages.error, 'error')
            router.push(`/error-page${axiosResponse.status}`);
            return err;
        }
        if (axiosResponse.status == 500) {
            ToastService.addToast(response.messages.error, 'error')
            router.push(`/error-page${axiosResponse.status}`);
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
        ToastService.addToast(error.message);
    }
    return Promise.reject(err);
});


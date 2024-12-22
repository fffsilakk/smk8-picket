import { reactive } from "vue";

export const DialogService = reactive({
    isShow: false,
    message: '',
    type: '',
    duration: 0,
    cancelClick: null,
    okClick: null,
    cancelText: '',
    okText: '',
    showDialog(message, param, type = 'info', duration = 3000, cancelText = 'close', okText = 'ok') {
        return new Promise((resolve, reject) => {
            this.isShow = true;
            this.message = message;
            this.type = type;
            this.duration = duration;
            this.cancelText = cancelText;
            this.okText = okText;
            this.okClick = () => {
                resolve(param);
                console.log("ok fire");
            }
            this.cancelClick = () => {
                console.log("cancel fire");
                reject();
            }
        })

    },
    hideDialog: () => {
        this.isShow = false;
    }
});
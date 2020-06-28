import CryptoJS from 'crypto-js'
export default class LocalStorageService {
    constructor() {
        // Axios.interceptors.request.use(function (config) {

        //   return config
        // })
    }

    async setToken(setToken) {
        var ciphertext = CryptoJS.AES.encrypt(setToken, 'secret key 123').toString();
        console.log(ciphertext)
        localStorage.setItem('token', ciphertext)
        return ciphertext
    }

    async getToken() {
        return new Promise(function (resolve, reject) {
            var bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), 'secret key 123');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            resolve(originalText)
        })
    }
}
// eslint-disable

// eslint-disable
import Axios from 'axios';

export default class AuthService {
  headers

  async postRequest(url, dataObj) {
    this.headers = {
      'content-Type': 'application/json',
    };
    const config = {
      headers: this.headers,
    };
    const res = await Axios.post(url, dataObj, config);
    return res;
  }
}
// eslint-disable

// eslint-disable
import Axios from 'axios';
import LocalStorageService from './localStorage.service';

export default class DashboardService {
  constructor() {

  }

  headers
  async getRequest(url) {
    let localStorageService = new LocalStorageService
    let token = await localStorageService.getToken()
    this.headers = {
      'content-Type': 'application/json',
      Authorization: token,
    };
    const config = {
      headers: this.headers,
    };
    const res = await Axios.get(url, config);
    return res;
  }

  async addFeedBack(dataObj) {
    console.log()
    let localStorageService = new LocalStorageService
    let token = await localStorageService.getToken()
    this.headers = {
      'content-Type': 'application/json',
      'Authorization': token,
    };
    const config = {
      headers: this.headers,
    };
    const url = 'http://180.149.241.208:3000/addfeedback'
    const res = await Axios.post(url, dataObj, config);
    return res;
  }
}
// eslint-disable

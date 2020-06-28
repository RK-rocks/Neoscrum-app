import axios from "axios";
// import store from '../store';import { store } from '../store/store'
import store from '../store'
import {
  mapActions,
  mapGetters
} from 'vuex';
export function setupInterceptors({
  dispatch, mapGetters
}) {
  console.log("store object in interceptor")
  // console.log(mapActions('auth', ['loader']))
  // console.log(this.loader)
  let requestsPending = 0;
  const req = {
    pending: () => {
      requestsPending++;
      dispatch("auth/loader", true);
      console.log(store.state.auth.loader)
    },
    done: () => {
      requestsPending--;
      if (requestsPending <= 0) {
        dispatch("auth/loader", false);
        console.log(store.state.auth.loader)

      }
    },
  };
  axios.interceptors.request.use(
    (config) => {
      req.pending();
      return config;
    },
    (error) => {
      requestsPending--;
      req.done();
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    ({
      data
    }) => {
      req.done();
      return Promise.resolve(data);
    },
    (error) => {
      req.done();
      return Promise.reject(error);
    }
  );
}

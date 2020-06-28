<template>
  <!-- eslint-disable -->
  <div class="login-page pa50">
    <h1 class="heading">
      <label class="neo">Neo</label>
      <label class="scrum">SCRUM</label>
    </h1>
    <div class="loginForm">
      <form @submit.prevent="loginUserForm" class="shadow-lg p-3 mb-5 bg-white rounded loginForm">
        <fieldset>
          <legend>User-login</legend>
          <div class="form-group">
            <label for="uname">Email:</label>
            <input
              :class="{ error: submitted && $v.email.$invalid }"
              type="email"
              v-model="email"
              class="form-control"
              id="uname"
              placeholder="Enter username"
              name="uname"
            />
            <div v-if="submitted">
              <div v-if="!$v.email.required">
                <p class="text-red text-left">Email is required</p>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input
              :class="{ error: submitted && $v.password.$invalid }"
              v-model="password"
              type="password"
              class="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
            />
            <div v-if="submitted">
              <div v-if="!$v.password.required">
                <p class="text-red text-left">Password is required</p>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mr10">Login</button>
          <a @click="$router.push('signup')">Registration</a>
        </fieldset>
      </form>
    </div>
  </div>
  <!-- eslint-disable -->
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import AuthService from '../../services/auth.service';
import LocalStorageService from '../../services/localStorage.service';
import CryptoJS from 'crypto-js'

export default {
  data() {
    return {
      submitted: false,
      email: '',
      password: '',
      reqObj: {},
      url: '',
      authService: new AuthService(),
      localStorageService : new LocalStorageService
    };
  },
  computed: {
    ...mapGetters({
      isLogin: 'auth/isLogin'
    })
  },
  created(){
    console.log("in login store object")
    console.log(this.$store)
  },
  methods: {
    ...mapActions('auth', ['loginSuccess', 'logout']),
    async loginUserForm() {
      console.log("in login page")
      console.log(this.loginSuccess)
      this.loginSuccess();
      this.submitted = true;
      if (this.$v.$invalid) {
        return;
      }
      this.reqObj = {
        user_email: this.email,
        user_pass: this.password
      };
      this.url = 'http://180.149.241.208:3000/login';
      try {
        const res = await this.authService.postRequest(this.url, this.reqObj);
        console.log(res);
        if (res.success === 'false') {
          alert(res.message);
        } else {
          this.localStorageService.setToken(res.token)
          let token = await this.localStorageService.getToken()
          this.loginSuccess(token);
          console.log(res);
          // let setToken = localStorage.setItem('token', res.token);
          // var ciphertext = CryptoJS.AES.encrypt(res.token, 'secret key 123').toString();
          // console.log(ciphertext)


          // Decrypt
          // var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
          // var originalText = bytes.toString(CryptoJS.enc.Utf8);
          // console.log(originalText);

          if(localStorage.getItem('token')){
            this.$store.dispatch('auth/loginSuccess');
            this.$router.push('/');
          }
        }
      } catch (error) {
        alert(error.message);
      }
    },
  },
  validations: {
    email: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(4)
    }
  }
};
</script>

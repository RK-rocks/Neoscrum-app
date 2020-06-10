<template>
  <!-- eslint-disable -->
  <div class="login-page pa50">
    <h1 class="heading "><label class="neo">Neo</label><label class="scrum">SCRUM</label></h1>
    <div class="loginForm">
      <form action="dashboard.html" class="shadow-lg p-3 mb-5 bg-white rounded loginForm">
        <fieldset>
          <legend>User-login</legend>
          <div class="form-group">
              <label for="uname">Email:</label>
              <input type="email" v-model="email"
                v-validate="'required|email'"
                :class="{'has-error': errors.has('email')}" class="form-control" id="uname" placeholder="Enter username" name="uname">
              <p v-if="errors.has('email')" class="alert-danger">
                {{ errors.first('email') }}
              </p>
          </div>
          <div class="form-group">
              <label for="pwd">Password:</label>
              <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
          </div>
          <button type="submit" @click="onLogin" class="btn btn-primary mr10">Login</button>
          <a href="admin.html">Registration</a>
        </fieldset>
      </form>
    </div>
  </div>
  <!-- eslint-disable -->
</template>
<script>

import { Vue } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { VeeValidate } from 'vee-validate';

Vue.use(VeeValidate);

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      isLogin: 'auth/isLogin',
    }),
  },
  methods: {
    ...mapActions('auth', [
      'loginSuccess',
      'logout',
    ]),
    onLogin() {
      this.loginSuccess();
      this.$router.push({ name: '/' });
      this.$validator.validateAll().then(() => {
        alert(this.email);
      }).catch(() => {
        alert(this.errors.all());
      });
      this.$store.dispatch('auth/loginSuccess');
    },
    onLogout() {
      this.logout();
      // this.$store.dispatch('auth/logout');
    },
  },
};
</script>

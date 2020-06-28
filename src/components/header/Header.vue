<template>
  <nav class="navbar navbar-expand-md bg-dark navbar-dark">
    <a class="navbar-brand" href="#">
      <img src="@/assets/images/profileImage.png" alt="logo" style="width:50px;" />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav list">
        <li class="nav-item">
          <a class="btn btn-outline-success my-2 my-sm-0 mr5" @click="$router.push('add-feedback')">
            Add
            Feedback
          </a>
        </li>
        <li class="nav-item">
          <a class="btn btn-outline-danger my-2 my-sm-0" @click="onLogout()">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

import store from '../../store'
import { mapActions, mapGetters } from 'vuex';

export default {
  data(){
    return{

    }
  },
  methods: {
    ...mapActions('auth', ['loginSuccess', 'logout']),
  onLogout() {
    console.log("in logout")
    localStorage.removeItem('token')
    this.logout();
    this.$store.dispatch('auth/logout');
    this.$router.push('/login');
  }
  }
}
</script>>

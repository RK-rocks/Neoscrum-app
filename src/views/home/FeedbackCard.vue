<template>
  <div class="card">
    <img class="card-img-top" src="profileImage.png" width="30px" alt="Receiver's image" />
    <div class="card-body">
      <form :key="index" @submit.prevent="addFeedbackForm">
        <h5 class="card-title">{{data.receiver_name}}</h5>
        <textarea class="card-text" id="textarea"></textarea>
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          :key="index"
        >Send Feedback</button>
        <p class="card-text">
          <small class="text-muted">Your feedback is important!!</small>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/dashboard.service';
import LocalStorageService from '../../services/localStorage.service';

export default {
  data(){
    return{
    submitted:false,
      authService: new AuthService(),
      localStorageService : new LocalStorageService,
      url:'',
    }
  },
  beforeMount:async function() {
    this.url = 'http://180.149.241.208:3000/dashboard'
    const result = await this.authService.getRequest(this.url);
    // this.fakeData = result.data.feedback
  },
  methods: {
    async addFeedbackForm() {
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
          this.loginSuccess();
          console.log(res);
          // let setToken = localStorage.setItem('token', res.data.token);
          
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
}
</script>

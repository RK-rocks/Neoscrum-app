<template>
  <div>
    <h1 class="heading">
      <label class="neo">Neo</label>
      <label class="scrum">SCRUM</label>
    </h1>
    <div class="loginForm">
      <form @submit.prevent="register" class="shadow-lg p-3 mb-5 bg-white rounded loginForm">
        <fieldset>
          <legend>Admin</legend>
          <div class="form-group">
            <label for="name" class="float-left">Name:</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter Name"
              v-model.trim="name"
              :class="{ error: submitted && $v.name.$invalid }"
            />
          </div>
          <div v-if="submitted">
            <div v-if="!$v.name.required">
              <p class="text-red text-left">Name is required</p>
            </div>
          </div>
          <div class="form-group">
            <label for="uname" class="float-left">Email:</label>
            <input
              type="email"
              class="form-control"
              id="uname"
              placeholder="Enter Email"
              v-model.trim="email"
              :class="{ error: submitted && $v.email.$invalid }"
            />
          </div>
          <div v-if="submitted">
            <div v-if="!$v.email.required">
              <p class="text-red text-left">Email is required</p>
            </div>
            <div v-if="!$v.email.email">
              <p class="text-red text-left">Invalid Email</p>
            </div>
          </div>
          <div class="form-group">
            <label for="profile" class="float-left">Profile Image:</label>
            <input
              type="file"
              class="form-control"
              id="profile"
              name="profile"
              @change="profileImage"
              :class="{ error: submitted && this.profile == '' }"
            />
          </div>
          <div v-if="submitted">
            <div v-if="this.profile == ''">
              <p class="text-red text-left">Profile is required</p>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mr10">Registration</button>
          <a @click="$router.push('login')">Login</a>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import AuthService from '../../services/auth.service';

export default {
  data() {
    return {
      name: '',
      email: '',
      profile: '',
      submitted: false,
      authService: new AuthService(),
      error: ''
    };
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    profile: {
      required
    }
  },
  name: 'Register',
  methods: {
    async register() {
      try {
        this.submitted = true;
        if (this.$v.$invalid) {
          return;
        }
        console.log(this.email, this.name, this.profile);

        const formdata = new FormData();
        formdata.append('user_name', this.name);
        formdata.append('user_email', this.email);
        formdata.append('profile_image', this.profile);
        const url = 'http://180.149.241.208:3000/registration';
        const result = await this.authService
          .postRequest(url, formdata)
          .catch((error) => {
            console.log(error.response);
            this.error = error.response;
            if (this.error.data.success === 'false') {
              alert(this.error.data.message);
            }
          });
        if (result.data.success === 'true') {
          alert(result.data.message);
          this.$router.push('/login');
        }
        console.log('result', result);
      } catch (error) {
        console.log('error', error);
      }
    },
    profileImage(event) {
      const image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.profile = e.target.result;
      };
    },
  },
};
</script>

<style  scoped>
.error {
  border: 1px solid red;
}
.text-red {
  color: red;
}
</style>

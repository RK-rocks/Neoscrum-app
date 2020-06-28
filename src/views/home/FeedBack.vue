<template>
  <div>
    <div class="card" :key="feedBackData.receiver_id">
      <img
        class="card-img-top mt-3"
        width="30px"
        alt="Receiver's image"
        :src="`${this.baseUrl}/${feedBackData.image_path}`"
      />
      <div class="card-body">
        <form v-bind:key="feedBackData.receiver_id">
          <h5 class="card-title">{{feedBackData.receiver_name}}</h5>
          <textarea
            :key="feedBackData.receiver_id"
            :id="feedBackData.receiver_id"
            class="card-text"
            v-model="feedback"
            :class="{ error: submitted && $v.feedback.$invalid }"
          ></textarea>
          <div v-if="submitted">
            <div v-if="!$v.feedback.required">
              <p class="text-red text-left">Feedback is required</p>
            </div>
          </div>
          <button
            class="btn btn-outline-success my-2 my-sm-0 margin-top-10"
            :id="feedBackData.receiver_id"
            @click.prevent="addFeedBack(feedBackData.receiver_id, feedback)"
          >Send Feedback</button>

          <p class="card-text mt10">
            <small class="text-muted">Your feedback is important!!</small>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
// import { environment } from "../../environments/environment.ts";
import DashboardService from "../../services/dashboard.service";
export default {
  data() {
    return {
      feedback: "",
      submitted: false,
      baseUrl: "",
      DashboardService: new DashboardService()
    };
  },
  name: "Feedback",
  props: ["feedBackData"],
  validations: {
    feedback: {
      required
    }
  },
  methods: {
    async addFeedBack(id, feedback) {
      this.submitted = true;
      if (this.$v.$invalid) {
        return;
      }
      console.log(id, feedback);

      let obj = {
        receiver_id: id,
        feedback_data: feedback
      };
      let result = await this.DashboardService.addFeedBack(obj).catch(error => {
        console.log(error.response);
        this.error = error.response;
        if (this.error.data.success == "false") {
          alert(this.error.data.message);
        }
      });

      if (result.success == "true") {
        alert(result.message);
        // refreshFeedbackList();
        this.$emit('refreshComponent')
        this.feedback = "";
        this.submitted = true;
      }
    }
  },
  mounted() {
    // this.baseUrl = environment.apiUrl;
  }
};
</script>

<style scoped>
.error {
  border: 1px solid red;
}
.text-red {
  color: red;
}
.margin-top-10{
  margin-top: 10px !important;
}
</style>
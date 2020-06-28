<template>
  <div>
    <div v-if="!this.receiver.length">
      <h3 class="display-2 text-center mt-5">There is no receivers for you currently</h3>
    </div>
    <div class="row carddiv" v-if="this.receiver.length">
      <div
        class="col-sm-12 col-md-4 col-lg-3 card1 shadow-lg p-3 mb-5 bg-white rounded"
        v-for="(data, index) in receiver"
        :unique-key="true"
        :key="index"
      >
        <Feedback @refreshComponent="refreshComponent" v-bind:feedBackData="data" />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardService from "../../services/dashboard.service";
import Feedback from "./FeedBack";
export default {
  components: { Feedback },

  

  

  data() {
    return {
      // fakeData: [
      //   {
      //     flags: false,
      //     receiver_id: 286,
      //     image_path: "2019-04-11T05-45-38.907Z10.jpeg",
      //     receiver_name: "CD",
      //     sender_id: 306
      //   },
      //   {
      //     flags: false,
      //     receiver_id: 229,
      //     image_path: "2019-04-11T05-45-38.907Z10.jpeg",
      //     receiver_name: "Sagar Shinde",
      //     sender_id: 306
      //   },
      //   {
      //     flags: false,
      //     receiver_id: 293,
      //     image_path: "2019-04-11T05-45-38.907Z10.jpeg",
      //     receiver_name: "Bansi Patel",
      //     sender_id: 306
      //   }
      // ],
      DashboardService: new DashboardService(),
      receiver: [],
      feedback: "",
      submitted: false,
      error: ""
    };
  },
  name: "AddFeedBack",
  methods:{
    async loadData(){
      this.url = 'http://180.149.241.208:3000/dashboard'
      let result = await this.DashboardService.getRequest(this.url)
      this.receiver = result.data;
      console.log("result", result);
    },
    refreshComponent(){
      this.loadData()
    },
  },
  async mounted() {
    this.loadData()
  }
};
</script>

<style scoped>
</style>

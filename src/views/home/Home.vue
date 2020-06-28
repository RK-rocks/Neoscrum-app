<template>
  <div class="row carddiv">
    <div
      v-for="(p, index) in fakeData"
      :key="index"
      class="col-sm-12 col-md-4 col-lg-3 card1 shadow-lg p-3 mb-5 bg-white rounded"
    >
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <label>Feedback</label>
            <small class="card-subtitle mb-2 text-muted egodate">4 month ego</small>
            <p class="card-text">{{p.feedback_data}}</p>
          </h5>
          <p class="card-text"></p>
        </div>
        <div class="card-footer">
          <small class="text-muted egodate">
            <br />
            Posted Date: {{p.posting_date}}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AuthService from '../../services/dashboard.service';

export default {
  data(){
    return{
      authService: new AuthService(),
      url:'',
      fakeData: [
        // {
        //   flags: false,
        //   receiver_id: 286,
        //   image_path: "2019-04-11T05-45-38.907Z10.jpeg",
        //   receiver_name: "CD",
        //   sender_id: 306
        // },
        // {
        //   flags: false,
        //   receiver_id: 229,
        //   image_path: "2019-04-11T05-45-38.907Z10.jpeg",
        //   receiver_name: "Sagar Shinde",
        //   sender_id: 306
        // },
        // {
        //   flags: false,
        //   receiver_id: 293,
        //   image_path: "2019-04-11T05-45-38.907Z10.jpeg",
        //   receiver_name: "Bansi Patel",
        //   sender_id: 306
        // }
      ],
    }
  },
  beforeMount:async function() {
    this.url = 'http://180.149.241.208:3000/feedback'
    const result = await this.authService.getRequest(this.url);
    this.fakeData = result.feedback
  },
}
</script>

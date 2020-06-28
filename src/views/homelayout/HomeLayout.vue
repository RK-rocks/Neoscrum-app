<template>
  <div class="home-layout-container">
    <Header></Header>
    <main class="main-content">
      <!-- <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader> -->
      <router-view />
    </main>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from '@/components/header/Header.vue';
import Footer from '@/components/footer/Footer.vue';

export default {
  data(){
    return{
      props: {
        loading:true,
        color:'red',
        size:'10'
      },
    }
  },
  name: 'Home',
  components: {
    Header,
    Footer,
  },
  mounted(){
    console.log("store in home layout")
    console.log(this.$store)
  }
};
</script>

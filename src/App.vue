<template>
  <div id="app">
    <Loader :show="this.loader" />
    <router-view />
    <!-- <router-view /><Loader :show:"this.loader" /> -->
  </div>
</template>

<style lang="scss">

</style>

<script>
import Loader from "./components/helpers/Loader";
import { mapActions, mapGetters } from 'vuex';
export default {
  data(){
    return {}
  },
  components: {
    Loader
  },
  computed:{
    ...mapGetters({
      loader_state: 'auth/loader_state'
    }),
    loader(){
      // return true
      return this.loader_state
    }
  },
  mounted(){
    console.log(this.loader_state)
  }
}
</script>
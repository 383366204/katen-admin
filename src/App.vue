<template>
  <div id="app">
    <side-bar v-if="!getIndex"></side-bar>
    <router-view/>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
import "@/assets/css/base.css";
export default {
  name: 'App',
  components:{
    SideBar
  },
  methods:{
    judgeIndex(){
      if(this.$route.path!="/"){
        this.$store.commit('setIndexFalse');
      }
      else{
        this.$store.commit('setIndexTrue');
      }
    }
  },
  computed:{
    getIndex(){
      return this.$store.state.isIndex;
    }
  },
  watch: {
      "$route.path": "judgeIndex"
  },
  beforeMount: function () {
      this.judgeIndex();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

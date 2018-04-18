<template>
  <div id="app">
    <side-bar></side-bar>
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

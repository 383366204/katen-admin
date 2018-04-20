<template>
  <main>
    <el-menu
      router
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="Product">商品管理</el-menu-item>
      <el-menu-item index="Order">订单管理</el-menu-item>
      <el-menu-item index="Message">留言管理</el-menu-item>
      <el-menu-item v-if="adminInfo.level==0" index="Admin">管理员管理</el-menu-item>
      <div class="nav-right">
        <span v-if="adminInfo.level==0">超级管理员</span>
        <span v-else-if="adminInfo.level==1">普通管理员</span>
        <span>{{adminInfo.id}}</span>
        <el-button type="text" @click="logOut()">登出</el-button>
      </div>
    </el-menu>
  </main>
</template>


<style scoped>
  .nav-right{
    height: inherit;
    float: right;
    line-height: 60px;
    padding-right: 20px;
  }
  .nav-right>span{
    color: #fff;
    margin-right: 8px;
  }
</style>

<script>
export default {
  data() {
    return {
      activeIndex: "Product",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logOut(){
      this.$store.commit('logout',this.$router);
    }
  },
  computed:{
    adminInfo(){
      return this.$store.state.adminInfo
    }
  }
};
</script>
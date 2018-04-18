<template>
  <main>
    <el-menu
      :default-active="activeIndex2"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1"><router-link to="/Product">商品管理</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/Order">订单管理</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/Message">留言管理</router-link></el-menu-item>
      <el-menu-item index="5"><router-link to="/Admin">管理员管理</router-link></el-menu-item>
    </el-menu>
  </main>
</template>


<style scoped>
  
</style>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
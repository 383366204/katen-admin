<template>
      <el-row type="flex" justify="center" align="middle" class="loginForm">
        <el-col :span="6">
          <h1 class="title">后台管理系统</h1>
          <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="100px">
            <el-form-item label="管理员帐号" prop="id">
              <el-input v-model="loginForm.id"></el-input>
            </el-form-item>
            <el-form-item label="管理员密码" prop="password">
              <el-input type="password" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="loginBtn" type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        id:'',
        password:''
      },
      loginFormRules: {
        id: [
          { required: true, message: "请输入管理员帐号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入管理员密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$ajax.post('/signin',{
            id:this.loginForm.id,
            password:this.loginForm.password
          })
          .then(response=>{
            if (response.data.success) {
              this.$notify({
                title: '成功',
                message: response.data.message,
                type: 'success',
                offset: 100
              });
              this.resetForm('loginForm');
              this.$store.commit('login',response.data)
              this.$router.push({path:'/Product'});
            }
            else{
              this.$notify.error({
                title: '失败',
                message: response.data.message,
                offset: 100
              });
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
  .title{
    font-size: 26px;
    margin-bottom: 20px;
    padding-left: 80px;
  }
  .loginForm{
    height: 800px;
  }
</style>

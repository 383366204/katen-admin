<template>
  <main>
    <el-row :gutter="20">
        <el-col :span="2" :offset="22">
            <el-button type="primary" class="addAdminBtn" @click="addAdminFormVisible=true">新增管理员<i class="el-icon-plus el-icon--right"></i></el-button>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="14" :offset="6">
    <el-table
    border
    :data="adminList"
    style="width: 100%">
    <el-table-column
      label="等级"
      width="320">
      <template slot-scope="scope">
        <i v-if="scope.row.level==0" class="el-icon-star-on"></i>
        <i v-else-if="scope.row.level==1" class="el-icon-star-off"></i>
        <span v-if="scope.row.level==0" style="margin-left: 10px">超级管理员</span>
        <span v-else-if="scope.row.level==1" style="margin-left: 10px">普通管理员</span>
      </template>
    </el-table-column>
    <el-table-column
      label="账号"
      width="480">
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="311">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改密码</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-col>
  </el-row>
  <el-dialog title="新增管理员" :visible.sync="addAdminFormVisible" width="30%">
  <el-form :model="addAdminForm" :rules="addAdminFormRules" ref="addAdminForm">
      <el-form-item label="帐号" label-width="78px" prop="id">
          <el-input v-model="addAdminForm.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="78px" prop="password">
          <el-input type="password" v-model="addAdminForm.password" auto-complete="off" @keyup.enter.native="submitForm('addAdminForm')"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" label-width="78px" prop="checkPassword">
          <el-input type="password" v-model="addAdminForm.checkPassword" auto-complete="off" @keyup.enter.native="submitForm('addAdminForm')"></el-input>
      </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
      <el-button @click="addAdminFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('addAdminForm')">确 定</el-button>
  </div>
  </el-dialog>


  <el-dialog title="修改密码" :visible.sync="modifyFormVisible" width="30%">
    <el-form :model="modifyForm" :rules="modifyFormRules" ref="modifyForm">
      <el-form-item label="用户名" label-width="78px" >
            <el-input v-model="modifyForm.id" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="原密码" label-width="78px" prop="oldPassword">
            <el-input type="password" v-model="modifyForm.oldPassword" auto-complete="off" @keyup.enter.native="submitForm('modifyForm')"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="78px" prop="password">
            <el-input type="password" v-model="modifyForm.password" auto-complete="off" @keyup.enter.native="submitForm('modifyForm')"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="78px" prop="checkPassword">
            <el-input type="password" v-model="modifyForm.checkPassword" auto-complete="off" @keyup.enter.native="submitForm('modifyForm')"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="modifyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('modifyForm')">确 定</el-button>
    </div>
    </el-dialog>
  </main>
</template>


<style scoped>
.addAdminBtn {
  margin-top: 8px;
}
.el-table {
  margin-top: 40px;
}
.el-table>>>.el-table__header th {
  text-align: center;
}
</style>

<script>
export default {
  data() {
    var checkAddPassword = (rule, value, callback) => {
      if (value !== this.addAdminForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkModifyPassword = (rule, value, callback) => {
      if (value !== this.modifyForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      addAdminFormVisible: false,
      addAdminForm: {
        id: "",
        password: "",
        checkPassword: ""
      },
      addAdminFormRules: {
        id: [
          { required: true, message: "请输入管理员帐号", trigger: "blur" },
          { min: 3, max: 18, message: "管理员帐号的长度为3-12个字符" }
        ],
        password: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
          { min: 3, max: 18, message: "管理员密码的长度为3-12个字符" }
        ],
        checkPassword: [
          { required: true, message: "请再次输入管理员密码", trigger: "blur" },
          { validator: checkAddPassword, trigger: "blur" }
        ]
      },
      modifyFormVisible: false,
      modifyForm: {
        id: "",
        oldPassword: "",
        password: "",
        checkPassword: ""
      },
      modifyFormRules: {
        oldPassword: [
          { required: true, message: "请输入原来的密码", trigger: "blur" },
          { min: 3, max: 18, message: "管理员帐号的长度为3-12个字符" }
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 18, message: "管理员密码的长度为3-12个字符" }
        ],
        checkPassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: checkModifyPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      this.modifyFormVisible = true;
      this.modifyForm.id = row.id;
    },
    handleDelete(index, row) {
      this.$confirm("确认要删除该管理员帐号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (row.id == this.$store.state.adminInfo.id) {
            this.$notify.error({
              title: "失败",
              message: "无法删除自己的帐号",
              offset: 100
            });
          } else {
            this.$ajax
              .delete("admin/adminList", {
                data: {
                  id: row.id
                }
              })
              .then(response => {
                if (response.data.success) {
                  this.$notify.success({
                    title: "成功",
                    message: response.data.message,
                    offset: 100
                  });
                  let index = this.$store.state.adminList.findIndex(admin => {
                    return admin.id == row.id;
                  });
                  this.$store.state.adminList.splice(index, 1);
                } else {
                  this.$notify.error({
                    title: "失败",
                    message: response.data.message,
                    offset: 100
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(() => {
          this.$notify.warning({
            title: "提示",
            message: "已取消删除",
            offset: 100
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "modifyForm") {
            this.$ajax
              .post("admin/modify", {
                id: this.modifyForm.id,
                oldPassword: this.modifyForm.oldPassword,
                password: this.modifyForm.password
              })
              .then(response => {
                if (response.data.success) {
                  this.$notify.success({
                    title: "成功",
                    message: response.data.message,
                    offset: 100
                  });
                  this.modifyFormVisible = false;
                  this.resetForm("modifyForm");
                } else {
                  this.$notify.error({
                    title: "失败",
                    message: response.data.message,
                    offset: 100
                  });
                }
              })
              .catch(err => {
                console.log(err);
                if (err.response.status == 401) {
                  this.$alert("登录状态已失效，请重新登录", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {
                      this.$router.push({ path: "/" });
                    }
                  });
                }
              });
          } else if (formName == "addAdminForm") {
            this.$ajax
              .post("admin/signup", {
                id: this.addAdminForm.id,
                password: this.addAdminForm.password
              })
              .then(response => {
                if (response.data.success) {
                  this.$notify.success({
                    title: "成功",
                    message: response.data.message,
                    offset: 100
                  });
                  this.adminList.push({
                    id: this.addAdminForm.id,
                    level: 1
                  });
                  this.addAdminFormVisible = false;
                  this.resetForm("addAdminForm");
                } else {
                  this.$notify.error({
                    title: "失败",
                    message: response.data.message,
                    offset: 100
                  });
                }
              })
              .catch(err => {
                console.log(err);
                if (err.response.status == 401) {
                  this.$alert("登录状态已失效，请重新登录", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {
                      this.$router.push({ path: "/" });
                    }
                  });
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted: function() {
    this.$ajax
      .get("admin/adminList")
      .then(response => {
        if (response.data.success) {
          this.$store.state.adminList = response.data.adminList;
        }
      })
      .catch(err => {
        if (err.response.status == 401) {
          this.$alert("登录状态已失效，请重新登录", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.$router.push({ path: "/" });
            }
          });
        }
      });
  },
  computed: {
    adminList() {
      return this.$store.state.adminList;
    }
  }
};
</script>
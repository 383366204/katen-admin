<template>
    <main>
    <el-row>
        <el-col :span="22" :offset="1">
    <el-table
    border
    :data="messageList"
    style="width: 100%">
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.name | prettyData}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="手机"
      width="300">
      <template slot-scope="scope">
        <span>{{ scope.row.phone | prettyData}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="邮箱"
      width="300">
      <template slot-scope="scope">
        <span>{{ scope.row.email | prettyData}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="qq"
      width="200">
      <template slot-scope="scope">
        <span>{{ scope.row.qq | prettyData}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="留言"
      width="563">
      <template slot-scope="scope">
        <span>{{ scope.row.message | prettyData }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <div class="Pagination">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="limit"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
    </div>

  </el-col>
  </el-row>
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
.Pagination{
  margin-top: 50px;
}
</style>

<script>
export default {
  data() {
    return {
      messageList: [],
      limit: 12,
      total: 100,
      currentPage: 1,
    };
  },
  methods: {
    handleCurrentChange(val) {
        this.currentPage = val;
        this.loadProductData();
    },
    loadProductData(){
    let params={
        limit: this.limit,
        currentPage: this.currentPage
    }
    this.$ajax.get('/message',{params:params})
      .then(response=>{
          if (response.data.success) {
            this.messageList = response.data.message;
            this.total = response.data.total;
          }
      })
    },
    handleDelete(index, row){
       this.$confirm('此操作将删除该留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.$ajax.delete('/message',{
            data:{
              _id:row._id
            }
          })
        })
        .then(response=>{
          if (response.data.success) {
            this.$notify({
              title: "成功",
              message: response.data.message,
              offset: 100,
              type: "success"
            })
            this.messageList.splice(index, 1);
            this.total--;
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }
  },
  mounted:function(){
      this.loadProductData();
  },
  filters:{
    prettyData:(value) => {
      if (!value) {
        return '无';
      }
      else{
        return value;
      }
    }
  }
};
</script>

<template>
    <main>
        <el-row>
            <el-col :span="8" :offset="15">
                <el-input placeholder="请输入要搜索的内容，为空时加载全部数据" v-model="searchFilter" class="input-with-select">
                    <el-select v-model="selectFilter" slot="prepend" placeholder="搜索条件">
                      <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="loadOrderList()"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="23">
                <el-table
                :data="tableData"
                size="medium"
                :row-class-name="tableRowClassName"
                style="width: 100%">
                <el-table-column
                label="序号"
                type="index"
                width="80">
                </el-table-column>
                <el-table-column
                prop="_id"
                label="订单号"
                width="250">
                </el-table-column>
                
                <el-table-column
                label="订单状态"
                width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status | prettyStatus}}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                label="用户"
                width="250">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user.email||  scope.row.user.phone}}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                prop="price"
                label="金额"
                width="180">
                
                </el-table-column>

                <el-table-column
                label="日期"
                width="210">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date | prettyDate}}</span>
                </template>
                </el-table-column>
                
                <el-table-column
                label="备注"
                width="350">
                    <template slot-scope="scope">
                        <span>{{ scope.row.message|| '无'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="showProduct(scope.$index, scope.row)">商品</el-button>
                    <el-button
                    type="primary"
                    size="mini"
                    v-if="scope.row.status==2"
                    @click="sendProduct(scope.$index, scope.row)">发货</el-button>
                    <el-button
                    v-if="scope.row.status!=2"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
                
                </el-table>
            </el-col>
        </el-row>
        <el-row class="pagination">
            <el-pagination
                v-if="tableData.length != 0"
                background
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-size="limit"
                :total="total">
            </el-pagination>
        </el-row>

        <!-- 详情模态窗 -->
        <el-dialog
            title="订单商品"
            :visible.sync="productDialog"
            width="50%">
            <el-table :data="productsInfo">
                <el-table-column property="fullName" label="商品" width="320"></el-table-column>
                <el-table-column property="num" label="数量" width="200"></el-table-column>
                <el-table-column property="price" label="单价" width="200"></el-table-column>
                <el-table-column property="sumPrice" label="总价" width="200"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="productDialog = false">关 闭</el-button>
            </span>
        </el-dialog>
    </main>
</template>

<script>
export default {
  data() {
    return {
        tableData: [],
        currentPage:1,
        limit:12,
        total:0,
        searchFilter:'',
        selectFilter:'_id',
        selectOptions:[
        {value:'_id',label:'订单号'},
        {value:'status',label:'订单状态'},
        {value:'user',label:'用户账号'},       
      ],
      productDialog:false,
      productsInfo: []
    };
  },
  methods: {
    showProduct(index, row) {
        this.productsInfo = [];   
        row.products.forEach(value => {
            let productInfo = {};
            productInfo.num  = value.num;
            productInfo.fullName = value.product.grand + value.product.category + value.product.name;
            productInfo.price = value.product.price;
            productInfo.sumPrice = value.num*value.product.price;
            this.productsInfo.push(productInfo);
        });
        this.productDialog = true;
    },
    sendProduct(index, row){
        this.$confirm('确认要发货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.$ajax.put('order/admin',{_id:row._id})
        })
        .then(response=>{
          if (response.data.success) {
            this.$notify({
              title: "成功",
              message: response.data.message,
              offset: 100,
              type: "success"
            })
            this.loadOrderList();
          }
        })
        .catch(err=>{
          console.log(err);
        })
    },
    handleDelete(index, row) {
        this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.$ajax.delete('order/admin',{
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
            this.loadOrderList();
          }
        })
        .catch(err=>{
          console.log(err);
        })
    },
    loadOrderList(){
        let params={
            limit: this.limit,
            currentPage: this.currentPage,
            searchFilter:this.searchFilter,
            selectFilter:this.selectFilter
        }
        this.$ajax.get('/order/admin',{params:params})
        .then(response=>{
            if (response.data.success) {
                console.log(response.data);
                this.tableData = response.data.order;
                this.total = response.data.total
            }else{
                this.tableData = [];
                this.total = 0;
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
    tableRowClassName({row, rowIndex}) {
        if (row.status === 1) {
          return 'not-pay';
        } else if (row.status === 2) {
          return 'not-send';
        }
        else if (row.status === 3) {
          return 'not-get';
        }
        else if (row.status === 4) {
          return 'finish';
        }
        return '';
    },
    handleCurrentChange(val){
        this.currentPage = val;
        this.loadOrderList();
    }
  },
  mounted(){
      this.loadOrderList();
  },
  filters:{
    prettyDate(val) {
      let orderDate = new Date(val);
      return `${orderDate.getFullYear()}年${orderDate.getMonth() +
        1}月${orderDate.getDate()}日`;
    },
    prettyStatus(val) {
      let status = ["", "待付款", "待发货", "待收货", "已完成"];
      return status[val];
    }
  }
};
</script>

<style scoped>
.el-table>>> .el-table__header-wrapper th{
    text-align: center;
}

.el-table>>> .el-table__row.not-pay {
    background: #f4f4f4;
}
.el-table>>> .el-table__row.not-send {
    background: #fcf6eb;
}
.el-table>>> .el-table__row.not-get {
    background: #ecf5ff;
}
.el-table>>> .el-table__row.finish {
    background: #f0f9eb;
}
.pagination{
    margin-top:30px;
}
.input-with-select{
    margin: 10px 0px 20px 0px;
}
.input-with-select>>>.el-input-group__prepend {
  background-color: #fff;
  width: 80px;
}
</style>

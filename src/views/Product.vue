<template>
    <main>
        <el-row :gutter="20">
            <el-col :span="8" :offset="14">
                <el-input placeholder="请输入要查找的商品" v-model="searchFilter" class="input-with-select">
                    <el-select v-model="selectFilter" slot="prepend" placeholder="请选择">
                    <el-option label="商品类型" value="1"></el-option>
                    <el-option label="商品品牌" value="2"></el-option>
                    <el-option label="商品名称" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="addProductBtn" @click="addProductFormVisible=true">添加商品<i class="el-icon-plus el-icon--right"></i></el-button>
            </el-col>
        </el-row>
        <div class="table_container">
            <el-table
                :data="tableData"
                type='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.id"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="商品品牌">
                        <span>{{ props.row.grand }}</span>
                      </el-form-item>
                      <el-form-item label="商品类型">
                        <span>{{ props.row.category }}</span>
                      </el-form-item>
                      <el-form-item label="商品名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="商品特性">
                        <span>{{ props.row.tag }}</span>
                      </el-form-item>
                      <el-form-item label="商品尺寸">
                        <span>{{ props.row.size }}</span>
                      </el-form-item>
                      <el-form-item label="包装尺寸">
                        <span>{{ props.row.packageSize }}</span>
                      </el-form-item>
                      <el-form-item label="商品功率">
                        <span>{{ props.row.power }}</span>
                      </el-form-item>
                      <el-form-item label="商品重量">
                        <span>{{ props.row.weight }}</span>
                      </el-form-item>
                      <el-form-item label="商品价格">
                        <span>{{ props.row.price }}</span>
                      </el-form-item>
                      <el-form-item label="商品销量">
                        <span>{{ props.row.sales }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="商品类型"
                  prop="category">
                </el-table-column>
                <el-table-column
                  label="商品品牌"
                  prop="grand">
                </el-table-column>
                <el-table-column
                  label="商品名称"
                  prop="name">
                </el-table-column>
                <el-table-column label="操作" width="160">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>

            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>

            <el-dialog class="addDialog" title="添加商品" :visible.sync="addProductFormVisible" width="60%">
                <el-form :rules="addProductFormRules" :model="addProductForm" ref="addProductForm">
                    <el-form-item label="商品品牌" label-width="100px" prop="grand">
                        <el-input v-model="addProductForm.grand" auto-complete="off" placeholder="请填写商品的品牌"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" label-width="100px" prop="category">
	                    <el-select v-model="addProductForm.category" @change="handleSelect"  placeholder="请选择商品的分类">
                          <el-option
                            v-for="(item,index) in category"
                            :key="index"
                            :label="item"
                            :value="item">
                          </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称" label-width="100px" prop="name">
                        <el-input v-model="addProductForm.name" auto-complete="off"  placeholder="请填写商品的名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" label-width="100px" prop="price">
                        <el-input v-model.number="addProductForm.price"  placeholder="请填写商品的价格">
                          <template slot="append">￥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品尺寸" label-width="100px" prop="size">
                        <el-input v-model="addProductForm.size" placeholder="商品尺寸,格式如895x647x517">
                          <template slot="append">mm</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="包装尺寸" label-width="100px" prop="packageSize">
                        <el-input v-model="addProductForm.packageSize"  placeholder="包装尺寸,格式如965x700x577">
                          <template slot="append">mm</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品功率" label-width="100px" prop="power">
                        <el-input v-model.number="addProductForm.power" placeholder="请填写商品的功率">
                           <template slot="append">W</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" label-width="100px" prop="weight">
                        <el-input v-model.number="addProductForm.weight" placeholder="请填写商品的重量">
                          <template slot="append">kg</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品标签" label-width="100px" prop="tag">
                        <el-input v-model="addProductForm.tag" placeholder="请填写商品的标签，多个标签之间用'/'隔开"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片" label-width="100px">
                        <!-- <el-upload
                          class="avatar-uploader"
                          :action="uploadForm.url"
                          :headers="uploadForm.auth"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="addProductForm.imgUrl" :src="addProductForm.imgUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload> -->
                        <el-upload
                            name="productImg"
                            :data="addProductForm"
                            :limit=4
                            multiple
                            list-type="picture-card"
                            :on-exceed="handleExceed"
                            ref="upload"
                            :action="uploadForm.url"
                            :headers="uploadForm.auth"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-upload="beforeAvatarUpload"
                            :file-list="fileList"
                            :auto-upload="false">
                            <i slot="trigger" class="el-icon-plus"></i>
                            <div slot="tip" class="el-upload__tip">请将图片命名为 [数字.png] 的形式，1.png的将作为主图</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-row>
	                <el-table
                    :data="addProductForm.property"
                    style="margin-bottom: 20px;">
                      <el-table-column
                        prop="proName"
                        label="属性名">
                      </el-table-column>
                      <el-table-column
                        prop="proValue"
                        label="属性值">
                      </el-table-column>
                      <el-table-column label="操作" >
                      <template slot-scope="scope">
                        <el-button
                          size="small"
                          @click="editProperty(scope.$index)">编辑
                        </el-button>
                        <el-button
                          size="small"
                          type="danger"
                          @click="deleteProperty(scope.$index)">删除
                        </el-button>  
                      </template>
                      </el-table-column>
                  </el-table>
					        <el-button type="primary" @click="addProperty()" style="margin-bottom: 10px;">添加属性</el-button>
				        </el-row>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="addProductFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addProduct('addProductForm')">确 定</el-button>
                </div>
            </el-dialog>
            <!-- <el-dialog title="修改商品信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="商品品牌" label-width="100px">
                        <el-input v-model="selectTable.grand" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" label-width="100px">
	                    <el-select v-model="selectTable.category" :placeholder="selectMenu.label" @change="handleSelect">
						    <el-option
						      v-for="item in menuOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.index">
						    </el-option>
						</el-select>
                    </el-form-item>
                    <el-form-item label="商品名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品标签" label-width="100px">
                        <el-input v-model="selectTable.tag"></el-input>
                    </el-form-item>       
                    <el-form-item label="商品尺寸" label-width="100px">
                        <el-input v-model="selectTable.size"></el-input>
                    </el-form-item>
                    <el-form-item label="包装尺寸" label-width="100px">
                        <el-input v-model="selectTable.packageSize"></el-input>
                    </el-form-item>
                    <el-form-item label="商品功率" label-width="100px">
                        <el-input v-model="selectTable.power"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" label-width="100px">
                        <el-input v-model="selectTable.weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" label-width="100px">
                        <el-input v-model="selectTable.price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/food'"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.imgUrl" :src="baseImgPath + selectTable.imgUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-row style="overflow: auto; text-align: center;">
	                <el-table
				    :data="specs"
				    style="margin-bottom: 20px;"
				    :row-class-name="tableRowClassName">
					    <el-table-column
					      prop="proName"
					      label="属性名">
					    </el-table-column>
					    <el-table-column
					      prop="proValue"
					      label="属性值">
					    </el-table-column>
					    <el-table-column label="操作" >
					    <template slot-scope="scope"> 
					        <el-button
					          size="small"
					          type="danger"
					          @click="deleteProperty(scope.$index)">删除</el-button>
					    </template>
					    </el-table-column>
					</el-table>
					<el-button type="primary" @click="specsFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
				</el-row>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProduct">确 定</el-button>
              </div>
            </el-dialog> -->

            <!-- 属性模态窗 -->
            <el-dialog :title="propertyType[propertyTypeIndex]" :visible.sync="propertyFormVisible" width="30%" @close="propertyFormClose()">
              <el-form :rules="propertyFormRules" :model="propertyForm" ref="propertyForm">
                <el-form-item label="属性名" label-width="100px" prop="proName">
                  <el-input v-model="propertyForm.proName" auto-complete="off"></el-input>
                </el-form-item>
              <el-form-item label="属性值" label-width="100px" prop="proValue">
                <el-input v-model="propertyForm.proValue" auto-complete="off"></el-input>
              </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="propertyFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitProperty('propertyForm')">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </main>
</template>

<script>
// import headTop from '../components/headTop'
// import {baseUrl, baseImgPath} from '@/config/env'
// import {getFoods, getFoodsCount, getMenu, addProduct, deleteFood, getResturantDetail, getMenuById} from '@/api/getData'
export default {
  data() {
    return {
      addProductFormVisible: false,
      addProductForm: {
        grand: "华帝",
        category: "抽油烟机",
        name: "CXW-228",
        tag: "T型机/自动清洗",
        size: "895x647x517",
        packageSize: "965x700x577",
        power: 250,
        weight: 24,
        price: 3600,
        property: []
      },
      addProductFormRules: {
        grand: [{ required: true, message: "请输入商品品牌", trigger: "blur" }],
        category: [
          { required: true, message: "请选择商品的类型", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入商品的名称", trigger: "blur" }],
        tag: [
          {pattern:/^[^/].+(\/.+)?[^/]$/, message:"请输入正确的商品标签，若有多个标签请用 ' / ' 隔开",trigger:"blur"}
        ],
        size: [
          { required: true, message: "请输入商品的尺寸", trigger: "blur" },
          { pattern:/^\d+x\d+x\d+$/, message: "请输入正确的商品尺寸", trigger: "blur" }
        ],
        packageSize: [
          { required: true, message: "请输入商品的包装尺寸", trigger: "blur" },
          { pattern:/^\d+x\d+x\d+$/, message: "请输入正确的包装尺寸", trigger: "blur" }
        ],
        power: [
          {
            required: true,
            message: "请输入商品的功率",
            trigger: "blur"
          },{
            type:"number",
            message: "商品的功率需为数字",
            trigger: "blur"
          }
        ],
        weight: [
          {
            required: true,
            message: "请输入商品的重量",
            trigger: "blur"
          },
          {
            type:"number",
            message: "商品的重量需为数字",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入商品的价格",
            trigger: "blur"
          },
          {
            type:"number",
            message: "商品的价格需为数字",
            trigger: "blur"
          }
        ]
      },
      category: ["抽油烟机", "燃气灶", "消毒碗柜", "热水器"],
      searchFilter: "",
      selectFilter: "",
      uploadForm: {
        auth: { Authorization: this.$store.state.token },
        url: "http://127.0.0.1:4040/admin/product/img/"
      },

      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],

      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      dialogFormVisible: false,
      menuOptions: [],
      selectMenu: {},
      selectIndex: null,

      propertyTypeIndex: 0,
      propertyType: ["添加属性", "修改属性"],
      propertyForm: {
        proName: "",
        proValue: ""
      },
      propertyFormRules: {
        proName: [{ required: true, message: "请输入属性名", trigger: "blur" }],
        proValue: [{ required: true, message: "请输入属性值", trigger: "blur" }]
      },
      propertyFormVisible: false,
      editPropertyIndex: 0,
      expendRow: []
    };
  },
  created() {
    // this.initData();
  },
  computed: {
    // specs: function() {
    //   let specs = [];
    //   if (this.selectTable.specfoods) {
    //     this.selectTable.specfoods.forEach(item => {
    //       specs.push({
    //         specs: item.specs_name,
    //         packing_fee: item.packing_fee,
    //         price: item.price
    //       });
    //     });
    //   }
    //   return specs;
    // },
    tableData: function() {
      return this.$store.state.orderList;
    }
  },
  methods: {
    async initData() {
      try {
        const countData = await getFoodsCount({
          restaurant_id: this.restaurant_id
        });
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getFoods();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async getMenu() {
      this.menuOptions = [];
      try {
        const menu = await getMenu({
          restaurant_id: this.selectTable.restaurant_id,
          allMenu: true
        });
        menu.forEach((item, index) => {
          this.menuOptions.push({
            label: item.name,
            value: item.id,
            index
          });
        });
      } catch (err) {
        console.log("获取食品种类失败", err);
      }
    },
    async getFoods() {
      const Foods = await getFoods({
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      });
      this.tableData = [];
      Foods.forEach((item, index) => {
        const tableData = {};
        tableData.name = item.name;
        tableData.item_id = item.item_id;
        tableData.description = item.description;
        tableData.rating = item.rating;
        tableData.month_sales = item.month_sales;
        tableData.restaurant_id = item.restaurant_id;
        tableData.category_id = item.category_id;
        tableData.image_path = item.image_path;
        tableData.specfoods = item.specfoods;
        tableData.index = index;
        this.tableData.push(tableData);
      });
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    },
    submitProperty(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 若是添加属性
          if (this.propertyTypeIndex == 0) {
            // 判断是否有重复的属性名
            if (
              this.addProductForm.property.every(ele => {
                return ele.proName != this.propertyForm.proName;
              })
            ) {
              // 将属性push
              this.addProductForm.property.push(
                JSON.parse(JSON.stringify(this.propertyForm))
              );

              this.propertyFormVisible = false;
            } else {
              this.$notify.error({
                title: "错误",
                message: "不能有两个相同的属性名",
                offset: 100
              });
            }
          } else if (this.propertyTypeIndex == 1) {
            // 若是修改属性
            var notRepeat = true;
            this.addProductForm.property.forEach((value, i) => {
              if (
                i != this.editPropertyIndex &&
                value.proName == this.propertyForm.proName
              ) {
                notRepeat = false;
              }
            });
            if (notRepeat) {
              this.addProductForm.property[
                this.editPropertyIndex
              ].proName = this.propertyForm.proName;
              this.addProductForm.property[
                this.editPropertyIndex
              ].proValue = this.propertyForm.proValue;
              this.propertyFormVisible = false;
            } else {
              this.$notify.error({
                title: "错误",
                message: "不能有两个相同的属性名",
                offset: 100
              });
            }
          }
        } else {
          console.log("err submit");
        }
      });
    },
    addProperty() {
      this.propertyFormVisible = true;
      this.propertyTypeIndex = 0;
    },
    editProperty(index) {
      this.propertyTypeIndex = 1;
      this.editPropertyIndex = index;
      this.propertyFormVisible = true;
      this.propertyForm.proName = this.addProductForm.property[index].proName;
      this.propertyForm.proValue = this.addProductForm.property[index].proValue;
    },
    deleteProperty(index) {
      this.addProductForm.property.splice(index, 1);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // this.currentPage = val;
      // this.offset = (val - 1) * this.limit;
      // this.getFoods();
    },
    expand(row, status) {
      // if (status) {
      //   this.getSelectItemData(row);
      // } else {
      //   const index = this.expendRow.indexOf(row.index);
      //   this.expendRow.splice(index, 1);
      // }
    },
    handleEdit(row) {
      this.getSelectItemData(row, "edit");
      this.dialogFormVisible = true;
    },
    async getSelectItemData(row, type) {
      // const restaurant = await getResturantDetail(row.restaurant_id);
      // const category = await getMenuById(row.category_id);
      // this.selectTable = {
      //   ...row,
      //   ...{
      //     restaurant_name: restaurant.name,
      //     restaurant_address: restaurant.address,
      //     category_name: category.name
      //   }
      // };

      // this.selectMenu = { label: category.name, value: row.category_id };
      // this.tableData.splice(row.index, 1, { ...this.selectTable });
      // this.$nextTick(() => {
      //   this.expendRow.push(row.index);
      // });
      // if (type == "edit" && this.restaurant_id != row.restaurant_id) {
      //   this.getMenu();
      // }
    },
    handleSelect(index) {
      // this.selectIndex = index;
      // this.selectMenu = this.menuOptions[index];
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteFood(row.item_id);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "删除食品成功"
          });
          this.tableData.splice(index, 1);
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: err.message
        });
        console.log("删除食品失败");
      }
    },
    handleServiceAvatarScucess(res, file) {
      if (res.status == 1) {
        this.selectTable.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    addProduct(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let addProductData = JSON.parse(JSON.stringify(this.addProductForm));
          addProductData.tag = addProductData.tag.split("/");
          this.$ajax
            .post("/product/", addProductData)
            .then(response => {
              if (response.data.success) {
                this.$refs.upload.submit();
                // this.$notify({
                //   title: "成功",
                //   message: response.data.message,
                //   offset: 100,
                //   type: "success"
                // });
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
        }else{
          console.log("err submit");
        }
      });
    },
    submitUpload() {
      console.log(this);
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file.response);
    },
    handleExceed(files, fileList) {
      this.$notify.error({
        title: "错误",
        message: "每个商品只能最多上传" + fileList.length + "张图片",
        offset: 100
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    propertyFormClose() {
      this.resetForm("propertyForm");
    }
  }
};
</script>

<style scoped>
.el-row {
  margin: 10px;
}
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand>>>.el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 31.5%;
  float: left;
}

.demo-table-expand>>>label {
  color: #99a9bf;
  text-align: center;
  float: left;
  margin-left: 38%;
}
.demo-table-expand>>>.el-form-item__content {
  float: left;
}
.el-select>>>.el-input {
  width: 130px;
}
.input-with-select>>>.el-input-group__prepend {
  background-color: #fff;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader {
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.el-table>>>.el-table__header th {
  text-align: center;
}
.addDialog .el-form-item:nth-child(-n + 8) {
  width: 50%;
  float: left;
}
.addDialog .el-form-item:nth-child(9) {
  clear: both;
}
.addDialog .el-form-item>>>.el-select {
  width: 100%;
}
.addDialog .el-form-item>>>.el-input {
  width: 100%;
}
</style>

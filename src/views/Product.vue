<template>
    <main>
        <el-row>
            <el-col :span="8" :offset="14">
                <el-input placeholder="请输入要搜索的内容" v-model="searchFilter" class="input-with-select">
                    <el-select v-model="selectFilter" slot="prepend" placeholder="搜索条件">
                      <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="loadProductData()"></el-button>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" class="addProductBtn" @click="addProductFormVisible=true;addFileList = []">添加商品<i class="el-icon-plus el-icon--right"></i></el-button>
            </el-col>
        </el-row>
        <div class="table_container">
            <el-table
                :data="tableData"
                type='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.name"
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
                        <span>{{ props.row.tag | prettyTag }}</span>
                      </el-form-item>
                      <el-form-item label="商品尺寸">
                        <span>{{ props.row.size }}mm</span>
                      </el-form-item>
                      <el-form-item label="包装尺寸">
                        <span>{{ props.row.packageSize }}mm</span>
                      </el-form-item>
                      <el-form-item label="商品功率">
                        <span>{{ props.row.power }}W</span>
                      </el-form-item>
                      <el-form-item label="商品重量">
                        <span>{{ props.row.weight }}kg</span>
                      </el-form-item>
                      <el-form-item label="商品价格">
                        <span>￥{{ props.row.price }}</span>
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
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="limit"
                  layout="total, prev, pager, next"
                  :total="total">
                </el-pagination>
            </div>

            <!-- 添加商品模态窗 -->
            <el-dialog class="addDialog" title="添加商品" :visible.sync="addProductFormVisible" width="60%">
                <el-form :rules="productFormRules" :model="addProductForm" ref="addProductForm">
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
                        <el-upload
                            name="productImg"
                            accept="image/*"
                            :data="addProductForm"
                            :limit=4
                            list-type="picture-card"
                            :on-exceed="handleExceed"
                            :on-change="imgChange"
                            ref="upload"
                            :action="uploadForm.url"
                            :headers="uploadForm.auth"
                            :on-preview="handlePreview"
                            :file-list="addFileList"
                            :auto-upload="false">
                            <i slot="trigger" class="el-icon-plus"></i>
                            <div slot="tip" class="el-upload__tip">第一张将作为主图</div>
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

            <!-- 编辑商品模态窗 -->
            <el-dialog class="addDialog" title="编辑商品" :visible.sync="editProductFormVisible" width="60%" @close="resetForm('editProductForm')">
                <el-form :rules="productFormRules" :model="editProductForm" ref="editProductForm">
                    <el-form-item label="商品品牌" label-width="100px" prop="grand">
                        <el-input v-model="editProductForm.grand" auto-complete="off" placeholder="请填写商品的品牌"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" label-width="100px" prop="category">
	                    <el-select v-model="editProductForm.category" @change="handleSelect"  placeholder="请选择商品的分类">
                          <el-option
                            v-for="(item,index) in category"
                            :key="index"
                            :label="item"
                            :value="item">
                          </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称" label-width="100px" prop="name">
                        <el-input v-model="editProductForm.name" auto-complete="off"  placeholder="请填写商品的名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" label-width="100px" prop="price">
                        <el-input v-model.number="editProductForm.price"  placeholder="请填写商品的价格">
                          <template slot="append">￥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品尺寸" label-width="100px" prop="size">
                        <el-input v-model="editProductForm.size" placeholder="商品尺寸,格式如895x647x517">
                          <template slot="append">mm</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="包装尺寸" label-width="100px" prop="packageSize">
                        <el-input v-model="editProductForm.packageSize"  placeholder="包装尺寸,格式如965x700x577">
                          <template slot="append">mm</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品功率" label-width="100px" prop="power">
                        <el-input v-model.number="editProductForm.power" placeholder="请填写商品的功率">
                           <template slot="append">W</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" label-width="100px" prop="weight">
                        <el-input v-model.number="editProductForm.weight" placeholder="请填写商品的重量">
                          <template slot="append">kg</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品标签" label-width="100px" prop="tag">
                        <el-input v-model="editProductForm.tag" placeholder="请填写商品的标签，多个标签之间用'/'隔开"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片" label-width="100px">
                        <el-upload
                            name="productImg"
                            accept="image/*"
                            :data="editProductForm"
                            :limit=4
                            list-type="picture-card"
                            :on-exceed="handleExceed"
                            :on-change="imgChange"
                            :action="uploadForm.url"
                            :headers="uploadForm.auth"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="editFileList">
                            <i slot="trigger" class="el-icon-plus"></i>
                            <div slot="tip" class="el-upload__tip">第一张将作为主图</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-row>
	                <el-table
                    :data="editProductForm.property"
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
                  <el-button @click="editProductFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="editProduct('editProductForm')">确 定</el-button>
                </div>
            </el-dialog>

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
export default {
  data() {
    return {
      addProductFormVisible: false,
      addProductForm: {
        grand: "",
        category: "",
        name: "",
        tag: "",
        size: "",
        packageSize: "",
        power: null,
        weight: null,
        price: null,
        property: []
      },
      editProductFormVisible: false,
      editProductForm: {
        oldName:"",
        grand: "",
        category: "",
        name: "",
        tag: "",
        size: "",
        packageSize: "",
        power: 0,
        weight: 0,
        price: 0,
        property: []
      },
      editProductName:'',
      productFormRules: {
        grand: [{ required: true, message: "请输入商品品牌", trigger: "blur" }],
        category: [
          { required: true, message: "请选择商品的类型", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入商品的名称", trigger: "blur" }
        ],
        tag: [
          {
            pattern: /^[^/].+(\/.+)?[^/]$/,
            message: "请输入正确的商品标签，若有多个标签请用 ' / ' 隔开",
            trigger: "blur"
          }
        ],
        size: [
          { required: true, message: "请输入商品的尺寸", trigger: "blur" },
          {
            pattern: /^\d+x\d+x\d+$/,
            message: "请输入正确的商品尺寸",
            trigger: "blur"
          }
        ],
        packageSize: [
          { required: true, message: "请输入商品的包装尺寸", trigger: "blur" },
          {
            pattern: /^\d+x\d+x\d+$/,
            message: "请输入正确的包装尺寸",
            trigger: "blur"
          }
        ],
        power: [
          {
            required: true,
            message: "请输入商品的功率",
            trigger: "blur"
          },
          {
            type: "number",
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
            type: "number",
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
            type: "number",
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
        url: this.$store.state.baseUrl+"admin/product/img/"
      },

      addFileList: [],
      editFileList:[],

      limit: 12,
      total: 100,
      currentPage: 1,

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
      expendRow: [],
      productList:[],
      selectOptions:[
        {value:'',label:'搜索条件'},
        {value:'grand',label:'商品品牌'},
        {value:'category',label:'商品类型'},
        {value:'name',label:'商品名称'},
        {value:'tag',label:'商品标签'},
        {value:'property',label:'商品属性'}
      ]
    };
  },
  created() {
    this.loadProductData();
  },
  computed: {
    tableData: function() {
      return this.productList;
    }
  },
  methods: {
    loadProductData() {
      let params={
        limit: this.limit,
        currentPage: this.currentPage,
        searchFilter:this.searchFilter,
        selectFilter:this.selectFilter
      }
      this.$ajax.get('admin/product',{params:params})
      .then(response=>{
        if (response.data.success) {       
          this.productList = response.data.product;
          this.total = response.data.total;
        }
      })
      .catch(err=>{
        console.log(err);
      })
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
          // 判断是新增还是修改
          let form = this.addProductFormVisible?this.addProductForm:this.editProductForm;
          // 若是添加属性
          if (this.propertyTypeIndex == 0) {
            // 判断是否有重复的属性名
            if (
              form.property.every(ele => {
                return ele.proName != this.propertyForm.proName;
              })
            ) {
              // 将属性push
              form.property.push(
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
            form.property.forEach((value, i) => {
              if (
                i != this.editPropertyIndex &&
                value.proName == this.propertyForm.proName
              ) {
                notRepeat = false;
              }
            });
            if (notRepeat) {
              form.property[
                this.editPropertyIndex
              ].proName = this.propertyForm.proName;
              form.property[
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

      // 判断是新增还是修改
      let form = this.addProductFormVisible?this.addProductForm:this.editProductForm;

      this.propertyForm.proName = form.property[index].proName;
      this.propertyForm.proValue = form.property[index].proValue;
    },
    deleteProperty(index) {
      // 判断是新增还是修改
      let form = this.addProductFormVisible?this.addProductForm:this.editProductForm;
      form.property.splice(index, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadProductData();
    },
    handleEdit(row) {
      // 显示模态框
      this.editProductFormVisible = true;

      // 赋值
      this.editProductForm.oldName = row.name;
      this.editProductForm.grand = row.grand;
      this.editProductForm.category = row.category;
      this.editProductForm.name = row.name;
      this.editProductForm.tag = row.tag.join('/');
      this.editProductForm.size = row.size;
      this.editProductForm.packageSize = row.packageSize;
      this.editProductForm.power = row.power;
      this.editProductForm.weight = row.weight;
      this.editProductForm.price = row.price;
      this.editProductForm.property = row.property;

      this.$ajax.get('admin/product/img',{params:{name:this.editProductForm.name}})
      .then(response=>{
        if (response.data.success) {
          response.data.fileList.forEach((value,index) => {
            this.editFileList.push({
              name:value,
              url:this.$store.state.baseUrl+'productPic/'+this.editProductForm.name+'/'+value
            })
          })
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
    handleSelect(index) {
      // this.selectIndex = index;
      // this.selectMenu = this.menuOptions[index];
    },
    handleDelete(index, row) {
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.$ajax.delete('admin/product',{
            data:{
              name:row.name
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
            this.tableData.splice(index, 1);
            this.loadProductData();
          }
        })
        .catch(err=>{
          console.log(err);
        })
    },
    handleServiceAvatarScucess(res, file) {
      if (res.status == 1) {
        this.selectTable.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    imgChange(file,fileList){
      let isImgReg = /(.jpg|.png)$/;
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isImgReg.test(file.name)) {
        this.$notify.error({
          title: "错误",
          message: "商品图片后缀只能是 .jpg 或 .png 格式",
          offset: 100
        });
        fileList.pop();
      }
      else if (!isLt4M) {
        this.$notify.error({
          title: "错误",
          message: "商品图片大小不能超过 4MB",
          offset: 100
        });
        fileList.pop();
      }else{
        console.log(file,fileList);
      }
    },
    addProduct(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let addProductData = JSON.parse(JSON.stringify(this.addProductForm));
          addProductData.tag = addProductData.tag.split("/");
          this.$ajax
            .post("admin/product", addProductData)
            .then(response => {
              if (response.data.success) {
                this.$refs.upload.submit();
                this.addProductFormVisible = false;
                this.$notify({
                  title: "成功",
                  message: response.data.message,
                  offset: 100,
                  type: "success"
                });
                this.loadProductData();
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
            this.resetForm(formName);
        } else {
          console.log("err submit");
        }
      });
    },
    editProduct(formName){
       this.$refs[formName].validate(valid => {
        if (valid) {
          let editProductData = JSON.parse(JSON.stringify(this.editProductForm));
          editProductData.tag = editProductData.tag.split("/");
          this.$ajax
            .put("admin/product", editProductData)
            .then(response => {
              if (response.data.success) {
                this.editProductFormVisible = false;

                let updateIndex = this.productList.findIndex((product) => {
                  return product.name == this.editProductForm.oldName;  
                })
                this.productList[updateIndex] = response.data.product;
                this.$notify({
                  title: "成功",
                  message: response.data.message,
                  offset: 100,
                  type: "success"
                });
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
        } else {
          console.log("err submit");
        }
      });
    },
    submitUpload() {
      console.log(this);
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      this.$ajax.delete('admin/product/img',{
        data:{
          name:this.editProductForm.name,
          fileName:file.name
        }
      })
      .then(response=>{
        if (response.data.success) {
          this.$notify({
            title: "成功",
            message: response.data.message,
            offset: 100,
            type: "success"
          })
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$notify.error({
        title: "错误",
        message: "每个商品只能最多上传4张图片",
        offset: 100
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.addFileList=[];
      if (!this.editProductFormVisible) {
        this.editFileList=[];
      }
    },
    propertyFormClose() {
      this.resetForm("propertyForm");
    }
  },
  filters:{
    prettyTag:(value) => {
      return value.join(' / ');
    }
  }
};
</script>

<style scoped>
.el-row {
  margin: 10px 0px 10px 0px;
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
  padding:20px;
}
.Pagination {
  margin-top: 22px;
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

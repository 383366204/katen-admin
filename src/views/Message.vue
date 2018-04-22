<template>
      <el-row type="flex" justify="center" align="middle" class="msg">
        <el-col :span="12">

            <el-upload
                :limit=5
                list-type="picture-card"
                :on-exceed="handleExceed"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <i slot="trigger" class="el-icon-plus"></i>
                
                <div slot="tip" class="el-upload__tip">上传的第一张为主图，其他为简介图</div>
            </el-upload>
            <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-col>
      </el-row>
</template>

<script>
export default {
  data() {
    return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    };
  },
  methods: {
    submitUpload() {
        console.log(this);
        this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
    console.log(file, fileList);
    },
    handlePreview(file) {
    console.log(file);
    },
    handleExceed(files,fileList){
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    }
  }
};
</script>

<style scoped>
  
</style>

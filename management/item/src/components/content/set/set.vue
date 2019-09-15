<template>
  <div class="set">
      <p>姓名: {{from.user_name}}</p>
      <p>注册时间:{{from.create_time}}</p>
      <p>管理员权限:{{from.admin}}</p>
      <p>管理员ID:{{from.id}}</p>
       <p>更换头象:
         <!-- <el-upload
            class="avatar-uploader"
            action="http://cangdu.org:8001/v1/addimg/shop"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <img :src="'http://cangdu.org:8001/img/' +  form.image_path" v-else alt="" class="avatar">
          </el-upload> -->


      </p>

  </div>
</template>

<script>
export default {
  data(){
    return{
      form:[],
      imageUrl:'',
     
    }
  },
    mounted(){
       this.$axios({
        url:
          "http://cangdu.org:8001/admin/info",
        methods: "get"
      }).then(res => {
        this.from = res.data.data
          console.log(this.from)
     
      
      });
    },
    methods:{
       //上传图片
    // handleAvatarSuccess(res, file) {
     
    //   this.imageUrl = URL.createObjectURL(file.raw);
    //   this.imageUrl1=res.name
    //  console.log(this.imageUrl1);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
    }
}
</script>

<style>
.set{
  width: 500px;
  height: 300px;
  background: #f5f5f5;
  padding: 10px 20px;
  margin: auto;

}
</style>

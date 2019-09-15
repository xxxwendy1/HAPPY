<template>
  <div class="shopList">
    <!--  -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="expand">
        <!--   -->
        <template  slot-scope="props">
          <el-form  label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.recent_order_num }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="name"></el-table-column>
      <el-table-column label="店铺地址" prop="address"></el-table-column>
      <el-table-column label="店铺介绍" prop="description"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button size="mini">
            <router-link :to="'/addFood/' + props.row.id" tag="span">添加食品</router-link>
          </el-button>
          <el-button size="mini"   @click="handleEdit(props.$index, props.row ,dialogFormVisible = true)">编辑</el-button>                                                                                
          <el-button :plain="true" size="mini"  @click="open">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="店铺名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
   
    <el-form-item label="详细地址" :label-width="formLabelWidth">
      <el-select v-model="form.address" placeholder="请选择"  >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.label"
          :value="item.value">
        </el-option>
  </el-select>

    </el-form-item>
     <el-form-item label="店铺介绍" :label-width="formLabelWidth">
      <el-input v-model="form.description" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="店铺分类" :label-width="formLabelWidth">
      <el-input v-model="form.category" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="店铺图片" :label-width="formLabelWidth">
         <el-upload
          class="avatar-uploader"
          action="http://cangdu.org:8001/v1/addimg/shop"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img :src="imageUrl" class="avatar"  v-if="imageUrl">
          <img :src="'http://cangdu.org:8001/img/' +  form.image_path" v-else alt="" class="avatar">
          <i ></i>
        </el-upload>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="shopSubmit()">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
//http://cangdu.org:8001/shopping/v2/restaurant/category    分类
//http://cangdu.org:8001/v1/cities?type=guess
//http://cangdu.org:8001/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0&limit=20
import _prot from "../port/port";
export default {
  data() {
    return {
      shopdata: [],
      userList:[],
      // options:[],//详细地址
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {

        name: '',
        address:'',//地址
        description:"",//介绍
        delivery: false,
        type: [],
        phone: '',
        category: '',//分类
        image_path:''
      },
      formLabelWidth: '120px',
        imageUrl: '',//图
        imageUrl1: null,
        
      
    };
  },
  mounted() {
    _prot.shopadress().then(res => {
      console.log(res.data)
      this.shopdata = {
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        offset: 0,
        limit: 20
      };
      // console.log(this.shopdata)
      this.shopL()
      
    });
  },
    methods:{
      shopL(){
        _prot.shoplist(this.shopdata).then(res => {
              this.userList = res.data;
              // console.log(this.userList);
            });
      },
      handleEdit(id,row ){
        this.form=row
        console.log(id+'=====')
        this.shopSubmit(id,row)
      },
       //删除
      open() {
        this.$message.error("您权限不足");
      },
      //图片
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl1 = file.response.image_path 
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //获取详细地址    http://cangdu.org:8001/v1/pois?type=search&city_id=3&keyword=

      //提交
      //  form: {

      //   name: '',
      //   address:'',//地址
      //   description:"",//介绍
      //   delivery: false,
      //   type: [],
      //   phone: '',
      //   category: '',//分类
      //   image_path:''
      // },
      shopSubmit(id,row){
        console.log(row)
        var Smt = {
          id:id,
          name: form.name,
          address:form.address,//地址
          description:form.description,//介绍
          phone: form.phone,
          category: form.category,//分类
          image_path:form.image_path,
          rating:form.rating,
          recent_order_num:form.recent_order_num
        }
        console.log(Smt,form.name)
          this.dialogFormVisible = false
           _prot.shopSubmited().then(res => {
              this.userList = res.data;
              console.log(res);
            });
      }    
    }

}

</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
/* 图 */

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } 
</style>

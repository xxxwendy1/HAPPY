<template>
  <div class="addshop">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="店铺名称">
        <el-input v-model="ruleForm.name"  ></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="region">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="ruleForm.address"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
        <br>
        当前城市:{{this.newCitys.name}}
      </el-form-item>
      <el-form-item label="联系电话" prop="number">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>

      <el-form-item label="店铺简介" prop="intro">
        <el-input v-model="ruleForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语" prop="slogan">
        <el-input v-model="ruleForm.slogan"></el-input>
      </el-form-item>

      <el-form-item label="店铺分类"  >
       
        <el-cascader  v-model="ruleForm.types" :options="options"></el-cascader>
      </el-form-item>
      <el-form-item label="店铺特点">
        品牌保证 &nbsp;&nbsp;
        <el-switch v-model="ruleForm.point.Band1"></el-switch>&nbsp;&nbsp;
        蜂鸟专送 &nbsp;&nbsp;
        <el-switch v-model="ruleForm.point.Band2"></el-switch>&nbsp;&nbsp;
        新开店铺 &nbsp;&nbsp;
        <el-switch v-model="ruleForm.point.Band3"></el-switch>&nbsp;&nbsp;
        <br>外卖保 &nbsp;&nbsp;
        <el-switch v-model="ruleForm.point.Band4"></el-switch>&nbsp;&nbsp;
        准时送达 &nbsp;&nbsp;
        <el-switch v-model="ruleForm.point.Band5"></el-switch>&nbsp;&nbsp;
        开发票 &nbsp;&nbsp;
        <el-switch v-model="ruleForm.point.Band6"></el-switch>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input-number v-model="ruleForm.num1"></el-input-number>
      </el-form-item>
      <el-form-item label="起价送">
        <el-input-number v-model="ruleForm.num2"></el-input-number>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-select
          placeholder="起始时间"
          v-model="ruleForm.startTime"
          :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
          }"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="ruleForm.endTime"
          :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: ruleForm.startTime
          }"
        ></el-time-select>
      </el-form-item>

      <el-form-item label="上传头像" >
          <el-upload
          class="avatar-uploader"
          action="http://cangdu.org:8001/v1/addimg/shop"
         list-type="picture-card"
          :on-success="handlePictureCardPreview"
          :before-upload="handleRemove">
          <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="上传营业执照" >
          <el-upload
          class="avatar-uploader"
          action="http://cangdu.org:8001/v1/addimg/shop"
          list-type="picture-card"
          :on-success="handlePictureCardPreview2"
          :before-upload="handleRemove">
          <img v-if="dialogImageUrl2" :src="dialogImageUrl2" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="上传商店营业证" >
          <el-upload
          class="avatar-uploader"
          action="http://cangdu.org:8001/v1/addimg/shop"
          list-type="picture-card"
          :show-file-list="false"
          :on-success="handlePictureCardPreview3"
          :before-upload="handleRemove">
          <img v-if="dialogImageUrl3" :src="dialogImageUrl3" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="优惠活动" >
        <el-select  placeholder="满减优惠" v-model="tableDataYou" @change="open" >
          <el-option
            v-for="item in ruleForm.actives"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>


       <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="活动标题"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.value }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="活动名称"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="活动详情"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table><br><br><br><br><br><br>
    <el-button type="primary" @click="openShop">添加商铺</el-button>

  </div>
</template>
<script>
import _port from "../port/port";
export default {
  data() {
    return {
      newCitys: "",
      //判断输入内容不能为空
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        number: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择地址", trigger: "change" }]
      }, 
      //上传图片
        // dialogImageUrl1: "",
        dialogImageUrl2: "",
        dialogImageUrl3: "",
        dialogVisible: false,
        options: [], //分类
        //上传头像
        image_path:'',
        dialogImageUrl: '',
        dialogVisible: false,


      ruleForm: {
        name: "", //商店名字
        address: "", //地址
        newCity: "",
        restaurants: [], //
        number: "", //电话
        intro: "", //简介
        slogan: "", //标语
        
        //分类
        point: {
          Band1: true,
          Band2: true,
          Band3: true,
          Band4: true,
          Band5: true,
          Band6: true
        },

        num1: 5, //配送费
        num2: 10, //起价费
        types:'',//店铺分类

        //营业时间
        startTime: "",
        endTime: "",
      
        //优惠活动
        actives: [
          {
            value: 'jian',
            label: "满减优惠",
            title: "减"
          },
          {
            value: 'you',
            label: "优惠大酬宾",
            title: "优"
          },
          {
            value: 'xin',
            label: "新用户立减",
            title: "新"
          },
          {
            value: 'juan',
            label: "进店领劵",
            title: "卷"
          }
        ],
      },
      tableData: [
        {
          value: '减',
          name: '减满优惠',
          address: '满30减4'
        }
      ],
      tableDataYou:'满减优惠'
    }
  },
  mounted() {

    //当前城市
    _port.newCity().then(res => {
      this.newCitys = res.data;
      // console.log(this.newCitys)
    });
    //商品分类
    _port.addShop().then(res => {
      // console.log(res)
      let arr1 = res.data.map((item, key) => {
        return {
          value: item.id,
          label: item.name,
          children: item.sub_categories.map((ite, key) => {
            return {
              value: ite.id,
              label: ite.name
            };
          })
        };
      });
      this.options = arr1;
        // console.log(this.options)
    });

    this.openShop()
  },

  methods: {  
    //上传图片
     handleRemove(file, fileList) {
        console.log(file, fileList,"图片一 ");
      },
      handlePictureCardPreview(file) {
       
        this.dialogImageUrl = file.image_path;
        this.dialogVisible = true;
           console.log(this.dialogImageUrl , " 图片二")
      },
       handlePictureCardPreview2(file) {
        console.log(file , " 图片二")
        this.dialogImageUrl2 = file.image_path;
        this.dialogVisible = true;  
      },
       handlePictureCardPreview3(file) {
        console.log(file , " 图片二")
        this.dialogImageUrl3 = file.image_path;
        this.dialogVisible = true;  
      },

    querySearch(queryString, cb) {
      // { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
      let arrdata = []
      if(queryString){
        _port.newdress({
          val: queryString,
          id: this.newCitys.id
        })
        .then(res => {  
          arrdata = res.data.map( item => {
            return {
                value:item.name,
                address:item.address
              }
            })
         })
        
        setTimeout(() => {
          // console.log(arrdata)
          cb(arrdata);
        }, 1000);
      }
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
  
    handleSelect(item) {
      // console.log(item, "详细弟弟之");
    },
    handleIconClick(ev) {
      // console.log(ev);
    },
    //模态框
    open() {
        this.$prompt('请输入活动详情', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          this.$message({
            type: 'success',
            message: '内容是: ' + value

          });
          	let newObj = {};
		          	switch(this.tableDataYou){
		          		case '满减优惠':
		          			newObj= {
                      date: '减',
                      name: '减满优惠',
                      address: value
		          			
		          			}
		          			break;
		          		case '优惠大酬宾':
		          			newObj= {
		          				date: '特',
                      name: '优惠大酬宾',
                      address: value
		          			}
		          			break;
		          		case '新用户立减':
		          			newObj= {
		          				date: '新',
                      name: '新用户立减',
                      address: value
		          			}
		          			break;
		          		case '进店领券':
		          			newObj= {
		          				date: '领',
                      name: '进店领券',
                      address: value
		          			}
		          			break;
		          	}
                this.tableData.push(newObj);
                console.log(this.tableData)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
    //优惠大酬宾添加



    //优惠大酬宾  删除
      handleDelete(index, row) {

        console.log(index, row);
      },
//提交商铺
  //  options: [], //分类
  //     ruleForm: {
  //       name: "", //商店名字
  //       address: "", //地址
  //       newCity: "",
  //       restaurants: [], //
  //       number: "", //电话
  //       intro: "", //简介
  //       slogan: "", //标语
       
  //       //分类
  //       point: {
  //         Band1: true,
  //         Band2: true,
  //         Band3: true,
  //         Band4: true,
  //         Band5: true,
  //         Band6: true
  //       },

  //       num1: 5, //配送费
  //       num2: 10, //起价费
  //       // types:[],//店铺分类

  //       //营业时间
  //       startTime: "",
  //       endTime: "",
// {name: "Wendy", address: "北京市昌平区南环东路36号", latitude: 40.21267, longitude: 116.247455, description: "精品",…}




      openShop(){
        var obj ={
         
            activities: this.tableData,
            address: this.ruleForm.address,
            bao: true,
            business_license_image: this.dialogImageUrl,
            category: "快餐便当/简餐",
            catering_service_license_image: this.dialogImageUrl2,
            delivery_mode: true,
            description: this.ruleForm.intro,
            endTime: "13:15",
            float_delivery_fee: 5,
            float_minimum_order_amount: 20,
            image_path: this.dialogImageUrl3,
            is_premium: true,
            latitude: 40.21267,
            longitude: 116.247455,
            name:this.ruleForm.name,
            new: true,
            phone: this.ruleForm.number,
            piao: true,
            promotion_info: this.ruleForm.slogan,
            startTime: "05:45",
            zhun: true,
        }
        console.log(obj+'====>'+this.dialogImageUrl)

        _port.openShop(obj).then(res => {

          if(res.data.status==1){
            alert(res.data.sussess)
          }
          console.log(res.data)
        })
      }
  }
};
</script>
<style scoped>
.addshop {
  width: 60%;
  /* border: 1px solid red; */
  margin-left: 10%;
}
</style>
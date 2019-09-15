<template>
	<div class="addfood">
		 <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="食品种类">
            <el-select v-model="form.checkType" placeholder="请选择活动区域"   label-width="360px"	>
              <el-option
               	v-for="item in foodTypes"
                :label="item.name"
                :value="item.id"
				:key="item.value"	
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-collapse-transition>
          <div v-show="isshow">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="食品种类">
                <el-input v-model="form.aType"></el-input>
              </el-form-item>
              <el-form-item label="食品描述">
                <el-input v-model="form.foodDecs"></el-input>
              </el-form-item>
			  <el-form-item label="">
                <el-button type="primary"  @click="submit()">提交食品</el-button>
              </el-form-item>
            </el-form>  
          </div>
        </el-collapse-transition>
      </div>
      <div class="food">
        <el-button @click="isshow = !isshow" type="text" >添加食品种类</el-button>
      </div>
    </el-card>		
	<!-- ______________________________ -->

	<el-card class="box-card" shadow="always">
      <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="食品名称" :span='5' prop="foodName">
            <el-input v-model="form.foodName"></el-input>
          </el-form-item>
          <el-form-item label="食品活动">
            <el-input v-model="form.foodActive"></el-input>
          </el-form-item>
          <el-form-item label="食品详情">
            <el-input v-model="form.foodDesc"></el-input>
          </el-form-item>

          <el-form-item label="上传餐饮服务许可证">
			<el-upload
				class="avatar-uploader"
				action="http://cangdu.org:8001/v1/addimg/food"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
          </el-form-item>

          <el-form-item label="食品特点">
            <el-select v-model="form.foodPoint" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> 
          </el-form-item>

          <el-form-item label="食品特点">
			  <!--  @change="cRadio()"-->
            <el-radio-group v-model="radio" >
              <el-radio :label="1">单规格</el-radio>
              <el-radio :label="2">多规格</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- -->
          <div v-show="aRadio" >
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="d" label="规格" width="100px">
              </el-table-column>

              <el-table-column prop="f" label="包装费" width="100px">
              </el-table-column>

              <el-table-column prop="fs" label="价格" width="100px"> </el-table-column>
              <el-table-column  label="操作" width="100px"> 
                <el-button type="primary" size="mini">删除</el-button>
              </el-table-column>
            </el-table>
          </div>

          <el-form-item label="包装费">
            <el-input-number
              v-model="Fee1"
              :min="0"
              label="描述文字"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="价格">
            <el-input-number
              v-model="Fee2"
              :min="0"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="addFood()">添加食品</el-button>
    </el-card> 

	</div>
</template>

<script>
import _port from '../port/port'
export default {
	data(){
		return {
			aRadio:false,
			isshow: false, 
			radio:'',
			form: {
				checkType: "", //选择食品类型
				aType: "", //选择食品种类
				foodDecs: "", //选择食品描述
				foodName: "",
				foodActive: "",
				foodDesc: "",
				foodPoint: "" //食品特点
			},
			foodTypes:[],
			Fee1:0,
			Fee2:20,
			//图片
			imageUrl:'',
			imageUrl1:'',
			rules: {
				foodName: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				]
			},
			//食物特点
			 options: [{
				value: '新品	',
				label: '新品'
				}, {
				value: '招牌',
				label: '招牌'
				}],
			tableData: [
				{
				d:"默认",
				f:5,
				fs:20
				}
			],
			category_id:2332,
			radio:true

		}	 
	},
	mounted(){
		this.foodName()
	},
	methods:{
		//图片
	   handleAvatarSuccess(res, file) {
		this.imageUrl = URL.createObjectURL(file.raw); 
		this.imageUrl1=res.image_path
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

		foodName(){
			console.log('Wendy')
			_port.foodName().then(res =>{
				console.log(res)
				if(res.data.status==1){
					this.foodTypes=res.data.category_list
				}	
			})	
		},
		//提交
		submit(){
			console.log('hsausah')
			_port.submit().then(res =>{
				console.log(res)

				if(res.data.status	==1){
					alert('添加成功')
					this.isshow=false
				}	
			})
		},
		//添加食品\
		// foodName: "",
		// foodActive: "",
		// foodDesc: "",
		// 		foodPoint: "" 
		// 		activity: "在"
		// attributes: ["新"]
		// category_id: 2319
		// description: "干啥"
		// image_path: "16b49bea63744562.jpg"
		// name: "我"
		// restaurant_id: 7
		// specs: [{specs: "默认", packing_fee: 0, price: 20}]
		// {activity: "惹人", attributes: [{value: "新品	", label: "新品"}, {value: "招牌", label: "招牌"}],…}
// activity: "惹人"
// attributes: [{value: "新品	", label: "新品"}, {value: "招牌", label: "招牌"}]
// description: "二"
// image_path: "16b5386dfa345693.jpg"
// name: "微软头发的"
// restaurant_id: 1
// specs: [{d: "默认", f: 5, fs: 20}]
	addFood(){

			var add={	
				activity: this.form.foodActive,
				category_id: this.category_id,
				attributes:this. options,
				description: this.form.foodDesc,
				image_path: this.imageUrl1,
				name: this.form.foodName,
				restaurant_id: 4,
				specs: this.tableData,	
			}
			console.log(this.form.foodActive)
			_port.addFood(add).then(res => {
				if(res.data.status==1){
					alert(res.data.success)
				}
		
			})
		}
	}
}
</script>

<style>
.addfood{
	width: 70%;
	margin: 0 auto;
}
.box-card{
	margin-bottom: 50px;
}
.food{
	text-align: center;
}
.avatar{
	zoom: 40%;
}
</style>

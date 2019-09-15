<template>
  <div class="foot">
    <el-table :data="foodlist" style="width: 100%" @expand-change="doLayout">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ shopname }}</span>
            </el-form-item>
            <el-form-item label="食品 ID">
              <span>{{ props.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="餐厅 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{address }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.lei }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.month_sales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="食品名称" prop="name"></el-table-column>
      <el-table-column label="食品介绍" prop="description"></el-table-column>
      <el-table-column label="评分" prop="rating"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row,dialogFormVisible = true)"
          >编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改 -->
    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="食品名称">
          <el-input v-model="formLabelAlign.input1"></el-input>
        </el-form-item>
        <el-form-item label="食品介绍">
          <el-input v-model="formLabelAlign.input2"></el-input>
        </el-form-item>

        <el-form-item label="食品分类">
          <el-select v-model="formLabelAlign.selectedOptions3" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
     
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="规格" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包装费" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <el-button type="text" @click="openBox1()">添加规格</el-button>

     <!-- <template slot-scope="scope"> -->
      <div  class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="makeSure1()">确 定</el-button>
      </div>
     <!-- </template>  -->

    </el-dialog>

        <el-dialog title="添加规格" :visible.sync="dialogFormVisible1">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="*规格">
          <el-input v-model="spec"></el-input>
        </el-form-item>

        <el-form-item label="包装费">
          <el-input-number
            v-model="num1"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="价格">
          <el-input-number
            v-model="num2"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="makeSure2()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="alldata">
</el-pagination> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      queDing:[],
      val:1,
      alldata: [], //总数居
      foodlist: [],
      address: "",
      Cname: "",
      aId: null,
      shopname: "", //商品名字
      nameAddress: '',
      dialogFormVisible: false,
      dialogFormVisible1:false,
      formLabelAlign: {
        input1: "",
        input2: "",
        input3: "",
        selectedOptions3: ""
      },
      //规格
       labelPosition: "right",

      spec: "",
      num1: 0,
      num2: 0,


      options: [],
      //上传图片
      imageUrl: "",
      imageUrl1: "",
      //表格
      tableData: [
        {
          date: "默认",
          name: "2",
          price: "2"
        }
      ],
      id: null
    };
  },
  mounted() {
    this.allData();
    this.handleCurrentChange()
    this.foodList();
    
    // this.addressName()
  },
  methods: {
    ///获取总数居
    allData() {
      this.$axios({
        url:
          "http://cangdu.org:8001/shopping/v2/foods/count?restaurant_id=undefined",
        mothod: "get"
      }).then(res => {
        this.alldata = res.data.count;
        // console.log(this.alldata)
      });
    },
     handleCurrentChange(val) {
      // console.log(val)
      // 改变默认的页数
      this.val = val;
      // console.log(val);
      this.foodList();
    },
    //
    foodList() {
      this.$axios({
        url: "http://cangdu.org:8001/shopping/v2/foods?offset=" +(this.val -1) *20 +"&limit=20&restaurant_id=undefined",
        mothod: "get"
      }).then(res => {
        this.foodlist = res.data;
        // console.log(this.foodlist)
      });
    },
    
    //  地址和名称  http://cangdu.org:8001/shopping/v2/menu/3258
    doLayout(row, expandedRows) {
      //点击展开触发的事件，第一个参数时当点击的数据，第二个参数是所有展开的数据
      console.log(row.restaurant_id);
      // console.log(expandedRows)
     
      this.$axios({
        url: `http://cangdu.org:8001/shopping/restaurant/${row.restaurant_id}`,
        mothod: "get"
      }).then(res => {

        this.nameAddress = res.data;
        console.log(this.nameAddress);
        this.shopname =  this.nameAddress.name
        this.address = this.nameAddress.address
        console.log(this.shopname,this.address)
      });
    },

    //上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl1=res.name
     console.log(this.imageUrl1);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //编辑  http://cangdu.org:8001/shopping/v2/menu?restaurant_id=3269&allMenu=true
    //http://cangdu.org:8001/shopping/restaurant/1
    handleEdit(index, row) {
      console.log(row)
       this.queDing=row
      // console.log(index, row);
      let id = row.restaurant_id;
      // this.formLabelAlign.input1 = row.name;
      // this.formLabelAlign.input2 = row.description;
      // console.log(id);

      //食品分类接口
      this.$axios({
        url: `http://cangdu.org:8001/shopping/v2/menu?restaurant_id=${id}&allMenu=true`,
        mothod: "get"
      }).then(res => {
        // console.log(res);
         this.options=res.data
      });
    

    },
    // 添加规格
 
     openBox1(row) {
       console.log(row)
      this.dialogFormVisible1 = true;
     this.makeSure2()
    
     },
     makeSure2(){
         this.dialogFormVisible1 = false;
        console.log(this.spec)
        this.tableData.push({
            date:this.spec,
            name:this.num1,
            price:this.num2      
        })
        console.log(this.tableData)
     },
        //  参数
        // category_id	2308
        // category_name	面条🍜
        // description	asfewqeqeq
        // image_path	16b2858563f41836.jpg
        // index	0
        // item_id	3045
        // month_sales	317
        // name	feweqeq
        // new_category_id	2308
        // rating	4.7
        // restaurant_address	广东省广州市越秀区中山五路219号华联购物中心F1
        // restaurant_id	1
        // restaurant_name	效果演示
        // specfoods	[…]
        //     0	{…}
        //     _id	5cf4ef2dbede5d271928ff70
        //     checkout_mode	1
        //     food_id	13614
        //     is_essential	false
        //     item_id	3035
        //     name	嗷嗷嗷
        //     original_price	0
        //     packing_fee	1
        //     pinyin_name	
        //     price	20
        //     promotion_stock	-1
        //     recent_popularity	501
        //     recent_rating	2
        //     restaurant_id	3382
        //     sku_id	13616
        //     sold_out	false
        //     specs	[]
        //     specs_name	默认
        //     stock	1000
        // specs	[…]
        //     0	{…}
        //     packing_fee	1
        //     price	20
        //     specs	默认
        //     1	{…}
        //     packing_fee	0
        //     price	20
        //     specs	好的
     makeSure1(){
       console.log(this.queDing.category_id)

      //  console.log(row)



        var footAA={
          category_id	:this.queDing.category_id,
          category_name	: this.formLabelAlign.input1,
          description:this.formLabelAlign.input3,
          image_path:this.imageUrl1,
          index:this.queDing.index,
          item_id:this.queDing.item_id,
          month_sales	:this.queDing.month_sales,
          name	:this.queDing.name,
        new_category_id	:this.queDing.new_category_id,
        rating:this.queDing.rating,
        restaurant_address:	'广东省广州市越秀区中山五路219号华联购物中心F1',
        restaurant_id	:this.queDing.restaurant_id,
        restaurant_name	:this.formLabelAlign.selectedOptions3,
      

        // index	0
        // item_id	3045

        // month_sales	317
        // name	feweqeq
        // new_category_id	2308
        // rating	4.7
        // restaurant_address	广东省广州市越秀区中山五路219号华联购物中心F1
        // restaurant_id	1
        // restaurant_name	效果演示


          // name:this.formLabelAlign.input1,
          // category_id: 	2308,
          // address:this.formLabelAlign.input2,
          // category:this.formLabelAlign.selectedOptions3,
          // description:this.formLabelAlign.input3,
          // image_path:this.imageUrl1,
          // category_name:formLabelAlign.selectedOptions3,
        }  
        // console.log(footAA. category_name+"dsmflds")  

        this.$axios({
        url: `https://elm.cangdu.org/shopping/v2/updatefood`,
        mothod: "post",
        data:{
          category_id:this.queDing.category_id,
           category_name	: this.formLabelAlign.input1,
          description:this.formLabelAlign.input3,
          image_path:this.imageUrl1,
          index:this.queDing.index,
          item_id:this.queDing.item_id,
          month_sales	:this.queDing.month_sales,
          name	:this.queDing.name,
        new_category_id	:this.queDing.new_category_id,
        rating:this.queDing.rating,
        restaurant_address:	'广东省广州市越秀区中山五路219号华联购物中心F1',
        restaurant_id	:this.queDing.restaurant_id,
        restaurant_name	:this.formLabelAlign.selectedOptions3,
        }
        
      }).then(res => {
          console.log(res)
          this.dialogFormVisible = false;

      }
       );
     },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
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
.el-table .success-row {
  background: #f0f9eb;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

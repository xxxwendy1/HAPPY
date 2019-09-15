<template>

  <el-table
  
    :data="mydata"
    style="width: 100%"
	@expand-change="doLayout"
	>
    <el-table-column type="expand" >
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" >
          <el-form-item label="用户名">
            <span>{{ props.row.order_time }}</span>
          </el-form-item>
          <el-form-item label="店铺名称">
            <span>{{ props.row.restaurant_name }}</span>
          </el-form-item>
          <el-form-item label="收获地址">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.address_id }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="订单 ID"
      prop="address_id">
    </el-table-column>
    <el-table-column
      label="总价格"
      prop="total_amount">
    </el-table-column>
    <el-table-column
      label="订单状态"
      prop="status_bar.title">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
	data(){
		return {
			 id:null,
			mydata:[]
		}
	},
	mounted(){
		this.ding()
	},
	methods:{
		//http://cangdu.org:8001/bos/orders/count?restaurant_id=undefined
		ding() {
			// console.log('获取')
			this.$axios.get(`http://cangdu.org:8001/bos/orders?offset=0&limit=20&restaurant_id=undefined`)
				.then(res => {
				this.mydata = res.data;
				console.log(this.mydata)
				});
		},
		doLayout(){ //http://cangdu.org:8001/shopping/restaurant/3284
			// console.log(props)
			// props.row.address_id
			this.$axios.get(`http://cangdu.org:8001/shopping/restaurant/3284`)
				.then(res => {
				
				console.log(res)
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
</style>


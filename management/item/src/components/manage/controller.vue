
<template>
  <div>
    <el-table  :data="mydata" border highlight-current-row style="width: 100%">
      <el-table-column type="index" class="tab"></el-table-column>
      <el-table-column property="user_name" label="姓名" class="tab"></el-table-column>
      <el-table-column property="create_time" label="注册日期" class="tab"></el-table-column>
      <el-table-column property="city" label="地址" class="tab"></el-table-column>
      <el-table-column property="admin" label="权限" class="tab"></el-table-column>
    </el-table>
    <div class="aaaa">
      <span>共{{alldata}}页</span>
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="alldata"
        ></el-pagination>
    </div>
   
  </div>
</template>

<script>
//  http://cangdu.org:8001//all?offset=0&limit=20

export default {
  data() {
    return {
      val: 1,
      limit: 10,
      mydata: [],
      alldata: 0 //总数居
    };
  },
  mounted() {
    // console.log("获取");
   
    ///获取总数居
    this.$axios({
      url: "http://cangdu.org:8001/admin/count",
      mothod: "get"
    }).then(res => {
      this.alldata = res.data.count;
      console.log(this.alldata);
    }); 
    
    //获取用户数据
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios.get(//http://cangdu.org:8001/admin/all?offset=0&limit=20
          "http://cangdu.org:8001/admin/all?offset=" +(this.val - 1) * 20 +"&limit=20"
        ).then(res => {
          this.mydata = res.data.data;
          console.log(this.mydata)
        });
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.val = val;
      console.log(val);
      this.getdata();
    }
  }
};
</script>

<style>
.tab {
  text-align: center;
}
.aaaa{
  display: flex;
}
</style>

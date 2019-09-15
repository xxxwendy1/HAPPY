<template>
  <div>
    <el-table  :data="mydata" border highlight-current-row style="width: 100%">
      <el-table-column type="index" class="tab"></el-table-column>
      <el-table-column property="registe_time" label="日期" class="tab"></el-table-column>
      <el-table-column property="username" label="姓名" class="tab"></el-table-column>
      <el-table-column property="city" label="地址" class="tab"></el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="alldata"
    ></el-pagination>
  </div>
</template>

<script>
//http://cangdu.org:8001/v1/users/list?offset=0&limit=20
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
    //获取用户数据
    this.getdata();
    ///获取总数居
    this.$axios({
      url: "http://cangdu.org:8001/v1/users/count",
      mothod: "get"
    }).then(res => {
      this.alldata = res.data.count;
      // console.log(this.alldata);
    });
  },
  methods: {
    getdata() {
      this.$axios
        .get(
          "http://cangdu.org:8001/v1/users/list?offset=" +(this.val - 1) * 10 + "&limit=10"
        )
        .then(res => {
          this.mydata = res.data;
        });
    },
    handleCurrentChange(val) {
      // console.log(val)
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
</style>

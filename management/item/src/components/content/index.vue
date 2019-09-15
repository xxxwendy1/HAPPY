<template>
  <div class="content">
    <h1 class="cont1">数据统计</h1>
    <div class="one">
      <div class="one_o">当日数据:</div>
      <div class="one_o">{{this.dayuser[6]}}新增用户</div>
      <div class="one_o">{{this.oderData[6]}}新增订单</div>
      <div class="one_o">{{this.adminData[6]}}新增管理员</div>
    </div>
    <div class="two">
      <div class="one_o">总数据:</div>
      <div class="one_o">{{alluser}}注册用户</div>
      <div class="one_o">{{allorder}}订单</div>
      <div class="one_o">{{alladmin}}管理员</div>
    </div>

    <Chart  
          :mydata="this.userData" 
          :dayuser="this.dayuser"
          :oderData="this.oderData"
          :adminData="this.adminData"
    ></Chart>

    <!-- <div id="myChart" :style="{widthwidth: '1000px', height: '500px', }"></div> -->
  </div>
</template>

<script>
//http://cangdu.org:8001/statis/user/2019-06-05/count
//http://cangdu.org:8001/statis/admin/2019-06-02/count
// http://cangdu.org:8001/statis/order/2019-06-03/count

//今日数据
// http://cangdu.org:8001/statis/user/2019-06-05/count  新增用户
// http://cangdu.org:8001/statis/order/2019-06-05/count  新增订单
// http://cangdu.org:8001/statis/admin/2019-06-05/count  新增管理员
//总数据
// http://cangdu.org:8001/v1/users/count    注册用户
// http://cangdu.org:8001/bos/orders/count  订单
// http://cangdu.org:8001/v1/users/count    管理员

import Chart from "./chart";
import moment from  'moment';
export default {
  data() {
    return {
      user: "",
      order: "",
      admin: "",

      alluser: "",
      allorder: "",
      alladmin: "",

      userData:[],//7天的时间
      senven:[],
      getData:[],//当天时间

      dayuser:[],
      oderData: [],
      adminData:[],
      todayTime:null,//当天时间
      sevenDate: [[],[],[]],
    };
  },
  components: {
    Chart
  },
  
  methods:{
      async DayData(){
        // var aa =JSON.parse(this.senven)
    //  console.log(this.userData,'____________');
          for ( var i = 0; i <this.userData.length; i++){
          
                await   this.$axios.get('http://cangdu.org:8001/statis/user/'+this.userData[i]+'/count').then(res=>{
                        this.dayuser.push(res.data.count)
                        // console.log(res.data.count,"------->>>"+this.userData[i]);
                    })     
                await   this.$axios.get('http://cangdu.org:8001/statis/order/'+this.userData[i]+'/count').then(res=>{
                      this.oderData.push(res.data.count)
                    // console.log(this.oderData);
                       
                })  
                await   this.$axios.get('http://cangdu.org:8001/statis/admin/'+this.userData[i]+'/count').then(res=>{
                        this.adminData.push(res.data.count)
                        // console.log(this.adminData);
                       
                    })
          }
          
            
      },

      momentTime() {
      //获取时间
        // var aa = moment().format('YYYY-MM-DD');
        // this.getData.push(aa)
        // this.todayTime=aa


        for(var i = 0; i<7; i++ ){
            this.userData.unshift(
            moment()    
                .subtract(i, "days")
                .format("YYYY-MM-DD")
            )
        } 
  },
  },
  mounted() {
    this.momentTime()
    this.DayData()
    
    this.$axios({
      //新增用户
      url: `http://cangdu.org:8001/statis/user/${this.todayTime}/count`,
      method: "get"
    }).then(res => {
      this.user = res.data.count;
    //   console.log(this.user);
    });

    this.$axios({
      //新增用户
      url: `http://cangdu.org:8001/statis/order/${this.todayTime}/count`,
      method: "get"
    }).then(res => {
      this.order = res.data.count;
    //   console.log(this.order);
    });

    this.$axios({
      //新增管理员
      url: `http://cangdu.org:8001/statis/admin/${this.todayTime}/count`,
      method: "get"
    }).then(res => {
      this.admin = res.data.count;
    //   console.log(this.admin);
    });

    this.$axios({
      //注册用户
      url: "http://cangdu.org:8001/v1/users/count ",
      method: "get"
    }).then(res => {
      this.alluser = res.data.count;
    //   console.log(this.alluser);
    });

    this.$axios({
      //订单
      url: "http://cangdu.org:8001/bos/orders/count",
      method: "get"
    }).then(res => {
      this.allorder = res.data.count;
    //   console.log(this.allorder);
    });

    this.$axios({
      //管理员
      url: "http://cangdu.org:8001/v1/users/count ",
      method: "get"
    }).then(res => {
      this.alladmin = res.data.count;
    //   console.log(this.alladmin);
    });

    //走势图
    // this.$axios({
    //   //管理员
    //   url: `http://cangdu.org:8001/statis/order/${this.todayTime}/count`,
    //   method: "post"
    // }).then(res => {
    //   this.dayData = res;
    //   console.log(res+"sss");
    // });
  }
};
</script>

<style>
.cont1 {
  text-align: center;
  font-size: 30px;
  margin:0 0 30px 0;
}
.one,
.two {
  width: 100%;
  text-align: center;
  color: #666666;
  margin-bottom: 10px;
  height: 35px;
 
}
.two{
    padding-bottom: 50px; 
}
.one_o {
  height: 35px;
  width: 14%;
  line-height: 35px;
  float: left;
  border-radius: 4px;
  margin-left: 30px;
  background: #e5e9f2;
}
.one .one_o:nth-of-type(1) {
  background: #ff9800;
  color: white;
  font-size: 25px;
}
.two .one_o:nth-of-type(1) {
  color: white;
  font-size: 25px;
  background: #20a0ef;
}
</style>

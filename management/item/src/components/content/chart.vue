<template>
  <div>
    <div id="myChart" :style="{width: '1000px', height: '500px', }"></div>
    <!-- <div>{{this.adminData}}</div>
    <div>{{this.oderData}}</div>
    <div>{{this.adminData}}</div> -->
  </div>
</template>

<script>
export default {
  props: ["mydata", "adminData", "oderData", "dayuser"],

  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      console.log(this.dayuser);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "走势图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新注册用户", "新增订单", "新增管理员"]
        },
        grid: {
          top: "5%",
          left: "10%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox:{
          show:true,//是否显示工具栏组件。
          feature:{//各工具配置项。
            dataZoom:{   //数据区域缩放。目前只支持直角坐标系的缩放
              yAxisIndex:'none'//指定哪些 yAxis 被控制
            },
            //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
            dataView:{readOnly:false},//是否不可编辑（只读）。
            // 动态类型切换
            magicType:{type:['bar','line']},//启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）。
            restore:{},//配置项还原。
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.mydata
        },
        yAxis: {
          type: "value",
          data: [0, 50, 100, 150, 200]
        },
        series: [
          {
            name: "新注册用户",
            type: "line",
            stack: "总量",
            data: this.dayuser,
            data: this.dayuser.length>0?this.dayuser:null
          },
          {
            name: "新增订单",
            type: "line",
            stack: "总量",
            data:this.oderData.length>0?this.oderData:null
            
          },
          {
            name: "新增管理员",
            type: "line",
            stack: "总量",
            data: this.adminData.length>0?this.adminData:null
          }
        ],
     
      });
    }
  }
};
</script>

<style>
</style>

<template>
  <div id="Hell">
    <!-- <el-container>
      <div  class="l">
        <el-col > 
           <Slide ></Slide>
        </el-col>
      </div>

       <el-container>
        <el-header class="header">
          <Top></Top>
        </el-header>
          <el-main>
          <router-view/>
        </el-main>
       
      </el-container> 
       
    </el-container> -->



    <el-container style="height: 950px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(84,92,100)">
      <Slide></Slide>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
     <Top></Top>
    </el-header>
    
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>


  </div>
</template>
  
<script>
import Top from "./top/index";
// import Content from "./content/index";
import Slide from "./slide/index";
export default {
  name: "HelloWorld",
  data() {
    const item = {
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  },
  components: {
    Top,
    Slide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  >
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

</style>

<template>
<div>
    <el-dropdown style="font-size: 12px">
      <div>首页</div>
      <img src="http://cangdu.org:8001/img/16b2646bdfc41771.png" class="avator"  style="display:inlineBlock;"  >
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Con" ><router-Link to="/manage">首页</router-Link></el-dropdown-item>
            <el-dropdown-item command="signout" @click="singout()" > 退出 </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown> 
</div>


</template>

<script>
export default {
  mouted(){

  },
  methods:{
    singout(){
      console.log('退出')
        this.$axios({
        url:'http://cangdu.org:8001/admin/singout',
        method:'get',
      }).then(res => {

          if(res.status==1){
            alert(res.success)
          }
      })
    }
   	
  }
};
</script>

<style>
.avator{
  zoom: 20%;
}
</style>

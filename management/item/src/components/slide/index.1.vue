<template>
  <!-- @open="handleOpen"
    @close="handleClose" -->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <i class="el-icon-setting"></i>
      <span slot="title">
        <router-link to="/manage" tag="span">首页</router-link>
      </span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">   
          <router-link to="/manage/userList" tag="span">用户列表</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link to="/manage/shopList" tag="span">商家列表</router-link>
        </el-menu-item>
        <el-menu-item index="1-3">
          <router-link to="/manage/foodList" tag="span">食品列表</router-link>
        </el-menu-item>
        <el-menu-item index="1-4">
          <router-link to="/manage/orderList" tag="span">订单列表</router-link>
        </el-menu-item>
        <el-menu-item index="1-5">
          <router-link to="/manage/adminList" tag="span">管理员列表</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>添加数据</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">
          <router-link to="/addShop" tag="span">添加商铺</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link to="/addFood/null" tag="span">添加商品</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>图表</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">
          <router-link to="/visitor" tag="span">图表</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>

        <span>编辑</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">
          <router-link to="/vueEdit" tag="span">文本编辑</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>设置</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1">
          <router-link to="/" tag="span">管理员设置</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-location"></i>

        <span>说明</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="6-1">
          <router-link to="/" tag="span">说明</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {};
</script>

<style>
</style>

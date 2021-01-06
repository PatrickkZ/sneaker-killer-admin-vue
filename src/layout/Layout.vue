<template>
  <el-container>
    <el-header>
<!--      <nav-bar></nav-bar>-->
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
      <side-bar></side-bar>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/admin/Header";
// import NavBar from "@/layout/components/NavBar";
import SideBar from "@/layout/components/SideBar";
export default {
  name: "Layout",
  components: {
    Header,
    SideBar
  }
}
</script>

<style scoped>
/*.el-header {*/
/*  background-color: #B3C0D1;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 60px;*/
/*}*/

/*.el-aside {*/
/*  background-color: #D3DCE6;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 200px;*/
/*}*/

/*.el-main {*/
/*  background-color: #E9EEF3;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 160px;*/
/*}*/
/*.el-container{*/
/*  position: absolute;*/
/*  width: 100%;*/
/*  top: 0px ;*/
/*  left: 0 ;*/
/*  bottom: 0;*/
/*}*/
.el-header{
  padding: 0;
  z-index: 1000;
}
/*!*header菜单需要靠右的添加.fr即可(如：<el-menu-item class="fr" index="3">消息中心</el-menu-item>)*!*/
/*.el-header .fr{*/
/*  float: right;*/
/*}*/
/*.el-header .el-menu{*/
/*  border-bottom: none;*/
/*}*/
.el-aside, .el-main{
  padding-top: 0px;
}
/*!*.el-aside{*!*/
/*!*  background: #545c64;*!*/
/*!*}*!*/
.el-aside .el-menu{
  border-right: none;
}
</style>

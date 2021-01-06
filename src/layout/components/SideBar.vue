<template>
    <el-menu
        default-active=""
        router
        class="el-menu-vertical-demo"
        active-text-color="#ffd04b">
      <div v-for="(item,i) in adminMenus" :key="i">
        <div v-if="item.nameZh==='用户管理'">
          <el-submenu :index="i+''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.nameZh }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/student">
                <i class="el-icon-document"></i>
                <span slot="title">学生用户</span>
              </el-menu-item>
              <el-menu-item index="/admin/user">
                <i class="el-icon-document"></i>
                <span slot="title">后台用户</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :index="item.route" :key="i">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.nameZh}}</span>
          </el-menu-item>
        </div>
      </div>
<!--      <el-menu-item v-for="(item,i) in adminMenus" :index="item.route" :key="i">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">{{item.nameZh}}</span>-->
<!--      </el-menu-item>-->
    </el-menu>
</template>

<script>
export default {
  name: "SideBar",
  computed: {
    adminMenus () {
      return this.$store.state.adminMenus
    }
  }
}
</script>

<style scoped>

</style>

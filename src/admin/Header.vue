<template>
  <div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible1"
        width="30%"
    append-to-body>
      <span>确定要退出吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="logout">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="修改密码"
        :visible.sync="dialogFormVisible2"
        append-to-body>
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item label="用户名" label-width="120px">
          <label>{{ this.$store.state.username }}</label>
        </el-form-item>
        <el-form-item label="原密码" label-width="120px">
          <el-input v-model="originPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px">
          <el-input v-model="resetPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120px" prop="gender">
          <el-input v-model="confirmPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="modifyMyPassword()">确 定</el-button>
      </div>
    </el-dialog>

  <el-card class="admin-header">
      <img src="../assets/sneaker.jpeg" alt="" width="40px" style="float: left;margin-top: -10px;">
    <span style="font-size: 20px;font-family: 'American Typewriter';font-weight: bold;position:absolute;left: 70px">Sneaker Killer 后台管理系统</span>
    <i class="el-icon-switch-button" v-on:click="dialogVisible1 = true" style="font-size: 30px;float: right"></i>
    <el-dropdown @command="handleCommand" trigger="click" style="padding-right: 30px">
      <span class="el-dropdown-link">
        个人中心
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="">
          修改密码
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-card>
  </div>
</template>

<script>
// import {createRouter} from '../../router'

export default {
  name: 'Header',
  data() {
    return {
      dialogVisible1: false,
      dialogFormVisible2: false,
      originPassword: '',
      resetPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    logout () {
      const _this = this;
      this.dialogVisible1 = false
      this.$axios.get('/logout').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/login')
        }
      }).catch(failResponse => {
        console.log(failResponse)
      })
    },
    modifyMyPassword(){
      if (this.resetPassword !== this.confirmPassword){
        this.$alert('两次输入的密码不同')
        return
      }
      this.dialogFormVisible2 = false
      this.$axios.put('/admin/modifyPassword', {
        username: this.$store.state.username,
        originPassword: this.originPassword,
        resetPassword: this.resetPassword
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('密码修改成功')
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    handleCommand() {
      this.dialogFormVisible2 = true
    }
  }
}
</script>

<style scoped>
.admin-header {
  height: 60px;
  opacity: 0.85;
  line-height: 30px;
  min-width: 900px;
}
.el-icon-switch-button {
  cursor: pointer;
  outline:0;
}
.el-dropdown {
  float: right;
}
</style>

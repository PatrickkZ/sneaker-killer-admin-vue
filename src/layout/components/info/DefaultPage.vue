<template>
  <el-card style="margin: 18px 2%;width: 95%">
    <el-table
        :data="items"
        v-loading="loading"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
      <el-table-column
          label="ID"
          prop="id"
          width="60px">
      </el-table-column>
      <el-table-column
          label="商品名"
          prop="name">
      </el-table-column>
      <el-table-column
          label="商品描述"
          prop="detail"
          width="150px">
      </el-table-column>
      <el-table-column
          label="商品价格"
          prop="price"
          width="100px">
      </el-table-column>
      <el-table-column
          label="尺码信息"
          prop="size">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "DefaultPage",
  data() {
    return {
      items: []
    }
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  mounted () {
    this.loadItems()
  },
  methods: {
    loadItems(){
      this.$axios.get('/admin/allitem').then(resp => {
        if (resp && resp.data.code === 200) {
          this.items = resp.data.result
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

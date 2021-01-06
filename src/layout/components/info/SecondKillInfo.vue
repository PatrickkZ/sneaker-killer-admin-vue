<template>
  <div>
    <el-dialog
        title="商品信息"
        :visible.sync="dialogItemVisible">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="currentItem.name" placeholder="商品名称" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品描述" label-width="120px">
          <el-input v-model="currentItem.detail" placeholder="商品描述" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品秒杀价" label-width="120px">
          <el-input v-model="currentItem.price" placeholder="商品秒杀价" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="尺码信息" label-width="120px">
          <el-input v-model="currentItem.size" placeholder="" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="尺码库存信息" label-width="120px">
          <el-input v-model="currentItem.stock" placeholder="每个尺码的库存用英文','分隔" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="秒杀开始时间" label-width="120px">
          <div class="block">
            <el-date-picker
                v-model="currentItem.startTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="秒杀结束时间" label-width="120px">
          <div class="block">
            <el-date-picker
                v-model="currentItem.endTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogItemVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmOnSale">上 架</el-button>
      </div>
    </el-dialog>


    <div>
      <el-row style="margin: 18px 0px 0px 18px ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>上架商品</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
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
          <el-table-column
              label="操作"
              width="100px">
            <template slot-scope="scope">
              <el-button
                  @click="onSaleItem(scope.row)"
                  type="primary"
                  size="mini">
                上架商品
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecondKillInfo",
  data () {
    return {
      items: [],
      loading: true,
      dialogItemVisible: false,
      currentItem: {
        id: '',
        name: '',
        detail: '',
        price: '',
        size: '',
        stock: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  mounted () {
    this.loadItems()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    loadItems(){
      this.$axios.get('/admin/allitem').then(resp => {
        if (resp && resp.data.code === 200) {
          this.items = resp.data.result
          this.loading = false
        }
      })
    },
    onSaleItem(row){
      this.currentItem.id = row.id
      this.currentItem.name = row.name
      this.currentItem.detail = row.detail
      this.currentItem.price = row.price
      this.currentItem.size = row.size
      this.dialogItemVisible = true
    },
    confirmOnSale(){
      this.dialogItemVisible = false
      this.$axios.post('/admin/second-kill/onsale', {
        id: this.currentItem.id,
        price: this.currentItem.price,
        startTime: new Date(this.currentItem.startTime),
        endTime: new Date(this.currentItem.endTime),
        size: this.currentItem.size,
        stock: this.currentItem.stock
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('上架成功')
        } else {
          this.$alert(resp.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

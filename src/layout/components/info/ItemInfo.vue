<template>
  <div>
    <el-dialog
        title="修改商品信息"
        :visible.sync="dialogEditVisible">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="editDto.name" placeholder="商品名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" label-width="120px">
          <el-input v-model="editDto.detail" placeholder="商品描述" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品定价" label-width="120px">
          <el-input v-model="editDto.price" placeholder="商品定价" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="尺码信息" label-width="120px">
          <el-input v-model="editDto.size" placeholder="不同尺码用英文','分隔(如35,36,37,38,39)" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateItem">修 改</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="添加商品信息"
        :visible.sync="dialogItemVisible">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="newItem.name" placeholder="商品名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" label-width="120px">
          <el-input v-model="newItem.detail" placeholder="商品描述" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品定价" label-width="120px">
          <el-input v-model="newItem.price" placeholder="商品定价" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="尺码信息" label-width="120px">
          <el-input v-model="newItem.size" placeholder="不同尺码用英文','分隔(如35,36,37,38,39)" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogItemVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">添 加</el-button>
      </div>
    </el-dialog>


    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>商品信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-button @click="dialogItemVisible = true" type="success" size="small" style="float: right">
        <i class="el-icon-circle-plus-outline"></i>
        添加商品
      </el-button>
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
          width="50px">
        <template slot-scope="scope">
          <el-button
              @click="editItem(scope.row)"
              type="primary"
              size="mini"
              icon="el-icon-edit" circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ItemInfo",
  data () {
    return {
      items: [],
      loading: true,
      dialogItemVisible: false,
      dialogEditVisible: false,
      newItem: {
        name: '',
        detail: '',
        price: '',
        size: ''
      },
      editDto: {
        id: '',
        name: '',
        detail: '',
        price: '',
        size: ''
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
    addItem(){
      this.dialogItemVisible = false
      this.$axios.post('/admin/item/add', {
        name: this.newItem.name,
        detail: this.newItem.detail,
        price: this.newItem.price,
        size: this.newItem.size
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('添加成功')
          // 实现视图更新
          this.loadItems()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    editItem(item){
      this.editDto.id = item.id
      this.editDto.name = item.name
      this.editDto.detail = item.detail
      this.editDto.price = item.price
      this.editDto.size = item.size
      this.dialogEditVisible = true
    },
    updateItem(){
      this.dialogEditVisible = false
      this.$axios.post('/admin/item/update', {
        id: this.editDto.id,
        name: this.editDto.name,
        detail: this.editDto.detail,
        price: this.editDto.price,
        size: this.editDto.size
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('修改成功')
          // 实现视图更新
          this.loadItems()
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

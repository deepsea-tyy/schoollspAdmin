<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <el-input v-model="listQuery.keyword" placeholder="姓名/手机号" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
        <el-select v-model="listQuery.platform" placeholder="提款方式" clearable style="width: 150px" class="filter-item">
          <el-option label="微信" value="1" />
          <el-option label="支付宝" value="2" />
          <el-option label="银行卡" value="3" />
        </el-select>
        <el-select v-model="listQuery.type" placeholder="类型" clearable style="width: 150px" class="filter-item">
          <el-option label="骑手" value="1" />
          <el-option label="站长" value="2" />
        </el-select>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
      </div>
      <div>
        <el-button type="primary" @click="add(0)">+添加学校</el-button>
      </div>
    </div>

    <el-table v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%" :tree-props="{children: 'area', hasChildren: 'hasChildren'}">
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          {{scope.row.rider.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          {{scope.row.rider.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="学校">
        <template slot-scope="scope">
          {{ scope.row.school?scope.row.school.name:'' }} {{ scope.row.schoolArea?scope.row.schoolArea.name:'' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请金额">
        <template slot-scope="scope">
          {{ scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="到账金额">
        <template slot-scope="scope">
          {{ scope.row.commission}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.status==1?'已打款':(scope.row.status==2?'已驳回':(scope.row.status==3?'待打款':'待审核')) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <div class="action">
            <a v-if="!scope.row.status" @click="edit(scope.row.id,3)">审核 |</a>
            <a v-if="!scope.row.status" @click="edit(scope.row.id,2)"> 驳回 |</a>
            <a v-if="scope.row.status==3" @click="edit(scope.row.id,1)"> 打款 |</a>
            <a @click="view(scope.row.id)"> 查看 </a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    
  </div>
</template>
<script>
import { drawMoneyList,drawMoneyUpdate } from '@/api/runsetting'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'DrawMoneyList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        type:'1'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      drawMoneyList(this.listQuery).then(data => {
        console.log(this.listQuery)
        this.list = data.list
        this.total = data.pageCount
        this.listLoading = false
      })
    },
    search() {
      this.getList()
    },
    edit(id,status) {
      this.id = id
      this.status = status
      this.$confirm('确定此操作码？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.save()
        }).catch(() => {
        })
    },
    async save() {
      await drawMoneyUpdate({id:this.id,status:this.status})
      this.getList()
      this.$message({
        type: 'success',
        message: '操作成功!'
      });
    },
    view(id){
      this.$router.push({path:'/runsetting/edit',query:{id:id}})
    }
  }
}

</script>
<style scoped>
.action {
  color: #4199F8;
}

</style>

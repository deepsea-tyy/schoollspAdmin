<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.keyword" placeholder="请输入用户名/昵称/手机号" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
      <el-select v-model="listQuery.school_id" placeholder="学校名称" clearable style="width: 150px" class="filter-item">
        <!-- <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" /> -->
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="UID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户">
        <template slot-scope="scope">
          <span>{{ scope.row.realName?scope.row.realName.name:'' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.user.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column label="成交">
        <template slot-scope="scope">
          
          <div>订单：{{scope.row.orderNum}}</div>
          <div>金额：{{scope.row.orderCount}}</div>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="学校">
        <template slot-scope="scope">
          <span>{{ scope.row.school?scope.row.school.name:'' }} {{scope.row.schoolArea?('（' +scope.row.schoolArea.name +'）'):''}} </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <div class="action">
            <a @click="verify(scope.row)">审核 |</a>
            <router-link :to="'/user/edit/'+scope.row.user_id"> 编辑 | </router-link>
            <router-link :to="'/user/view/'+scope.row.user_id"> 查看 | </router-link>
            <a>删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(data => {
        this.list = data.list
        this.total = data.pageCount
        this.listLoading = false
      })
    },
    search(){

    },
    verify(){

    }
  }
}
</script>

<style scoped>
.action{
  color: #4199F8;
}
</style>

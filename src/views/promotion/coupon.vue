<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="优惠券名称">
        <template slot-scope="scope">
          {{ scope.row.promotion.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="领取时间">
        <template slot-scope="scope">
          {{$fun.formatDate( scope.row.created_at,1)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="开启时间">
        <template slot-scope="scope">
          {{$fun.formatDate( scope.row.start_at,1)}}
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope">
          {{$fun.formatDate( scope.row.end_at,1)}}
        </template>
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">
          {{scope.row.condition.content?('订单满 ¥'+scope.row.condition.content):''}}{{scope.row.condition.result?('减 ¥'+scope.row.condition.result):''}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status?'已使用':'未使用'}}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
   
  </div>
</template>
<script>
import { couponList } from '@/api/promotion'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'PromotionList',
  components: { Pagination },
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
    this.listQuery.promotion_id = this.$route.query.id
    this.getList(this.listQuery)
  },
  methods: {
    getList() {
      this.listLoading = true
      couponList(this.listQuery).then(data => {
        this.list = data.list
        this.total = data.pageCount
        this.listLoading = false
      })
    },
  }
}

</script>
<style scoped>
.action {
  color: #4199F8;
}

</style>

<template>
  <div class="app-container">
    <div class="filter-container">
        <el-button type="primary" @click="$router.push({path:'/promotion/edit'})">+添加优惠券</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="促销名称">
        <template slot-scope="scope">
          {{ scope.row.name}}
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
      <el-table-column class-name="status-col" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="限令次数">
        <template slot-scope="scope">
          {{ scope.row.receive_num}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="发放数量">
        <template slot-scope="scope">
          {{ scope.row.num}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <div class="action">
            <a @click="edit(scope.row)">  编辑| </a>
            <a v-if="scope.row.type == 1" @click="coupon(scope.row)"> 查看已领取优惠券</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
   
  </div>
</template>
<script>
import { promotionList } from '@/api/promotion'
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      promotionList(this.listQuery).then(data => {
        this.list = data.list
        this.total = data.pageCount
        this.listLoading = false
      })
    },
    search() {
      
    },
    edit(item) {
      this.$router.push({path:'/promotion/edit',query:{id:item.id}})
    },
    coupon(item) {
      this.$router.push({path:'/promotion/coupon',query:{id:item.id}})
    }
  }
}

</script>
<style scoped>
.action {
  color: #4199F8;
}

</style>

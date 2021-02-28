<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <el-input v-model="listQuery.name" placeholder="订单号" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
        <el-select v-model="listQuery.school_id" placeholder="订单类型" clearable style="width: 150px" class="filter-item">
          <!-- <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" /> -->
        </el-select>
        <el-select v-model="listQuery.school_id" placeholder="订单状态" clearable style="width: 150px" class="filter-item">
          <!-- <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" /> -->
        </el-select>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
      </div>
    </div>
  
  <el-tabs v-model="activeName" @tab-click="tabsClick">
    <el-tab-pane label="全部订单" name="1"></el-tab-pane>
    <el-tab-pane label="未支付" name="2"></el-tab-pane>
    <el-tab-pane label="待接单" name="3"></el-tab-pane>
    <el-tab-pane label="待取货" name="4"></el-tab-pane>
    <el-tab-pane label="待送达" name="5"></el-tab-pane>
    <el-tab-pane label="已完成" name="6"></el-tab-pane>
    <el-tab-pane label="已过期" name="7"></el-tab-pane>
    <el-tab-pane label="已取消" name="8"></el-tab-pane>
  </el-tabs>

    <el-table v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="订单类型">
        <template slot-scope="scope">
          {{ scope.row.type==2?'取快递':(scope.row.type==3?'外卖代拿':(scope.row.type==4?'校园跑腿':'其他帮助')) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单金额">
        <template slot-scope="scope">
          <div>总金额：¥{{ scope.row.total_price }}</div>
          <div>优惠金额：¥{{ scope.row.order_pmt }}</div>
          <div>实际支付：¥{{ scope.row.pay_price }}</div>
          
        </template>
      </el-table-column>
      <el-table-column label="用户">
        <template slot-scope="scope">
          <div>{{ (scope.row.realName)?scope.row.realName.name:'' }}</div>
          <div>{{ scope.row.type==4?(scope.row.runerrands?scope.row.runerrands.phone:''):(scope.row.shipAddress?scope.row.shipAddress.phone:'') }}</div>
          
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态">
        <template slot-scope="scope">
          {{scope.row.status==2?'已取消':(scope.row.complete==3?'已完成':(scope.row.pay_status == 1 ? '未支付':(scope.row.receiver?'待送达':'待接单')))}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="学校">
        <template slot-scope="scope">
          {{ scope.row.school.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <div class="action">
            <a @click="edit(scope.row)"> 查看</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
   
  </div>
</template>
<script>
import { orderList } from '@/api/order'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'SchoolList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20
      },
      activeName:'1'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      orderList(this.listQuery).then(data => {
        this.list = data.list
        this.total = data.pageCount
        this.listLoading = false
      })
    },
    search() {
      
    },
    edit(item) {
      this.$router.push({path:'/order/edit',query:{id:item.id}})
    },
    tabsClick(){
      console.log(this.activeName)
    }
  }
}

</script>
<style scoped>
.action {
  color: #4199F8;
}

</style>

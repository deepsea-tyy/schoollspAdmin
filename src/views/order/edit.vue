<template>
  <div class="app-container">
    <div style="background: #fff;margin-bottom: 20px;padding: 20px 10px;">
      <el-steps :active="model.complete==2?4:(model.receiver?3:model.pay_status)" align-center>
        <el-step title="用户下单" :description="$fun.formatDate( model.created_at,1)"></el-step>
        <el-step title="用户付款" :description="$fun.formatDate( model.pay_at,1)"></el-step>
        <el-step title="骑手接单" :description="$fun.formatDate( model.receiver_at,1)"></el-step>
        <el-step title="订单完成" :description="$fun.formatDate( model.confirm_at,1)"></el-step>
      </el-steps>
    </div>
    <div class="card">
      <div class="left">
        <div class="title">下单者信息</div>
        <div class="content">
          <p>订单编号：{{model.id}}</p>
          <p>订单类型：{{model.type==2?'取快递':(model.type==3?'外卖代拿':(model.type==4?'校园跑腿':'其他帮助'))}}</p>
          <p>联系人：{{model.realName.name}}</p>
          <p>性别：{{model.realName.gender==1?'男':'女'}}</p>
          <p>联系电话：{{model.user.mobile}}</p>
          <p>联系地址：{{model.school?model.school.name:''}} {{model.schoolArea?('（'+model.schoolArea.name+'）'):''}}</p>
        </div>
      </div>
      <div class="right">
        <div class="title">配送员信息</div>
        <div class="content">
          <p>姓名：{{model.riderRealNmae?(model.riderRealNmae.name):''}}</p>
          <p>性别：{{model.riderRealNmae?(model.riderRealNmae.gender==1?'男':'女'):''}}</p>
          <p>联系电话：{{model.rider?model.rider.phone:''}}</p>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="title">订单收益</div>
      <div class="content">
        <p>总计：<a>¥{{model.total_price}}</a></p>
        <p>优惠：<a>¥{{model.order_pmt}}</a></p>
        <p>小费：<a>¥{{model.runerrands.tip}}</a></p>
        <p>站长收益：<a>¥{{model.stationmaster_price}}</a></p>
        <p>平台收益：<a>¥{{model.platform_price}}</a></p>
        <p>骑手收益：<a>¥{{model.getMoney}}</a></p>
        <p>实付金额：<a>¥{{model.pay_price}}</a></p>
      </div>
    </div>

    <!-- <div class="item">
      <div class="title">订单收益</div>
      <div class="content">
        <div class="sitem">
          <p class="step">2020-12-24 15:30:54  订单提交成功</p>
          <p>订单编号7090202011241820271256等待付款</p>
        </div>

      </div>
    </div> -->
  </div>
    
</template>
<script>
import { orderVew } from '@/api/order'

export default {
  name: 'OrderEdit',
  data() {
    return {
      model: {
        realName:{},
        user:{},
        riderRealNmae:{},
        school:{},
        runerrands:{},
      }
    }
  },
  created() {
    let id = this.$route.query.id
    this.getData(id)
  },
  methods: {
    async getData(id) {
      this.model = await orderVew(id)
    },
  }
}

</script>
<style lang="scss">
.card {
  color: #666666;
  font-size: 15px;
  overflow: hidden;
  margin-bottom: 20px;

  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .left,.right{
    background: #fff;
    overflow: hidden;
    width: 49%;
  }
  .title{
    color: #000000;
    padding: 10px;
    border-bottom: 1px solid #F7F7F7;
    margin-bottom: 10px;
  }
  .content{
    margin-left: 35px;
    margin-right: 35px;
  }
}
.item{
  color: #666666;
  font-size: 15px;
  background: #fff;
  padding-bottom: 5px;
  margin-bottom: 20px;

  .title{
    color: #000000;
    padding: 10px;
    border-bottom: 1px solid #F7F7F7;
    margin-bottom: 10px;
  }
  .content{
    margin-left: 20px;
  }
  .sitem{
    margin-left: 45px;
    padding-bottom: 20px;
    border-bottom: 1px solid #F7F7F7;
  }
  .step{
    color: #000000;
  }
  a{
    color: #FF0000;
  }
}
</style>

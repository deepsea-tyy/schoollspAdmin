<template>
  <div class="app-container">
    <div style="background: #fff;margin-bottom: 20px">
      <el-steps :active="2" align-center>
        <el-step title="用户下单" description="2020-12-19 01:23:31"></el-step>
        <el-step title="用户付款" description=""></el-step>
        <el-step title="骑手接单" description=""></el-step>
        <el-step title="订单完成" description=""></el-step>
      </el-steps>
    </div>
    <div class="card">
      <div class="left">
        <div class="title">下单者信息</div>
        <div class="content">
          <p>订单编号：7090202011241820271256</p>
          <p>订单类型：取快递</p>
          <p>联系人：陈俊霖</p>
          <p>性别：男</p>
          <p>联系电话：13876684031</p>
          <p>联系地址：上海交通大学（闵行校区）A9-5-503</p>
        </div>
      </div>
      <div class="right">
        <div class="title">配送员信息</div>
        <div class="content">
          <p>姓名：qq</p>
          <p>性别：男</p>
          <p>联系电话：13876684031</p>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="title">订单收益</div>
      <div class="content">
        <p>总计：<a>¥6.00</a></p>
        <p>优惠：<a>¥6.00</a></p>
        <p>小费：<a>¥6.00</a></p>
        <p>站长收益：<a>¥6.00</a></p>
        <p>平台收益：<a>¥6.00</a></p>
        <p>骑手收益：<a>¥6.00</a></p>
        <p>实付金额：<a>¥6.00</a></p>
      </div>
    </div>

    <div class="item">
      <div class="title">订单收益</div>
      <div class="content">
        <div class="sitem">
          <p class="step">2020-12-24 15:30:54  订单提交成功</p>
          <p>订单编号7090202011241820271256等待付款</p>
        </div>

      </div>
    </div>
  </div>
    
</template>
<script>
import { orderVew } from '@/api/order'

export default {
  name: 'OrderEdit',
  data() {
    return {
      model: {}
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

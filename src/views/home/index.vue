<template>
  <div class="app-container">
    <div class="item">
      <div class="t-c"><a class="title">今日收益</a> <a class="time">更新时间：2020-12-17 19:57:06</a></div>
      <div class="left">
        <div class="s-title">
          <a class="left">今日平台总收入</a> <a class="right">¥ 0.00</a>
        </div>
        <el-row :gutter="5">
          <el-col :span="6">
            <div class="t">取快递（元）</div>
            <div class="p">¥ 0.00</div>
            <div class="yp">昨日：¥ 0.00</div>
          </el-col>
          <el-col :span="6">
            <div class="t">外卖代拿（元）</div>
            <div class="p">¥ 0.00</div>
            <div class="yp">昨日：¥ 0.00</div>
          </el-col>
          <el-col :span="6">
            <div class="t">校园跑腿（元）</div>
            <div class="p">¥ 0.00</div>
            <div class="yp">昨日：¥ 0.00</div>
          </el-col>
          <el-col :span="6">
            <div class="t">其他帮助（元）</div>
            <div class="p">¥ 0.00</div>
            <div class="yp">昨日：¥ 0.00</div>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <div class="s-title">
          <a class="left">今日已完成订单</a> <a class="right">0</a>
        </div>
        <el-row :gutter="5">
          <el-col :span="6">
            <div class="t">取快递（笔）</div>
            <div class="p">0</div>
            <div class="yp">昨日：0</div>
          </el-col>
          <el-col :span="6">
            <div class="t">外卖代拿（笔）</div>
            <div class="p">0</div>
            <div class="yp">昨日：0</div>
          </el-col>
          <el-col :span="6">
            <div class="t">校园跑腿（笔）</div>
            <div class="p">0</div>
            <div class="yp">昨日：0</div>
          </el-col>
          <el-col :span="6">
            <div class="t">其他帮助（笔）</div>
            <div class="p">0</div>
            <div class="yp">昨日：0</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="item">
      <div class="t-c"><a class="title">累计收益</a> <a class="time">更新时间：2020-12-17 19:57:06</a></div>
      <div class="left">
        <div class="s-title">
          <a class="left">平台累计总收入</a> <a class="right">¥ 0.00</a>
        </div>
        <el-row :gutter="5">
          <el-col :span="6">
            <div class="t">取快递（元）</div>
            <div class="p">¥ 0.00</div>
            <div class="yp">昨日：¥ 0.00</div>
          </el-col>
          <el-col :span="6">
            <div class="t">外卖代拿（元）</div>
            <div class="p">¥ 0.00</div>
            <div class="yp">昨日：¥ 0.00</div>
          </el-col>
          <el-col :span="6">
            <div class="t">校园跑腿（元）</div>
            <div class="p">¥ 0.00</div>
            <div class="yp">昨日：¥ 0.00</div>
          </el-col>
          <el-col :span="6">
            <div class="t">其他帮助（元）</div>
            <div class="p">¥ 0.00</div>
            <div class="yp">昨日：¥ 0.00</div>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <div class="s-title">
          <a class="left">累计已完成订单</a> <a class="right">0</a>
        </div>
        <el-row :gutter="5">
          <el-col :span="6">
            <div class="t">取快递（笔）</div>
            <div class="p">0</div>
            <div class="yp">昨日：0</div>
          </el-col>
          <el-col :span="6">
            <div class="t">外卖代拿（笔）</div>
            <div class="p">0</div>
            <div class="yp">昨日：0</div>
          </el-col>
          <el-col :span="6">
            <div class="t">校园跑腿（笔）</div>
            <div class="p">0</div>
            <div class="yp">昨日：0</div>
          </el-col>
          <el-col :span="6">
            <div class="t">其他帮助（笔）</div>
            <div class="p">0</div>
            <div class="yp">昨日：0</div>
          </el-col>
        </el-row>
      </div>
    </div>
    
    <div class="botm">
      <div class="user">
        <div class="title">今日新增</div>
        <div class="left">
          <div class="a">用户</div>
          <div class="b"><a> 0</a>人</div>
          <div class="all">累计：<a>100</a>人</div>
        </div>
        <div class="right">
          <div class="a">订单</div>
          <div class="b"><a> 0</a>人</div>
          <div class="all">累计：<a>100</a>笔</div>
        </div>
      </div>
      <div class="out">
        <div class="title">提现申请</div>
        <div class="left">
          <div class="a">提现</div>
          <div class="b">
            <a>待提现：<b> 0</b></a> <a>已提现：<b> 0</b></a>
          </div>
        </div>
        <div class="right">
          <div class="a">订单</div>
          <div class="b">
            <a>有效订单：<b> 0</b></a> <a>无效订单：<b> 0</b></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fetchList } from '@/api/article'

export default {
  name: 'ExportZip',
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {

    }
  }
}

</script>
<style lang="scss" scoped>
.item {
  background: #FFFFFF;
  padding: 20px 35px;
  overflow: hidden;
  margin-bottom: 20px;

  .t-c {
    margin-bottom: 40px;
  }

  .title {
    font-size: 20px;
    color: #000000;
  }

  .time {
    font-size: 15px;
    color: #898989;
  }

  .left {
    float: left;
    padding-right: 36px;
  }

  .right {
    float: right;
    padding-left: 36px;
  }

  .left,
  .right {
    width: 50%;

    .s-title {
      font-size: 30px;
      margin-bottom: 20px;
      overflow: hidden;

      .left {
        font-weight: 500;
        color: #525252;
      }

      .right {
        color: #000000;
        font-weight: normal;
      }
    }
  }

  .t {
    color: #525252;
    font-size: 17px;
    margin-bottom: 20px;
  }

  .p {
    font-size: 30px;
    color: #000000;
    margin-bottom: 15px;
  }

  .yp {
    font-size: 15px;
    color: #555555;
  }
}
.botm{
  font-size: 20px;
  overflow: hidden;
  .user,.out{
    width: 49%;
    padding: 12px 22px;
    background: #fff;
    overflow: hidden;
  }
  .user{
    float: left;
  }
  .out{
    float: right;
  }
}
.user{
  .title{
    margin-bottom: 20px;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .left,.right{
    width: 50%;
    text-align: center;
    a{
      color: red;
    }
    .all{
      font-size: 15px;
      color: #666666;
    }
    .a{
      margin-bottom: 20px;
    }
    .b{
      margin-bottom: 10px;
    }
  }
}
.out{
  .title{
    margin-bottom: 20px;
  }

  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .left,.right{
    .a{
      margin-bottom: 45px;
      text-align:center;
    }
    b{
      color: red;
    }
  }
}

</style>

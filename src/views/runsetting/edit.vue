<template>
  <div class="app-container">
    <div style="background: #fff;margin-bottom: 20px;padding: 20px 10px">
      <el-steps v-if="model.status!=2" :active="model.status?(model.status==3?2:3):1" align-center>
        <el-step title="申请中" :description="$fun.formatDate( model.created_at,1)"></el-step>
        <el-step title="平台审核" description=""></el-step>
        <el-step title="平台打款" description=""></el-step>
      </el-steps>
      <h3 v-if="model.status==2">已驳回</h3>
    </div>
    <div class="card">
      <div class="left">
        <div class="title">提现信息</div>
        <div class="content">
          <p>提现编号：{{model.id}}</p>
          <p>姓名：{{model.rider.name}}</p>
          <p>联系电话：{{model.rider.phone}}</p>
          <p>学校：{{ model.school?model.school.name:'' }} {{ model.schoolArea?model.schoolArea.name:'' }}</p>
        </div>
      </div>
      <div class="right">
        <div class="title">提现信息</div>
        <div class="content">
          <p>提现方式： 微信零钱</p>
          <p>提现金额：<a style="color: red">¥{{model.money}}</a></p>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="title">打款信息</div>
      <div class="content">
        <p>申请金额：<a>¥{{model.money}}</a></p>
        <p>提现手续费：<a>¥{{model.commission}}</a></p>
      </div>
      <el-button v-if="!model.status" @click="edit(model.id,2)" type="danger">驳回申请</el-button>
      <el-button v-if="!model.status" @click="edit(model.id,3)" type="primary">提交审核</el-button>
      <el-button v-if="model.status==3" @click="edit(model.id,1)" type="primary">打款</el-button>
      <el-button @click="$router.push({path:'/runsetting/drawlist'})">返回列表</el-button>
    </div>
  </div>
    
</template>
<script>
import { drawMoneyView,drawMoneyUpdate } from '@/api/runsetting'

export default {
  name: 'OrderEdit',
  data() {
    return {
      model: {
        rider:{},
        status:0
      }
    }
  },
  created() {
    let id = this.$route.query.id
    this.getData(id)
  },
  methods: {
    async getData(id) {
      this.model = await drawMoneyView(id)
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
      this.model.status = this.status
      this.$message({
        type: 'success',
        message: '操作成功!'
      });
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

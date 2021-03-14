<template>
  <div class="app-container">
    <div style="padding: 15px;border-bottom: 1px solid #C9C9C9;background: #fff">
      基础设置
    </div>
    <div style="background: #fff;padding: 10px;">
      <el-form :label-position="'right'" label-width="120px" :model="model">
        <el-form-item label="基础配送费：">
          <el-input v-model="model.basic_cost"></el-input>
        </el-form-item>

        <el-form-item label="重量附加费：">
          <div v-for="(item,index) in model.weight_cost" style="margin-bottom: 5px;">
            <el-input style="width: 100px;margin-right: 10px;" v-model="model.weight_cost[index].title"></el-input>
            <el-input style="width: 100px;margin-right: 10px;" v-model="model.weight_cost[index].price"></el-input>
            <a @click="wdel(index)" style="background: #FF0000;color: #FFFFFF;font-size: 18px;padding: 3px;">×</a>
          </div>
          <el-button @click="wadd()" type="primary">添加</el-button>
        </el-form-item>
        <el-form-item label="特殊时段费：">
          <el-input v-model="model.lunch_time_cost"></el-input>
          午餐
          <el-input v-model="model.dinner_time_cost"></el-input>
          晚餐
        </el-form-item>
        <el-form-item label="配送难度费：">
          <el-input v-model="model.difficulty_cost" placeholder=""></el-input>5楼以上
        </el-form-item>
        <el-form-item label="特殊天气费：">
          <el-input v-model="model.weather_cist" placeholder=""></el-input>雨天、雪天额外加收费用
        </el-form-item>
        <el-form-item label="平台抽成：">
          <el-input v-model="model.platform_perc" placeholder=""></el-input>* 1-100 单位（%）
        </el-form-item>
        <el-form-item label="结算方式：">
          <el-radio-group v-model="model.settlement_type">
            <el-radio :label="1">微信零钱</el-radio>
            <el-radio :label="2">银行卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最低结算额度：">
          <el-input v-model="model.settlement_least" placeholder=""></el-input>余额大于或等于最低提现额度方可提现
        </el-form-item>
        <el-form-item label="月结算日：">
          <el-input v-model="model.settlement_date" placeholder=""></el-input>每个月固定结算日期
        </el-form-item>
        <el-form-item>
          <el-button @click="save()" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
    
</template>
<script>
import { settingList,settingUpdate } from '@/api/backend'

export default {
  name: 'settingweb',
  data() {
    return {
      model: {
        weight_cost:[]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.model = await settingList({keyPrefix:'WEB'})
    },
    async save(){
      if (this.model.id) {
        await costUpdate(this.model)
      }else{
        await costCreate(this.model)
      }
      this.getData()
      this.$message({
        type: 'success',
        message: '保存成功!'
      })
    },
    wadd(){
      this.model.weight_cost.push({price:'',title:''})
    },
    wdel(index){
      this.model.weight_cost.splice(index, 1)
    }
  }
}

</script>
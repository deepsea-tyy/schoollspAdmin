<template>
  <div class="app-container">
    <div style="background: #fff;padding: 20px;">
      <div style="margin-bottom: 20px;padding-bottom:20px;border-bottom: 1px solid #C9C9C9;">基础设置</div>
      <el-form :label-position="labelPosition" label-width="150px" :model="model">
        <el-form-item label="基础配送费：">
          <el-input v-model="model.basic_cost"></el-input>* 单位(￥)
        </el-form-item>
        <el-form-item label="重量附加费：">
          <div v-for="(item,index) in model.weight_cost" style="overflow: hidden;">
            <div style="float: left;margin-bottom: 5px;margin-right: 5px;">
              <el-input v-model="item.title"></el-input>
            </div>
            <div style="float: left;margin-bottom: 5px;margin-right: 5px;">  
              <el-input v-model="item.price"></el-input>
            </div>
            <div @click="remove(index)" style="float: left;margin-bottom: 5px;margin-right: 5px;background: red;color: #fff;width: 50px;text-align: center;">
              X
            </div>
          </div>
          <div>
            <el-button type="primary" @click="addRow">+ 添加</el-button>
          </div>
        </el-form-item>
        <el-form-item label="特殊时段费：">
          <el-input v-model="model.lunch_time_cost"></el-input>午餐
          <el-input v-model="model.dinner_time_cost"></el-input>晚餐
        </el-form-item>
        <el-form-item label="配送难度费：">
          <el-input v-model="model.difficulty_cost"></el-input>5楼以上
        </el-form-item>
        <el-form-item label="特殊天气费：">
          <el-input v-model="model.weather_cist"></el-input>雨天、雪天额外加收费用
        </el-form-item>
        <el-form-item label="平台抽成：">
          <el-input v-model="model.platform_perc"></el-input>* 1-100 单位（%）
        </el-form-item>
        <el-form-item label="站长抽成：">
          <el-input v-model="model.stationmaster_perc"></el-input>* 1-100 单位（%）
        </el-form-item>

        <div style="margin-bottom: 20px;padding-bottom:20px;border-bottom: 1px solid #C9C9C9;">基础设置</div>
        <el-form-item label="结算方式：">
          <el-radio-group v-model="model.settlement_type">
            <el-radio :label="1">微信零钱</el-radio>
            <el-radio :label="2">银行卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最低结算额度：">
          <el-input v-model="model.settlement_least"></el-input>余额大于或等于最低提现额度方可提现
        </el-form-item>
        <el-form-item label="月结算日：">
          <el-input v-model="model.settlement_date"></el-input>每个月固定结算日期
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
    
</template>
<script>
import { costCreate, costView, costUpdate } from '@/api/runsetting'

export default {
  name: 'RunsettingEdit',
  data() {
    return {
      labelPosition: 'right',
      model: {
        settlement_type:0,
        weight_cost:[]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(id) {
      this.model = await costView()
    },
    async save(){
      if (this.model.owner_id) {
        await costUpdate(this.model)
      }else{
        await costCreate(this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功!'
      })
    },
    addRow(){
      this.model.weight_cost.push({title:'',price:''})
    },
    remove(index){
      this.model.weight_cost.splice(index, 1)
    }
  }
}

</script>
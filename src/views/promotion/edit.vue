<template>
  <div class="app-container">
    <div style="background: #fff;padding: 10px;">
      
      <el-form :label-position="'right'" label-width="80px" :model="model">
        <el-form-item label="券名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>

        <el-form-item label="发放学校">
          <div>
            <div style="float: left;width: 200px;margin-right: 20px">
                <page-select 
                v-model="value"
                @getQuery="getQuery" 
                @getSelectData="getSelectData"
                :show-select="showSelect"
                :table-data="tableData" 
                :table-head="tableHead" 
                :seach-query="seachQuery"
                :page-data="pageData"
              >
              </page-select>
                
            </div>
            <div v-if="schoolAreaShow" style="float: left;margin-top: 10px">
              <el-select v-model="model.school_area_id" placeholder="请选择校区">
                <el-option
                  v-for="item in schoolArea"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            
          </div>
        </el-form-item>
        <el-form-item label="发放数量">
          <el-input v-model="model.num"></el-input>
        </el-form-item>
        <el-form-item label="限领次数">
          <el-input v-model="model.receive_num"></el-input>
          (次/人)
        </el-form-item>
        <el-form-item label="有效时间">
          <el-date-picker
            v-model="model.start_at"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始时间">
          </el-date-picker> - 
          <el-date-picker
            v-model="model.end_at"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="model.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="促销金额">
          <el-select v-model="model.condition.result_type" placeholder="请选择类型">
            <el-option
              v-for="item in conditionResultType"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select> - 
          <el-input style="width: 240px;" v-model="model.condition.result" placeholder="金额/折扣"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="save()" type="primary">保存</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
    
</template>
<script>
import { promotionVew } from '@/api/promotion'
import { schoolList } from '@/api/school'
import pageSelect from 'page-select'

export default {
  name: 'PromotionEdit',
  components:{pageSelect},
  data() {
    return {
      model: {
        "name": "",
        "num": "",
        "receive_num": "1",
        "participant_num": null,
        "instruction": "",
        "type": "",
        "code": "",
        "start_at": "",
        "end_at": "",
        "exclusion": null,
        "sort": null,
        "status": null,
        "condition": {
          "condition_type": null,
          "condition": "",
          "content_type": null,
          "content": "",
          "result_type": null,
          "result": ""
        }
      },
      value:'',
      showSelect:{'dataKey':'name','placeH':'请选择学校'},
      seachQuery:[
        [{'seachKey':'name'},{'placeH':'请输入学校名称'}], 
      ],
      tableHead:[{'name':'学校名称'}],
      tableData: [],
      pageData:{'total':10,'current':1,'size':10},
      schoolAreaShow:false,
      schoolArea:[],
      conditionResultType:[
        {
          name:'订单减固定金额',
          value:4
        },
        {
          name:'订单折扣',
          value:5
        },
      ]
    }
  },
  created() {
    let id = this.$route.query.id
    if (id) {
      this.getData(id)
    }
    this.getQuery(this.pageData)
  },
  methods: {
    async getData(id) {
      this.model = await promotionVew(id)
    },
    getQuery(val){
      // val为请求所需参数 console.log(val)
      let params = {
        page:val.current,
        pageSize:val.size,
        name:val.name
      }
      this.getSchool(params)
    },
    getSelectData(item){
      this.getSchool({parent_id:item.id},2)
      this.model.school_id = item.id
    },
    async getSchool(params,type){
      let res = await schoolList(params)
      if (type == 2 && res.list.length>1) {
        this.schoolAreaShow = true
        this.schoolArea = res.list
      }else{
        this.schoolAreaShow = false
        this.tableData = res.list.length>1?res.list:this.tableData
      }
      this.pageData.total = res.totalCount
    },
    async save(){
      console.log(this.model)
    }
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

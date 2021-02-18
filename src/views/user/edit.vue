<template>
  <div class="form-container">
    <el-tabs v-model="tabsActive">
      <el-tab-pane label="基本信息" name="first">
        <el-form :size="'mini'">
          <el-form-item label="用户" :label-width="'150px'">
            <el-image style="height: 50px;width: 50px;margin-right: 10px" :src="$fun.fileUrl(editData.uinfo.avatar)" lazy></el-image>{{ editData.uinfo.nickname }}
          </el-form-item>
          <el-form-item label="openid" :label-width="'150px'">
            {{ (editData&&editData.uinfo)?editData.uinfo.openid:'' }}
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="'150px'">
            {{ (editData&&editData.realName)?editData.realName.name:'' }}
            <a class="edit-btn" @click="update(10,'修改真实姓名')"> 修改</a>
          </el-form-item>
          <el-form-item label="性别" :label-width="'150px'">
            {{ (editData&&editData.realName)?(editData.realName.gender==1?'男':'女'):'' }}
            <a class="edit-btn" @click="update(9,'修改性别')"> 修改</a>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="'150px'">
            {{ (editData&&editData.realName)?editData.realName.id_card_no:'' }}<a class="edit-btn" @click="update(8,'修改身份证号')"> 修改</a>
          </el-form-item>
          <el-form-item label="身份证正反面" :label-width="'150px'">
            <el-image style="height: 50px;width: 100px;margin-right: 20px" :src="$fun.fileUrl((editData&&editData.realName)?editData.realName.id_card_frontal_photo:'')" lazy></el-image>
            <el-image style="height: 50px;width: 100px;" :src="$fun.fileUrl((editData&&editData.realName)?editData.realName.id_card_reverse_photo:'')" lazy></el-image>
          </el-form-item>
          <el-form-item label="所属院校" :label-width="'150px'">
            {{ (editData&&editData.school)?editData.school.name:'' }}
            {{ (editData&&editData.schoolArea)?editData.schoolArea.name:''}}
            <a class="edit-btn" @click="update(7,'修改所属院校')"> 修改</a>
          </el-form-item>
          <el-form-item label="入学时间" :label-width="'150px'">
            {{ $fun.formatDate(editData.enrollment_at) }}<a class="edit-btn" @click="update(6,'修改入学时间')"> 修改</a>
          </el-form-item>
          <el-form-item label="所学院系" :label-width="'150px'">
            {{ editData?editData.faculty:'' }}<a class="edit-btn" @click="update(5,'修改所学院系')"> 修改</a>
          </el-form-item>
          <el-form-item label="所学专业" :label-width="'150px'">
            {{ editData?editData.subject:'' }}<a class="edit-btn" @click="update(4,'修改所学专业')"> 修改</a>
          </el-form-item>
          <el-form-item label="学生证号" :label-width="'150px'">
            {{ editData?editData.student_id:'' }}<a class="edit-btn" @click="update(3,'修改学生证号')"> 修改</a>
          </el-form-item>
          <el-form-item label="学生证正反面" :label-width="'150px'">
            <el-image style="height: 50px;width: 100px;margin-right: 20px" :src="$fun.fileUrl(editData?editData.student_id_card_frontal_photo:'')" lazy></el-image>
            <el-image style="height: 50px;width: 100px" :src="$fun.fileUrl(editData?editData.student_id_card_reverse_photo:'')" lazy></el-image>
          </el-form-item>
          <el-form-item label="注册时间" :label-width="'150px'">
            {{$fun.formatDate(editData.uinfo.created_at) }}
          </el-form-item>
          <div class="line">
            <h5>交易信息</h5>
          </div>
          <el-form-item label="成交订单数" :label-width="'150px'">
            {{editData.orderNum }}
          </el-form-item>
          <el-form-item label="成交金额" :label-width="'150px'">
            {{editData.orderCount }} 元
          </el-form-item>
          <el-form-item label="最后一次成交时间" :label-width="'150px'">
            {{editData.lastOrderTime?$fun.formatDate(editData.lastOrderTime):'无任何交易' }}
          </el-form-item>
          <div class="line">
            <h5>用户绑定</h5>
          </div>
          <el-form-item label="手机号码" :label-width="'150px'">
            {{editData.user.mobile }}
          </el-form-item>
          <div class="line">
            <h5>骑手绑定</h5>
          </div>
          <el-form-item label="手机号码" :label-width="'150px'">
            {{editData.rider?editData.rider.phone:'' }}<a class="edit-btn" @click="update(2,'修改手机号码')"> 修改</a>
          </el-form-item>
          <el-form-item label="密码" :label-width="'150px'">
            <a class="edit-btn" @click="update(1,'修改密码')"> 修改</a>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="跑腿" name="second">
        <el-form :size="'mini'">
          <el-form-item label="所属院校" :label-width="'150px'">
            {{(editData&&editData.rider&&editData.rider.school)?editData.rider.school.name:''}}{{(editData&&editData.rider&&editData.rider.schoolArea)?editData.rider.schoolArea.name:''}}<a class="edit-btn" @click="update(11,'修改所属院校')"> 修改</a>
          </el-form-item>
          <el-form-item label="累计收入" :label-width="'150px'">
            {{(editData&&editData.rider)?editData.rider.total_amount:''}}
          </el-form-item>
          <el-form-item label="已提现收入" :label-width="'150px'">
            {{(editData&&editData.fund)?editData.fund.out_amount:''}}
          </el-form-item>
          <el-form-item label="成为骑手时间" :label-width="'150px'">
            {{(editData&&editData.rider)?$fun.formatDate(editData.rider.passa_at):''}}
          </el-form-item>
          <el-form-item label="审核通过" :label-width="'150px'">
            <el-radio-group v-model="riderStatus" @change="change">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="站长" name="third">
        <el-form :size="'mini'">
          <el-form-item label="所属院校" :label-width="'150px'">
            {{(editData&&editData.store&&editData.store.school)?editData.store.school.name:''}}{{(editData&&editData.store&&editData.store.schoolArea)?editData.store.schoolArea.name:''}}<a class="edit-btn" @click="update(12,'修改所属院校')"> 修改</a>
          </el-form-item>
          <el-form-item label="累计收入" :label-width="'150px'">
            {{(editData&&editData.store)?editData.store.total_amount:''}}
          </el-form-item>
          <el-form-item label="已提现收入" :label-width="'150px'">
            {{(editData&&editData.store)?editData.store.out_amount:''}}
          </el-form-item>
          <el-form-item label="有效期" :label-width="'150px'">
            {{(editData&&editData.store)?$fun.formatDate(editData.store.start_at):''}} - {{(editData&&editData.store)?$fun.formatDate(editData.store.end_at):''}}
            <a class="edit-btn" @click="update(13,'修改有效期')"> 修改</a>
          </el-form-item>
          <el-form-item label="审核通过" :label-width="'150px'">
            <el-radio-group v-model="storeStatus" @change="change">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-input v-model="value" type="text" placeholder="请输入内容" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { studentView, studentUpdate, riderUpdate, realNameUpdate } from '@/api/user'
export default {
  name: 'StudentView',
  data() {
    return {
      dialogFormVisible: false,
      tabsActive: 'first',
      editData: {
        orderNum: '',
        lastOrderTime: '',
        orderCount: '',
        faculty: '',
        subject: '',
        enrollment_at: '',
        student_id: '',
        status: '',
        refuse_reasons: '',
        frontalPhoto: {
          file_url: '',
        },
        reversePhoto: {
          file_url: '',
        },
        school: null,
        schoolArea: null,
        realName: {
          gender: null
        },
        uinfo: {
          avatar: 0,
          nickname: 0,
          created_at: 0,
        },
        user: {
          mobile: ''
        },
        rider: null,
        fund: {
          out_amount: ''
        },
        store:null
      },
      riderStatus: null,
      storeStatus: null,
      title: '',
      type: 0,
      value: '',
    }
  },
  created() {
    let id = this.$route.params && this.$route.params.id
    this.getData(id)
  },
  methods: {
    async getData(id) {
      let res = await studentView(id)
      this.editData = Object.assign(this.editData, res)
      this.riderStatus = res.rider?res.rider.status:null
      this.storeStatus = res.stor?res.stor.status:null
    },
    async save() {
      if (this.value == '') {
        this.$message.error('请填写内容');
        return;
      }
      let data = {};
      switch (this.type) {
        case 1:
          data = { user_id: this.editData.user_id, password: this.value }
          await riderUpdate(data)
          break;
        case 2:
          data = { user_id: this.editData.user_id, phone: this.value }
          await riderUpdate(data)
          break;
        case 3:
          data = { user_id: this.editData.user_id, student_id: this.value }
          await studentUpdate(data)
          break;
        case 4:
          data = { user_id: this.editData.user_id, subject: this.value }
          await studentUpdate(data)
          break;
        case 5:
          data = { user_id: this.editData.user_id, faculty: this.value }
          await studentUpdate(data)
          break;
        case 6:
          data = { user_id: this.editData.user_id, enrollment_at: this.value }
          await studentUpdate(data)
          break;
        case 7:
          data = { user_id: this.editData.user_id, school_id: this.value }
          await studentUpdate(data)
          break;
        case 8:
          data = { user_id: this.editData.user_id, id_card_no: this.value }
          await realNameUpdate(data)
          break;
        case 9:
          data = { user_id: this.editData.user_id, gender: this.value }
          await realNameUpdate(data)
          break;
        case 10:
          data = { user_id: this.editData.user_id, name: this.value }
          await realNameUpdate(data)
          break;
        case 11:
          data = { user_id: this.editData.user_id, name: this.value }
          await riderUpdate(data)
          break;
        default:
          this.dialogFormVisible = false;
          return
      }
      this.getData(this.editData.user_id)
      this.dialogFormVisible = false;
      this.$message.success('保存成功');
      this.value = ''
    },
    update(type, title) {
      this.dialogFormVisible = true
      this.type = type
      this.title = title
    },
    async change(){
      let data = {user_id:this.editData.user_id, status:this.riderStatus}
      await riderUpdate(data)
      this.getData(this.editData.user_id)
    }
  }
}

</script>
<style lang="scss" scoped>
.form-container {
  background: #fff;
  margin: 20px;
  padding: 20px;
}

.line {
  border-bottom: 1.5px solid #EDEDED;
  margin-bottom: 10px;

  h5 {
    border-radius: 2px;
    border-left: 5px solid #479CF7;
    margin-left: 50px;
    padding-left: 10px;
  }
}

.edit-btn {
  color: #479CF7;
}

</style>

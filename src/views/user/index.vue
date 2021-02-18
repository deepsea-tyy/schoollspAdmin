<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.keyword" placeholder="请输入用户名/昵称/手机号" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
      <el-select v-model="listQuery.school_id" placeholder="学校名称" clearable style="width: 150px" class="filter-item">
        <!-- <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" /> -->
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="UID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户">
        <template slot-scope="scope">
          <el-image style="height: 50px;width: 50px;margin-right: 10px" :src="$fun.fileUrl(scope.row.uinfo.avatar)" lazy></el-image>
          <span>{{ scope.row.uinfo?scope.row.uinfo.nickname:'' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.user.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成交">
        <template slot-scope="scope">
          <div>订单：{{scope.row.orderNum}}</div>
          <div>金额：{{scope.row.orderCount}}</div>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="学校">
        <template slot-scope="scope">
          <span>{{ scope.row.school?scope.row.school.name:'' }} {{scope.row.schoolArea?('（' +scope.row.schoolArea.name +'）'):''}} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <div class="action">
            <a v-if="scope.row.status==0" @click="dialogFormVisible=true;editData=scope.row">审核 |</a>
            <a v-if="scope.row.status==2">已驳回 |</a>
            <router-link :to="'/user/edit/'+scope.row.user_id"> 编辑 | </router-link>
            <router-link :to="'/user/edit/'+scope.row.user_id"> 查看 | </router-link>
            <a>删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :size="'mini'">
        <el-form-item label="真实姓名" :label-width="'150px'">
          {{ (editData&&editData.realName)?editData.realName.name:'' }}
        </el-form-item>
        <el-form-item label="性别" :label-width="'150px'">
          {{ (editData&&editData.realName)?(editData.realName.gender==1?'男':'女'):'' }}
        </el-form-item>
        <el-form-item label="身份证号" :label-width="'150px'">
          {{ (editData&&editData.realName)?editData.realName.id_card_no:'' }}
        </el-form-item>
        <el-form-item label="身份证正反面" :label-width="'150px'">
          <el-image style="height: 50px;width: 100px;margin-right: 20px" :src="$fun.fileUrl((editData&&editData.realName)?editData.realName.id_card_frontal_photo:'')" lazy></el-image>
          <el-image style="height: 50px;width: 100px;" :src="$fun.fileUrl((editData&&editData.realName)?editData.realName.id_card_reverse_photo:'')" lazy></el-image>
        </el-form-item>
        <el-form-item label="所属院校" :label-width="'150px'">
          {{ editData?editData.school.name + (editData.school.schoolArea?editData.school.schoolArea.name:''):'' }}
        </el-form-item>
        <el-form-item label="入学时间" :label-width="'150px'">
          {{ editData?$fun.formatDate(editData.enrollment_at):'' }}
        </el-form-item>
        <el-form-item label="所学专业" :label-width="'150px'">
          {{ editData?editData.faculty + editData.subject:'' }}
        </el-form-item>
        <el-form-item label="学生证号" :label-width="'150px'">
          {{ editData?editData.student_id:'' }}
        </el-form-item>
        <el-form-item label="学生证正反面" :label-width="'150px'">
          <el-image style="height: 50px;width: 100px;margin-right: 20px" :src="$fun.fileUrl(editData?editData.student_id_card_frontal_photo:'')" lazy></el-image>
          <el-image style="height: 50px;width: 100px" :src="$fun.fileUrl(editData?editData.student_id_card_reverse_photo:'')" lazy></el-image>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="verify(1)">审核通过</el-button>
        <el-button type="danger" @click="verify(2)">驳回申请</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { studentList, studentUpdate } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'StudentList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        pageSize: 20
      },
      editData: null,
    }
  },
  created() {
    console.log(this.$route.path)
    if (this.$route.path == '/user/rider') {
      this.listQuery.is_rider = 1
    }
    if (this.$route.path == '/user/incharge') {
      this.listQuery.is_incharge = 1
    }
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      studentList(this.listQuery).then(data => {
        this.list = data.list
        this.total = data.pageCount
        this.listLoading = false
      })
    },
    search() {

    },
    async verify(st) {
      await studentUpdate({ user_id: this.editData.user_id, status: st })
      this.getList()
      this.dialogFormVisible = false
      this.editData = null
    }
  }
}

</script>
<style scoped>
.action {
  color: #4199F8;
}

</style>

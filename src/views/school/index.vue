<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <el-input v-model="listQuery.name" placeholder="学校名称/校区" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
        <el-select v-model="listQuery.school_id" placeholder="所在城市" clearable style="width: 150px" class="filter-item">
          <!-- <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" /> -->
        </el-select>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
      </div>
      <div>
        <el-button type="primary" @click="add">+添加学校</el-button>
      </div>
    </div>
    <el-table v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column align="center" label="学校">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="校徽">
        <template slot-scope="scope">
          <el-image style="height: 50px;width: 100px;margin-right: 20px" :src="$fun.fileUrl('')" lazy />
        </template>
      </el-table-column>
      <el-table-column label="城市">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <div class="action">
            <a v-if="scope.row.parent_id==0" @click="dialogFormVisible=true;editData=scope.row">添加校区 |</a>
            <a @click="dialogFormVisible=true;editData=scope.row"> 编辑 |</a>
            <a @click="dialogFormVisible=true;editData=scope.row"> 删除 </a>
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

          <el-image style="height: 50px;width: 100px;" :src="$fun.fileUrl((editData&&editData.realName)?editData.realName.id_card_reverse_photo:'')" lazy />
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="verify(1)">审核通过</el-button>
        <el-button type="danger" @click="verify(2)">驳回申请</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { schoolList, schoolUpdate, schoolCreate } from '@/api/school'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'SchoolList',
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
      editData: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      schoolList(this.listQuery).then(data => {
        this.list = data.list
        this.total = data.pageCount
        this.listLoading = false
      })
    },
    search() {
      getList
    },
    async verify(st) {
      await schoolUpdate({ user_id: this.editData.user_id, status: st })
      this.getList()
      this.dialogFormVisible = false
      this.editData = null
    },
    add() {

    }
  }
}

</script>
<style scoped>
.action {
  color: #4199F8;
}

</style>

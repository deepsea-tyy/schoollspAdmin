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
        <el-button type="primary" @click="add(0)">+添加学校</el-button>
      </div>
    </div>

    <el-table v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%" :tree-props="{children: 'area', hasChildren: 'hasChildren'}">
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
          {{ scope.row.p?scope.row.p.name:'' }}
          {{ scope.row.c?scope.row.c.name:'' }}
          {{ scope.row.a?scope.row.a.name:'' }}
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
            <a v-if="scope.row.parent_id==0" @click="add(scope.row.id)">添加校区 |</a>
            <a @click="edit(scope.row)"> 编辑 |</a>
            <a @click="del(scope.row)"> 删除 </a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :size="'mini'">
        
        <el-form-item label="学校名称" :label-width="'100px'">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="校徽" :label-width="'100px'">
          
        </el-form-item>
        <el-form-item label="城市" :label-width="'100px'">
          <el-select @change="change(1)" style="width:130px" v-model="model.p_id" placeholder="请选择">
             <el-option
              v-for="item in p"
              :label="item.name"
              :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select @change="change(2)" style="width:130px" v-model="model.c_id" placeholder="请选择">
            <el-option
              v-for="item in c"
              :label="item.name"
              :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="model.a_id" placeholder="请选择">
            <el-option
              v-for="item in a"
              :label="item.name"
              :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="'100px'">
          <el-input v-model="model.address"></el-input>
        </el-form-item>
        <el-form-item label="地图定位" :label-width="'100px'">
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { schoolList, schoolUpdate, schoolCreate, schoolDelete } from '@/api/school'
import { region, area } from '@/api/common'
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
      model: {},
      p:[],
      c:[],
      a:[],
    }
  },
  created() {
    this.initModel()
    this.getList()
    this.getRegion()
  },
  methods: {
    initModel() {
      this.model = {
        id:null,
        parent_id:null,
        name:null,
        address:null,
        p_id:null,
        c_id:null,
        a_id:null,
      }
    },
    getList() {
      this.listLoading = true
      schoolList(this.listQuery).then(data => {
        this.list = data.list
        this.total = data.pageCount
        this.listLoading = false
      })
    },
    search() {
      
    },
    async verify(st) {
      await schoolUpdate({ user_id: this.model.user_id, status: st })
      this.getList()
      this.dialogFormVisible = false
      this.model = null
    },
    add(parent_id) {
      this.initModel()
      this.model.parent_id=parent_id
      this.dialogFormVisible=true
    },
    edit(item) {
      this.model = item
      this.change(1)
      this.change(2)
      this.dialogFormVisible=true
    },
    del(item) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.schoolDelete({ids:item.id})
        })
    },
    async save() {
      if(this.model.id){
        await schoolUpdate(this.model)
      }else{
        await schoolCreate(this.model)
      }
      this.getList()
      this.dialogFormVisible=false
    },
    async getRegion(id,type=1) {
      let res = await region(id)
      if (type==1) {
        this.p = res
      }
      if (type==2) {
        this.c = res
      }
      if (type==3) {
        this.a = res
      }
    },
    async schoolDelete(item) {
      await schoolDelete(item)
      this.getList()
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    },
    change(type){
      if (type == 1 && this.model.p_id) {
        this.getRegion(this.model.p_id,2)
      }
      if (type == 2 && this.model.c_id) {
        this.getRegion(this.model.c_id,3)
      }
    }
  }
}

</script>
<style scoped>
.action {
  color: #4199F8;
}

</style>

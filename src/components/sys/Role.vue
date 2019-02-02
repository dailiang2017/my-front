<template>
  <div class="container" style="width:99%;margin-top:-25px;">
    <div class="panel" >
      <div class="panel-header">
        <span class="panel-search"><i class="el-icon-search"></i></span>
        <h3>查询条件</h3>
      </div>
      <div class="panel-body">
        <el-form :model="form" :inline="true" :size="size">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="角色名称">
                <el-input v-model="form.role"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16" class="col-left">
              <el-form-item class="item-right">
                <el-button type="primary" @click="queryPage" icon="el-icon-search">查询</el-button>
                <el-button type="primary" @click="clear" icon="el-icon-refresh">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

    <div class="panel" >
      <div class="panel-header">
        <span class="panel-search"><i class="el-icon-menu"></i></span>
        <h3>查询结果</h3>
        <div class="panel-bar">
          <el-button type="primary" @click="add" :size="size">新增</el-button>
        </div>
      </div>
      <div class="panel-body">
        <CommonTable
          :data="roleList" :columns="columns" :pageTotal="form.pageTotal" @handleEdit="handleEdit" @handleDelete="handleDelete">
        </CommonTable>
      </div>
    </div>

    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="roleForm" label-width="80px" :rules="dataFormRules" ref="roleForm" :size="size"
               label-position="right">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="roleForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="roleForm.role" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="roleForm.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm">{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import staticUtil from '@/common/js/staticUtil'
  import CommonTable from '@/common/views/CommonTable'
  export default {
    name: "Role",
    components: {
      CommonTable
    },
    data() {
      return {
        size: 'small',
        form: {
          role: '',
          pageNo: 1,
          pageSize: this.$api.Constant.PAGE_SIZE,
          pageTotal: 0
        },
        roleList: [],
        columns: [
          {prop:"role", label:"角色", minWidth:120},
          {prop:"description", label:"描述", minWidth:120},
          {prop:"creator", label:"创建人", minWidth:100},
          {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
        ],
        roleForm: {
          id: '',
          role: '',
          description: ''
        },
        dialogVisible: false,
        operation: true,
        formLabelWidth: '120px',
        dataFormRules: {
          role: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入角色描述', trigger: 'blur' }
          ]
        },
      }
    },
    created() {
    },
    methods: {
      queryPage: function() {
        this.$api.role.queryPage(this.form).then((resp) => {
          if (resp.status === 200 && resp.data.success === true) {
            this.roleList = resp.data.data ? resp.data.data.list || [] : []
            this.form.pageTotal = resp.data.data ? resp.data.data.total || 0 : 0
          }
        })
      },
      clear: function () {
        Object.keys(this.form).forEach((k) => {
          if (k !== 'pageNo' && k !== 'pageSize' && k !== 'pageTotal') {
            this.form[k] = ''
          }
        })
      },
      handleEdit: function(record) {
        this.dialogVisible = true
        this.operation = false
        this.$nextTick(()=>{
          this.$refs['roleForm'].resetFields();
        })
        this.roleForm = Object.assign({}, record.row)
      },
      handleDelete: function(data) {
        let ids = data.ids
        let id = ids[0]
        this.$api.role.delete(id).then((resp) => {
          if(resp.status === 200 && resp.data.success === true) {
            this.$message({ message: '操作成功', type: 'success' })
            this.dialogVisible = false
            this.queryPage()
          } else {
            this.$message({message: '操作失败, ' + resp.data.msg, type: 'error'})
          }
        })
      },
      add: function() {
        this.dialogVisible = true
        this.operation = true
        this.$nextTick(()=>{
          this.$refs['roleForm'].resetFields();
          this.roleFormClear()
        })
      },
      submitForm: function () {
        let params = Object.assign({}, this.roleForm)
        this.$refs['roleForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.$api.role.insertOrUpdate(params).then((resp) => {
                if(resp.status === 200 && resp.data.success === true) {
                  this.$message({ message: '操作成功', type: 'success' })
                  this.dialogVisible = false
                  this.$refs['userForm'].resetFields()
                  this.queryPage()
                } else {
                  this.$message({message: '操作失败, ' + resp.data.msg, type: 'error'})
                }
              })
            })
          }
        })
      },
      //转换时间格式
      dateFormat(row, column) {
        let date = row[column.property];
        if (!date) {
          return "";
        }
        return staticUtil.timeStampToDateMinute(date)
      },
    }
  }
</script>

<style scoped lang="scss">

</style>

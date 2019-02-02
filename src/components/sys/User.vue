<template>
  <div class="container" style="width:99%;margin-top:-25px;">
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :model="form" :inline="true" :size="size">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryPage" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clear" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <CommonTable
              :data="userList" :columns="columns" :pageTotal="form.pageTotal" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </CommonTable>

    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="userForm" label-width="80px" :rules="dataFormRules" ref="userForm" :size="size"
               label-position="right">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="userForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="userForm.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="userForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="adress">
          <el-input v-model="userForm.adress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="userForm.remark" auto-complete="off"></el-input>
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
  import typeFormat from '@/common/js/typeFormat'
  import CommonTable from '@/common/views/CommonTable'
  export default {
    components: {
      CommonTable
    },
    data() {
      return {
        size: 'small',
        form: {
          username: '',
          pageNo: 1,
          pageSize: this.$api.Constant.PAGE_SIZE,
          pageTotal: 0
        },
        userList: [],
        columns: [
          {prop:"username", label:"用户名", minWidth:120},
          {prop:"realname", label:"姓名", minWidth:120},
          {prop:"mobile", label:"手机", minWidth:100},
          {prop:"email", label:"邮箱", minWidth:120},
          {prop:"adress", label:"地址", minWidth:100},
          {prop:"status", label:"状态", minWidth:70, formatter: this.statusFormat},
          {prop:"remark", label:"备注", minWidth:70}
        ],
        userForm: {
          username: '',
          realname: '',
          mobile: '',
          email: '',
          adress: '',
          remark: ''
        },
        dialogVisible: false,
        operation: true,
        formLabelWidth: '120px',
        dataFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          realname: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
      }
    },
    created() {
      this.queryPage()
    },
    methods: {
      queryPage: function() {
        this.$api.user.queryUserPage(this.form).then((resp) => {
          if (resp.status === 200 && resp.data.success === true) {
            this.userList = resp.data.data ? resp.data.data.list || [] : []
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
      userFormClear: function () {
        Object.keys(this.userForm).forEach((k) => {
          this.userForm[k] = ''
        })
      },
      handleEdit: function(record) {
        this.dialogVisible = true
        this.operation = false
        this.$nextTick(()=>{
          this.$refs['userForm'].resetFields();
        })
        this.userForm = Object.assign({}, record.row)
      },
      handleDelete: function(data) {
        let ids = data.ids
        let id = ids[0]
        this.$api.user.delete(id).then((resp) => {
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
          this.$refs['userForm'].resetFields();
          this.userFormClear()
        })
      },
      submitForm: function () {
        let params = Object.assign({}, this.userForm)
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.$api.user.insertOrUpdate(params).then((resp) => {
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
      statusFormat: function (row, column) {
        let status = row[column.property]
        return typeFormat.getLabel(status, typeFormat.userStatusEnums);
      },
    }
  }
</script>

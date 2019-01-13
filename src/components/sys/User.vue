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
          <el-button type="primary" @click="clear" icon="el-icon-plus">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" :data="userList">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="realname" label="姓名"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="statusFormat"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="email" label="电子邮箱"></el-table-column>
      <el-table-column prop="adress" label="地址"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[20, 50, 100, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.pageTotal">
      </el-pagination>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="userForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="userForm.realname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import typeFormat from '@/common/js/typeFormat'
  export default {
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
        userForm: {
          username: '',
          realname: ''
        },
        dialogFormVisible: false
      }
    },
    methods: {
      handleSizeChange: function (pageSize) {
        this.form.pageSize = pageSize
        this.queryPage()
      },
      handleCurrentChange: function (pageNo) {
        this.form.pageNo = pageNo
        this.queryPage()
      },
      queryPage: function() {
        this.$http.post('/api/user/queryUserPage', this.form).then((resp) => {
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
      add: function() {

      },
      statusFormat: function (row, column) {
        let status = row[column.property]
        return typeFormat.getLabel(status, typeFormat.userStatusEnums);
      },
    }
  }
</script>

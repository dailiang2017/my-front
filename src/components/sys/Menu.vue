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
              <el-form-item label="菜单名称">
                <el-input v-model="form.menuname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16" class="col-left">
              <el-form-item class="item-right">
                <el-button type="primary" @click="queryMenuTree" icon="el-icon-search">查询</el-button>
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
          <el-button type="primary" @click="addResource" :size="size">新增</el-button>
          <el-button type="primary" @click="editResource" :size="size">编辑</el-button>
          <el-button type="primary" @click="delResource" :size="size">删除</el-button>
        </div>
      </div>
      <div class="panel-body">
        <el-container>
          <el-aside>
            <el-tree :data="menuData" class="filter-tree" :props="defaultProps"
                     :expand-on-click-node="false" @node-click="handleNodeClick">
            </el-tree>
          </el-aside>
          <el-main>
            <el-form :model="sourceForm" :rules="rules" ref="sourceForm">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="资源名称" prop="name">
                    <el-input class="w60" v-model="sourceForm.name" :disabled="editFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="资源类型" prop="resourceType">
                    <el-select class="w60" v-model="sourceForm.resourceType" :disabled="editFlag" placeholder="请选择">
                      <el-option
                        v-for="item in resourceTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="url">
                    <el-input class="w70" v-model="sourceForm.url" :disabled="editFlag"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item>
                    <el-button type="primary" @click="save" :size="size" :disabled="editFlag">保存</el-button>
                    <el-button type="primary" @click="reset" :size="size" :disabled="editFlag">取消</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
  import typeFormat from '@/common/js/typeFormat'
  export default {
    name: "Menu",
    data() {
      return {
        size: 'small',
        form: {
          menuname: ''
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        menuData: [],
        sourceForm: {
          name: '',
          resourceType: '',
          url: '',
          icon: '',
          parent_id: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入资源名称', trigger: 'blur' }
          ],
          resourceType: [
            { required: true, message: '请输入资源类型', trigger: 'blur' }
          ],
        },
        resourceTypeOptions: typeFormat.getListWithoutAll(typeFormat.resourceTypeEnums),
        editFlag: true,
        treeId: ''
      }
    },
    created() {
      this.queryMenuTree()
    },
    methods: {
      queryMenuTree: function () {
        this.$api.menu.queryMenuTree().then((resp) => {
          if (resp.status === 200 && resp.data.success === true) {
            this.menuData = resp.data.data
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
      handleNodeClick: function(data) {
        if (data && data.id) {
          this.treeId = data.id
          this.sourceForm.name = data.name
          this.sourceForm.resourceType = data.resourceType + ''
          this.sourceForm.url = data.url
        }
        this.editFlag = true
      },
      addResource: function() {
        this.reset()
        this.editFlag = false
      },
      editResource: function() {
        if (this.treeId) {
          this.editFlag = false
        } else {
          this.$message({
            message: '请选择一个节点',
            type: 'warning'
          })
        }
      },
      delResource: function() {
        if (this.treeId) {
          this.$api.menu.deleteMenu(this.treeId).then((resp) => {
            if (resp.status === 200 && resp.data.success === true) {
              this.menuData = resp.data.data
            }
          })
        } else {
          this.$message({
            message: '请选择一个节点',
            type: 'warning'
          })
        }
      },
      save: function () {
        this.$refs['sourceForm'].validate((valid) => {
          if (valid) {
          }
        })
      },
      reset: function () {
        Object.keys(this.sourceForm).forEach((k) => {
          if (k !== 'pageNo' && k !== 'pageSize' && k !== 'pageTotal') {
            this.sourceForm[k] = ''
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">

</style>

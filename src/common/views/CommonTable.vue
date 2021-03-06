<template>
    <div>
      <el-table :data="data" :highlight-current-row="highlightCurrentRow" @selection-change="selectionChange"
                @current-change="handleCurrentChange" :border="border" :stripe="stripe"
                :show-overflow-tooltip="showOverflowTooltip" :max-height="maxHeight" :size="size" :align="align" style="width:100%;" >
        <el-table-column type="selection" width="40" v-if="showBatchDelete & showOperation"></el-table-column>
        <el-table-column v-for="column in columns" header-align="center" align="center"
                         :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
                         :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
                         :sortable="column.sortable==null?false:column.sortable">
        </el-table-column>
        <el-table-column :label="$t('action.operation')" width="180" fixed="right" v-if="showOperation" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" >{{$t('action.edit')}}</el-button>
            <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)" >{{$t('action.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <div class="toolbar" style="padding:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="refreshPageRequest"
          :current-page="pageRequest.pageNo"
          :page-sizes="[20, 50, 100, 20]"
          :page-size="pageRequest.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal" style="float:right;">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      name: "CommonTable",
      props: {
        columns: Array, // 表格列配置
        data: Array, // 表格分页数据
        pageTotal: Number,
        permsEdit: String,  // 编辑权限标识
        permsDelete: String,  // 删除权限标识
        size: { // 尺寸样式
          type: String,
          default: 'mini'
        },
        align: {  // 文本对齐方式
          type: String,
          default: 'left'
        },
        maxHeight: {  // 表格最大高度
          type: Number,
          default: 400
        },
        showOperation: {  // 是否显示操作组件
          type: Boolean,
          default: true
        },
        border: {  // 是否带有纵向边框 默认false
          type: Boolean,
          default: false
        },
        stripe: {  // 是否显示斑马线 默认false
          type: Boolean,
          default: true
        },
        highlightCurrentRow: {  // // 是否高亮当前行 默认false
          type: Boolean,
          default: true
        },
        showOverflowTooltip: {  // 当内容过长被隐藏时显示 tooltip  默认false
          type: Boolean,
          default: true
        },
        showBatchDelete: {  // 是否显示操作组件
          type: Boolean,
          default: true
        }
      },
      data() {
        return {
          // 分页信息
          pageRequest: {
            pageNo: 1,
            pageSize: this.$api.Constant.PAGE_SIZE
          },
          loading: false,  // 加载标识
          selections: []  // 列表选中列
        }
      },
      methods: {
        // 分页查询
        findPage: function () {
          this.loading = true
          let callback = res => {
            this.loading = false
          }
          this.$emit('findPage', {pageRequest:this.pageRequest, callback:callback})
        },
        // 选择切换
        selectionChange: function (selections) {
          this.selections = selections
          this.$emit('selectionChange', {selections:selections})
        },
        // 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
        handleCurrentChange: function (val) {
          this.$emit('handleCurrentChange', {val:val})
        },
        // 更改每页显示数
        handleSizeChange: function (pageSize) {
          this.pageRequest.pageSize = pageSize
          this.findPage()
        },
        // 换页刷新
        refreshPageRequest: function (pageNo) {
          this.pageRequest.pageNo = pageNo
          this.findPage()
        },
        // 编辑
        handleEdit: function (index, row) {
          this.$emit('handleEdit', {index:index, row:row})
        },
        // 删除
        handleDelete: function (index, row) {
          this.delete(row.id)
        },
        // 批量删除
        handleBatchDelete: function () {
          let ids = this.selections.map(item => item.id).toString()
          this.delete(ids)
        },
        // 删除操作
        delete: function (idList) {
          this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            let ids = []
            let idArray = (idList+'').split(',')
            for(var i=0; i<idArray.length; i++) {
              ids.push(idArray[i])
            }
            this.loading = true
            let callback = res => {
              if(res.code == 200) {
                this.$message({message: '删除成功', type: 'success'})
                this.findPage()
              } else {
                this.$message({message: '操作失败, ' + res.msg, type: 'error'})
              }
              this.loading = false
            }
            this.$emit('handleDelete', {ids, callback:callback})
          }).catch(() => {
          })
        }
      },
      mounted() {
        this.refreshPageRequest(1)
      }
    }
</script>

<style scoped>

</style>

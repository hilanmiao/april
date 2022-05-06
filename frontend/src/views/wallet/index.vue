<template>
  <el-tabs tab-position="left">
    <el-tab-pane label="身份证">
      <el-form ref="form" label-position="right" :model="form" :rules="rules">
        <el-form-item label="姓名" :label-width="labelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="labelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="民族" :label-width="labelWidth" prop="nationality" />
        <el-form-item label="出生日期" :label-width="labelWidth" prop="cotent">
          <el-date-picker
            v-model="form.dob"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            align="right"
            unlink-panels
          />
        </el-form-item>
        <el-form-item label="常住户口所在地住址" :label-width="labelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身份号码" :label-width="labelWidth" prop="ID">
          <el-input v-model="form.ID" autocomplete="off" />
        </el-form-item>
        <el-form-item label="有效期" :label-width="labelWidth" prop="validity">
          <el-date-picker
            v-model="form.validity"
            value-format="yyyy-MM-dd"
            size="mini"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="签发机关" :label-width="labelWidth" prop="issuingAuthority">
          <el-input v-model="form.issuingAuthority" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身份证人像面" :label-width="labelWidth" prop="issuingAuthority">
          <el-upload
            class="avatar-uploader"
            action="#"
            accept="image/png, image/jpeg"
            :show-file-list="false"
            :on-success="handlePicUploadSuccess"
            :on-error="handlePicUploadError"
            :on-progress="handlePicUploadProgress"
            :http-request="uploadPic"
          >
            <img v-if="form.issuingAuthority" :src="form.issuingAuthority" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div v-show="picProgressPercent !== 0" class="progress-wrapper">
              <el-progress type="circle" :percentage="picProgressPercent" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" :loading="saving" @click="submit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import _ from 'lodash'
import { userService, fileService } from '@/services'

export default {
  components: {

  },
  model: {
    prop: 'dialogVisible',
    event: 'close'
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    formId: {
      type: String,
      default: '-1'
    }
  },
  data() {
    return {
      // 通用属性
      labelWidth: '80px',
      defaultForm: null,
      form: {
        id: '',
        title: '',
        type: '2',
        recipientIds: '',
        content: '',
        remark: ''
      },
      rules: {
        title: [{ required: true, message: '必填', trigger: 'blur' }],
        type: [{ required: true, message: '必选', trigger: 'change' }]
      },
      loading: false,
      saving: false,
      // 业务属性
      loadingSelect: false,
      userList: []
    }
  },
  computed: {
    visible: {
      get() {
        // 父组件向下传递dialogVisible的值时通过计算属性赋值到visible
        return this.dialogVisible
      },
      set() {
        // 当dialog关闭时，会触发this.visible = false，从而来到这个方法，我们在这里将关闭事件同步给父组件
        this.$emit('close', false)
      }
    },
    title() {
      return this.form.id === '-1' ? '添加通知' : '编辑通知'
    }
  },
  created() {
    // 拷贝form默认值
    this.defaultForm = _.cloneDeep(this.form)
  },
  destroyed() {
    this.defaultForm = null
  },
  methods: {
    // 打开回调
    async open() {
      await this.init()
      // 添加
      if (this.form.id === '-1') return
      // 编辑
      await this.setData()
    },
    // 初始化数据事件等
    async init() {
      try {
        this.form.id = this.formId
        // const response = await userService.getUserList()
        // const { data: userList } = response.data
        // this.userList = userList
      } catch (e) {
        console.error('notification.getUserList-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 设置数据
    async setData() {
      try {
        const response = await notificationService.getNotification({ id: this.form.id })
        const { data: notification } = response.data
        const { title, type, recipientIds, content, remark } = notification
        this.form.title = title
        this.form.type = type
        this.form.recipientIds = recipientIds
        this.form.content = content
        this.form.remark = remark
      } catch (e) {
        console.error('notification.getNotification-error:', e)
        const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
        this.$message.error(errorMessage)
      }
    },
    // 关闭回调
    close() {
      this.visible = false
      this.saving = false
      this.loading = false
      this.clearValidate()
    },
    // 关闭回调
    closed() {
      // 重置form
      this.form = _.cloneDeep(this.defaultForm)
    },
    // 完成
    done() {
      this.saving = false
    },
    // 检验表单
    validate(callback) {
      if (this.$refs.form) {
        this.$refs.form.validate(callback)
      }
    },
    // 重置表单
    resetFields() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    // 移除表单校验
    clearValidate(props) {
      if (this.$refs.form) {
        this.$refs.form.clearValidate(props)
      }
    },
    // 提交
    submit() {
      // 提交前处理

      // 提交通用处理
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.saving = true
          const formData = _.cloneDeep(this.form)
          let response = null
          try {
            if (formData.id === '-1') {
              response = await notificationService.createNotification(formData)
            } else {
              response = await notificationService.updateNotification(formData)
            }
            const { data } = response.data
            console.log(data)
            this.$emit('save-success')
            this.close()
          } catch (e) {
            console.error('notification.submitNotification-error:', e)
            this.done()
            const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
            this.$message.error(errorMessage)
          }
        }
      })
    },
    // 远程搜索
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        try {
          const response = await userService.getUserList({ keyword: query })
          const { data: userList } = response.data
          this.userList = userList
        } catch (e) {
          console.error('notification.getUserList-error:', e)
          const errorMessage = e && e.data.message || '发生了一些未知的错误，请重试！'
          this.$message.error(errorMessage)
          this.loading = false
        }
      } else {
        this.userList = []
      }
    },
    uploadPic(content) {
      const checkUpload = this.beforeUploadPic(content.file)
      if (!checkUpload) {
        return
      }
      console.log(content)
      fileService.upload(content.file.name, content.file, {
        // axios 上传进度事件
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted)
          // 更新element upload progress
          content.onProgress({ percent: percentCompleted })
          this.picProgressPercent = percentCompleted
        }
      }).then(response => {
        content.onSuccess(response)
        setTimeout(() => {
          this.picProgressPercent = 0
        }, 1000)
      }).catch(error => {
        content.onError(error)
      })
    },
    handlePicUploadSuccess(response, file) {
      console.log(response)
      this.form.pic = response.data.url
    },
    handlePicUploadError(err) {
      console.log(err)
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    },
    handlePicUploadProgress(event, file, fileList) {
      console.log(event, file)
    }
  }
}
</script>

<style scoped>

</style>

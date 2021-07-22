<template>
  <el-cascader
    :value="permsArr"
    :options="options"
    :props="props"
    style="width: 100%;"
    separator=":"
    clearable
    @change="handleChange"
  />
</template>

<script>
import PermissionMixin from '@/core/mixins/permission'

export default {
  name: 'PermissionCascader',
  mixins: [PermissionMixin],
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      props: { multiple: true },
      options: []
    }
  },
  computed: {
    permsArr: function() {
      // 处理权限 'system:menu:add,system:menu:info' => [[ 'system', 'menu', 'add' ], [...]]
      const arr = this.splitPerms(this.value).map(e => {
        return e.split(':')
      })
      return arr
    }
  },
  created() {
    const options = []
    this.flatPerms().forEach(arr => {
      this.filterPermToCascader(0, arr, options)
    })
    this.options = options
  },
  methods: {
    /**
     * using v-model
     */
    handleChange(arr) {
      // 处理格式转为string
      const s = this.joinPerms(arr)
      this.$emit('input', s)
    }
  }
}
</script>

<style></style>

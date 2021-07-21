/**
 * dept mixin
 */
export default {
  methods: {
    /**
     * 渲染部门列表至树形控件
     * @param {Array} depts list
     * @param {Object} parentDept parent dept obj
     */
    filterDeptToTree(depts, parentDept) {
      const res = []
      depts.forEach(dept => {
        let node
        if (!parentDept && !dept.parentId) {
          // 根
          const childNode = this.filterDeptToTree(depts, dept)
          node = { label: dept.name }
          node.children = childNode
        } else if (parentDept && parentDept.id === dept.parentId) {
          const childNode = this.filterDeptToTree(depts, dept)
          node = { label: dept.name }
          node.children = childNode
        }
        if (node) {
          node.id = dept.id
          res.push(node)
        }
      })
      return res
    }
  }
}

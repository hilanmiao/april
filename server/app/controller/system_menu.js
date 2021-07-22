'use strict';

const Controller = require('../core/controller');
const _ = require('lodash');

class SystemMenuController extends Controller {

  /**
   * 所有
   * @return {Promise<void>}
   */
  async list() {
    const { ctx } = this;

    const res = await ctx.service.systemMenu.list()
    this.success({ ctx, data: res })
  }

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    let { parentId: parent_id, name, router, type, icon, orderNum: order_num, viewPath: view_path, keepalive, isHidden: is_hidden } = ctx.request.body

    if (type === 'menu' && parent_id !== '-1') {
      const parent = await ctx.service.systemMenu.getMenuItemAndParentInfo({ id: parent_id })
      if (!parent) {
        throw new Error('父节点菜单不存在！');
      }
      if (parent && parent.type === 'menu') {
        // 当前新增为菜单但父节点也为菜单时为非法操作
        this.fail({ ctx, code: 10006 })
        return;
      }
    }

    if (parent_id === '-1') {
      parent_id = null
    }

    const res = await ctx.service.systemMenu.create({ parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden })

    this.success({ ctx, data: res })
  }

  /**
   * 删除
   * @return {Promise<void>}
   */
  async delete() {
    const { ctx } = this;
    const id = ctx.params.id

    // 如果有子目录，一并删除
    const childMenus = await ctx.service.systemMenu.getChildMenus({ id })
    await ctx.service.systemMenu.delete({ ids: _.flattenDeep([id, childMenus]) })
    this.success({ ctx })
  }

  /**
   * 详情
   * @return {Promise<void>}
   */
  async get() {
    const { ctx } = this;
    const id = ctx.params.id
    const res = await ctx.service.systemMenu.getMenuItemAndParentInfo({ id })
    this.success({ ctx, data: res })
  }
}

module.exports = SystemMenuController;
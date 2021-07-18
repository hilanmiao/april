'use strict';

const Controller = require('../core/controller');
const _ = require('lodash');

class SysUserController extends Controller {

  async list() {
    const { ctx } = this;

    const res = await ctx.service.sysMenu.list()
    this.success({ ctx, data: res })
  }

  async add() {
    const { ctx } = this;
    let { parentId: parent_id, name, router, perms, type, icon, orderNum: order_num, viewPath: view_path, keepalive, isShow: is_show } = ctx.request.body

    if (type === '2' && parent_id === '-1') {
      // 无法直接创建权限，必须有ParentId
      this.fail({ ctx, code: 10005 })
      return
    }

    if (type === '1' && parent_id !== '-1') {
      const parent = await ctx.service.sysMenu.getMenuItemInfo({ id: parent_id })
      if (!parent) {
        throw new Error('父节点菜单不存在！');
      }
      if (parent && parent.type === '1') {
        // 当前新增为菜单但父节点也为菜单时为非法操作
        this.fail({ ctx, code: 10006 })
        return;
      }
    }

    if (parent_id === '-1') {
      parent_id = null
    }

    const menu = await ctx.service.sysMenu.create({ parent_id, name, router, perms, type, icon, order_num, view_path, keepalive, is_show })

    this.success({ ctx, data: menu })
  }

  async update() {
    const { ctx } = this;
    let { menuId: id, parentId: parent_id, name, router, perms, type, icon, orderNum: order_num, viewPath: view_path, keepalive, isShow: is_show } = ctx.request.body

    if (type === '2' && parent_id === '-1') {
      // 无法直接创建权限，必须有ParentId
      this.fail({ ctx, code: 10005 })
      return
    }

    if (type === '1' && parent_id !== '-1') {
      const parent = await ctx.service.sysMenu.getMenuItemInfo({ id: parent_id })
      if (!parent) {
        throw new Error('父节点菜单不存在！');
      }
      if (parent && parent.type === '1') {
        // 当前新增为菜单但父节点也为菜单时为非法操作
        this.fail({ ctx, code: 10006 })
        return;
      }
      if (parent_id === '-1') {
        parent_id = null
      }
    }

    const menu = await ctx.service.sysMenu.update(id, { parent_id, name, router, perms, type, icon, order_num, view_path, keepalive, is_show })

    this.success({ ctx, data: menu })
  }

  async delete() {
    const { ctx } = this;
    const { menuId: menu_id } = ctx.request.body

    // 如果有子目录，一并删除
    const childMenus = await ctx.service.sysMenu.findChildMenus({ menu_id })
    await ctx.service.sysMenu.remove({ ids: _.flattenDeep([menu_id, childMenus]) })
    this.success({ ctx })
  }

  async info() {
    const { ctx } = this;
    const { menuId: id } = ctx.request.body
    const res = await ctx.service.sysMenu.getMenuItemAndParentInfo({ id })
    this.success({ ctx, data: res })
  }
}

module.exports = SysUserController;

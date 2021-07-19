'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SysMenuService extends Service {

  /**
   * 获取所有菜单
   * @return {Promise<*>}
   */
  async list() {
    const { ctx } = this
    const res = await ctx.model.SysMenu.findAll()
    return res
  }

  /**
   * 创建
   * @param parent_id
   * @param name
   * @param router
   * @param perms
   * @param type
   * @param icon
   * @param order_num
   * @param view_path
   * @param keepalive
   * @param is_show
   * @return {Promise<*>}
   */
  async create({ parent_id, name, router, perms, type, icon, order_num, view_path, keepalive, is_show }) {
    const { ctx } = this
    const res = await ctx.model.SysMenu.create({ parent_id, name, router, perms, type, icon, order_num, view_path, keepalive, is_show })
    return res
  }

  /**
   * 更新
   * @param id
   * @param parent_id
   * @param name
   * @param router
   * @param perms
   * @param type
   * @param icon
   * @param order_num
   * @param view_path
   * @param keepalive
   * @param is_show
   * @return {Promise<*>}
   */
  async update({ id, parent_id, name, router, perms, type, icon, order_num, view_path, keepalive, is_show }) {
    const { ctx } = this
    const res = await ctx.model.SysMenu.update(id, { parent_id, name, router, perms, type, icon, order_num, view_path, keepalive, is_show })
    return res
  }

  /**
   * 删除
   * @param ids
   * @return {Promise<*>}
   */
  async delete({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: ids } } };

    const res = ctx.model.SysMenu.destroy(query);
    return res
  }

  // 查找当前菜单下的子菜单，目录以及菜单
  async findChildMenus({ menu_id }) {
    const { ctx } = this
    const allMenus = []
    const menus = await ctx.model.SysMenu.findAll({ where: { parent_id: menu_id } })
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].type !== 2) {
        // 子目录下是菜单或目录，继续往下级查找
        const child = await this.findChildMenus({ menu_id: menus[i].id })
        allMenus.push(child)
      }
      allMenus.push(menus[i].id)
    }

    return allMenus
  }

  /**
   * 详情
   * @param id
   * @returns {Promise<*>}
   */
  async info({ id }) {
    const { ctx } = this
    const res = await ctx.model.SysMenu.findByPk(id)
    return res
  }

  // 获取某个菜单以及关联的父菜单的信息
  async getMenuItemAndParentInfo({ id }) {
    const { ctx } = this
    const menu = await ctx.model.SysMenu.findByPk(id)
    let parentMenu = null
    if (menu && menu.parent_id) {
      parentMenu = await ctx.model.SysMenu.findByPk(menu.parent_id)
    }
    return { menu, parentMenu };
  }

  // 查找节点路由是否存在
  async findRouterExist({ router }) {
    const { ctx } = this
    const menus = await ctx.model.SysMenu.findOne({ where: { router } })
    return !_.isEmpty(menus);
  }
}

module.exports = SysMenuService;

'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SystemMenuService extends Service {

  /**
   * 获取所有菜单
   * @return {Promise<*>}
   */
  async list() {
    const { ctx } = this
    const res = await ctx.model.SystemMenu.findAll()
    return res
  }

  /**
   * 创建
   * @param parent_id
   * @param name
   * @param router
   * @param type
   * @param icon
   * @param order_num
   * @param view_path
   * @param keepalive
   * @param is_hidden
   * @returns {Promise<*>}
   */
  async create({ parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden }) {
    const { ctx } = this
    const res = await ctx.model.SystemMenu.create({ parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden })
    return res
  }

  /**
   * 更新
   * @param id
   * @param parent_id
   * @param name
   * @param router
   * @param type
   * @param icon
   * @param order_num
   * @param view_path
   * @param keepalive
   * @param is_hidden
   * @returns {Promise<*>}
   */
  async update({ id, parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden }) {
    const { ctx } = this
    const res = await ctx.model.SystemMenu.update(id, { parent_id, name, router, type, icon, order_num, view_path, keepalive, is_hidden })
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

    const res = ctx.model.SystemMenu.destroy(query);
    return res
  }

  /**
   * 获取当前菜单下的子菜单、目录以及菜单
   * @param id
   * @return {Promise<*[]>}
   */
  async getChildMenus({ id }) {
    const { ctx } = this
    const res = []
    console.log(id)
    const menus = await ctx.model.SystemMenu.findAll({ where: { parent_id: id } })
    for (let i = 0; i < menus.length; i++) {
      // 子目录下是菜单或目录，继续往下级查找
      const child = await this.getChildMenus({ id: menus[i].id })
      res.push(child)
      res.push(menus[i].id)
    }

    return res
  }

  /**
   * 详情
   * @param id
   * @return {Promise<*>}
   */
  async get({ id }) {
    const { ctx } = this
    const res = await ctx.model.SystemMenu.findByPk(id)
    return res
  }

  /**
   * 获取某个菜单以及关联的父菜单的信息
   * @param id
   * @returns {Promise<{menu: *, parentMenu: null}>}
   */
  async getMenuItemAndParentInfo({ id }) {
    const { ctx } = this
    const menu = await ctx.model.SystemMenu.findByPk(id)
    let parentMenu = null
    if (menu && menu.parent_id) {
      parentMenu = await ctx.model.SystemMenu.findByPk(menu.parent_id)
    }
    return { menu, parentMenu };
  }
}

module.exports = SystemMenuService;
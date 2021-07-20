'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SysUserService extends Service {

  /**
     * 创建
     * @param username
     * @param password
     * @return {Promise<boolean>}
     */
  async create({ ref_id, type }) {
    const { ctx } = this;
    const res = await ctx.model.SysPower.create({ ref_id, type });
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
    const res = await ctx.model.SysPower.destroy(query);
    return res
  }

  /**
   * 获取我的菜单权限
   * @return {Promise<*[]>}
   */
  async getMyPowerMenus() {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const res = []

    // 获取用户的所有角色
    const user_id = ctx.request.user.id
    const roles = await ctx.model.SysUserRole.findAll({ where: { user_id } })
    const roleIds = _.map(roles, 'id')

    // 获取所有角色的所有权限
    let powerIds = []
    for (const id of roleIds) {
      const rolePowers = await ctx.model.SysRolePower.findAll({ where: { role_id: id } })
      powerIds = _.concat(powerIds, _.map(rolePowers, 'id'))
      powerIds = _.uniq(powerIds)
    }
    // 获取所有菜单
    const menuIds = []
    for (const id of powerIds) {
      const power = await ctx.model.SysPower.findOne({ where: { type: 'menu', id } })
      menuIds.push(power.ref_id)
    }
    for (const id of menuIds) {
      res.push(await ctx.model.SysMenu.findByPk(id))
    }

    return res
  }

  /**
   * 获取我的操作权限
   * @return {Promise<*[]>}
   */
  async getMyPowerOperations() {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const res = []

    // 获取用户的所有角色
    const user_id = ctx.request.user.id
    const roles = await ctx.model.SysUserRole.findAll({ where: { user_id } })
    const roleIds = _.map(roles, 'id')

    // 获取所有角色的所有权限
    let powerIds = []
    for (const id of roleIds) {
      const rolePowers = await ctx.model.SysRolePower.findAll({ where: { role_id: id } })
      powerIds = _.concat(powerIds, _.map(rolePowers, 'id'))
      powerIds = _.uniq(powerIds)
    }
    // 获取所有操作
    const operationIds = []
    for (const id of powerIds) {
      const power = await ctx.model.SysPower.findOne({ where: { type: 'operation', id } })
      operationIds.push(power.ref_id)
    }
    for (const id of operationIds) {
      res.push(await ctx.model.SysMenu.findByPk(id))
    }

    return res
  }

  /**
   * 获取我的文件权限（需要的时候再查，例如到某个具体的页面时？不然上亿个文件名称不可能登录的时候一下子全返回给前端）
   */
  getMyPowerFiles() {}

  /**
   * 获取我的页面元素权限（需要的时候再查，例如到某个具体的页面时？）
   */
  getMyPowerElements() {}
}

module.exports = SysUserService;

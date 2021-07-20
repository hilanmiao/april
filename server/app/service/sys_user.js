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
  async create({ username, password }) {
    const { ctx } = this;
    let res = null
    const user = await ctx.model.SysUser.findOne({ where: { username } })
    if (!_.isEmpty(user)) {
      return false
    }
    res = await ctx.model.SysUser.create({ username, password });
    return res
  }

  /**
   * 获取详情
   * @param id
   * @return {Promise<*>}
   */
  async get({ id }) {
    const { ctx } = this;

    const res = await ctx.model.SysUser.findByPk(id);

    return res
  }

  /**
   * 获取详情-基本信息
   * @param id
   * @return {Promise<*>}
   */
  async getBasic({ id }) {
    const { ctx } = this;

    const res = await ctx.model.SysUser.findByPk(id, { attributes: ['id', 'display_name', 'mobile', 'company', 'position', 'avatar'] });

    return res
  }
}

module.exports = SysUserService;

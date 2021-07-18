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
    const user = await ctx.model.SysUser.findOne({ where: { username } })
    if (!_.isEmpty(user)) {
      return false
    }
    await ctx.model.SysUser.create({ username, password });
    return true
  }
}

module.exports = SysUserService;

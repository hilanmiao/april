'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class LoginService extends Service {

  /**
   * 登录
   * @param username
   * @param password
   * @return {Promise<{accessToken: string, user: {}, refreshToken: string}>}
   */
  async login({ username, password }) {
    const { ctx } = this;
    const data = {
      user: {},
      accessToken: '',
      refreshToken: ''
    };

    const user = await ctx.model.SysUser.findByCredentials(username, password);
    // 未找到用户
    if (!user) {
      return false
    }

    const session = await ctx.model.SysSession.createInstance(user);
    const accessToken = await ctx.helper.createToken(user, null, this.config.sysConfig.expirationPeriod.short);
    const refreshToken = await ctx.helper.createToken(null, session, this.config.sysConfig.expirationPeriod.long);

    data.user = user;
    data.accessToken = accessToken;
    data.refreshToken = refreshToken;

    return data
  }
}

module.exports = LoginService;

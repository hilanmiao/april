'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class LoginService extends Service {

  /**
   * 登录
   * @param username
   * @param password
   * @return {Promise<{code: number}|{accessToken: string, user: {}, refreshToken: string}>}
   */
  async login({ username, password }) {
    const { ctx } = this;
    const res = {
      user: {},
      accessToken: '',
      refreshToken: ''
    };

    const user = await ctx.model.SystemUser.findByCredentials(username, password);
    if (!user) {
      // 用户名或密码不正确
      return { code: 20101 }
    }

    // 保存登录日志
    await ctx.service.systemLoginLog.create({ username: user.username })

    const session = await ctx.model.SystemSession.createInstance(user);
    const accessToken = await ctx.helper.createToken(user, null, this.config.sysConfig.expirationPeriod.short);
    const refreshToken = await ctx.helper.createToken(null, session, this.config.sysConfig.expirationPeriod.long);

    // res.user = user;
    res.accessToken = accessToken;
    res.refreshToken = refreshToken;

    return res
  }

  /**
   * 登出
   * @returns {Promise<Model|null|any>}
   */
  async logout() {
    const { ctx } = this;

    const session = ctx.request.session
    console.log(ctx.request.session)
    const res = ctx.model.SystemSession.findByPk(session.id)

    return res
  }
}

module.exports = LoginService;

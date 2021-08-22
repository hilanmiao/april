'use strict';

const Controller = require('../core/controller');
const _ = require('lodash')

class LoginController extends Controller {

  /**
   * 登录
   * @return {Promise<void>}
   */
  async login() {
    const { ctx } = this;
    const { username, password, captchaId, verifyCode } = ctx.request.body

    // 检查验证码
    const resVerify = await ctx.service.common.verifyImgCaptcha({ id: captchaId, code: verifyCode })

    if (!resVerify) {
      // 验证码不正确
      this.fail({ ctx, code: 20106 })
      return
    }

    // 登录
    const resLogin = await ctx.service.login.login({ username, password })
    if (!resLogin) {
      this.fail({ ctx, code: 10003 })
      return
    }

    if (!resLogin.user.is_enabled) {
      this.fail({ ctx, code: 10003 })
      return
    }

    this.success({ ctx, data: { accessToken: resLogin.accessToken, refreshToken: resLogin.refreshToken } })
  }

  /**
   * 登出
   */
  logout() {
    const { ctx } = this
    this.success({ ctx })
  }
}

module.exports = LoginController;

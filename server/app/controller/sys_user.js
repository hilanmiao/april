'use strict';

const Controller = require('../core/controller');

class SysUserController extends Controller {

  /**
   * 获取图片验证码
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    const res = await ctx.service.sysUser.create({ username: 'admin', password: '123456' })
    if (!res) {
      this.fail({ ctx, code: 10001 })
    }
    this.success({ ctx, data: res })
  }

  /**
   * 获取详情
   * @returns {Promise<void>}
   */
  async get() {
    const { ctx } = this;
    const id = ctx.request.user.id
    const res = await ctx.service.sysUser.get({ id })
    if (!res) {
      this.fail({ ctx, code: 10003 })
      return
    }

    this.success({ ctx, data: res })
  }

  /**
   * 获取详情-基本信息
   * @returns {Promise<void>}
   */
  async getBasic() {
    const { ctx } = this;
    const id = ctx.request.user.id
    const res = await ctx.service.sysUser.getBasic({ id })
    if (!res) {
      this.fail({ ctx, code: 10003 })
      return
    }

    this.success({ ctx, data: res })
  }

}

module.exports = SysUserController;

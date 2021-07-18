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
}

module.exports = SysUserController;

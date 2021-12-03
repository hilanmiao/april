'use strict';

const Controller = require('../core/controller');

class SystemOnlineUserController extends Controller {

  /**
   * 下线
   * @return {Promise<void>}
   */
  async kick() {
    const { ctx } = this;
    const { ids } = ctx.request.body

    const res = await ctx.service.systemOnlineUser.kick({ ids })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * @returns {Promise<void>}
   */
  async page() {
    const { ctx } = this;
    const { page, limit, name } = ctx.request.query

    const res = await ctx.service.systemOnlineUser.page({ page, limit, name })

    this.success({ ctx, data: res })
  }
}

module.exports = SystemOnlineUserController;

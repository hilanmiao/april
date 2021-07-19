'use strict';

const Controller = require('../core/controller');

class SysPowerController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    const { ref_id, type } = ctx.request.body
    const res = await ctx.service.sysPower.create({ ref_id, type })
    if (!res) {
      this.fail({ ctx, code: 10001 })
      return
    }

    this.success({ ctx, data: res })
  }

  /**
   * 删除
   * @return {Promise<void>}
   */
  async delete() {
    const { ctx } = this;
    const { ids } = ctx.request.body
    const res = await ctx.service.sysPower.delete({ ids })
    if (!res) {
      this.fail({ ctx, code: 10001 })
      return
    }

    this.success({ ctx, data: res })
  }

  /**
   * 获取我的菜单权限
   * @return {Promise<void>}
   */
  async getMyPowerMenus() {
    const { ctx } = this;
    const res = await ctx.service.sysPower.getMyPowerMenus()

    this.success({ ctx, data: res })
  }

  /**
   * 获取我的操作权限
   * @return {Promise<void>}
   */
  async getMyPowerOperations() {
    const { ctx } = this;
    const res = await ctx.service.sysPower.getMyPowerOperations()

    this.success({ ctx, data: res })
  }
}

module.exports = SysPowerController;

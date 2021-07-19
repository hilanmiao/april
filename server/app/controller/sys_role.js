'use strict';

const Controller = require('../core/controller');

class SysRoleController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    const { name } = ctx.request.body
    const res = await ctx.service.sysRole.create({ name })
    if (!res) {
      this.fail({ ctx, code: 10001 })
      return
    }

    this.success({ ctx, data: res })
  }

  /**
   * 更新
   * @return {Promise<void>}
   */
  async update() {
    const { ctx } = this;
    const id = ctx.params.id
    const { name } = ctx.request.body
    const res = await ctx.service.sysRole.update({ id, name })
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
    const res = await ctx.service.sysRole.delete({ ids })
    if (!res) {
      this.fail({ ctx, code: 10001 })
      return
    }

    this.success({ ctx, data: res })
  }

}

module.exports = SysRoleController;

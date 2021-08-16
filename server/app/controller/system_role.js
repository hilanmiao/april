'use strict';

const Controller = require('../core/controller');

class SystemRoleController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    ctx.validate({ name: 'string' }, ctx.request.body)
    const { name, powerMenus, powerOperations } = ctx.request.body

    const res = await ctx.service.systemRole.create({ name, powerMenus, powerOperations })
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
    ctx.validate({ id: 'string', name: 'string' }, ctx.request.body)
    const { id, name, powerMenus, powerOperations } = ctx.request.body

    const res = await ctx.service.systemRole.update({ id, name, powerMenus, powerOperations })
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
    const res = await ctx.service.systemRole.delete({ ids })
    if (!res) {
      this.fail({ ctx, code: 10001 })
      return
    }

    this.success({ ctx, data: { count: res } })
  }

  async get() {
    const { ctx } = this;
    ctx.validate({ id: 'string' }, ctx.request.query)
    const { id } = ctx.request.query

    const res = await ctx.service.systemRole.get({ id })
    if (!res) {
      this.fail({ ctx, code: 10001 })
      return
    }

    this.success({ ctx, data: res })
  }

  async list() {
    const { ctx } = this;
    const res = await ctx.service.systemRole.list()

    this.success({ ctx, data: res })
  }

  async page() {
    const { ctx } = this;
    const { page, limit } = ctx.request.query
    const res = await ctx.service.systemRole.page({ page, limit })
    const data = {
      list: res.rows,
      pagination: {
        page,
        size: limit,
        total: res.count
      }
    }

    this.success({ ctx, data })
  }
}

module.exports = SystemRoleController;

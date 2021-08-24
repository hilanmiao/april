'use strict';

const Controller = require('../core/controller');

class SystemUserController extends Controller {

  /**
   * 创建
   * @return {Promise<void>}
   */
  async create() {
    const { ctx } = this;
    ctx.validate({ username: 'string' }, ctx.request.body)
    const { roleId: role_id, username, displayName: display_name, realName: real_name, position, company, email, mobile, sex, avatar, introduction, status } = ctx.request.body

    const res = await ctx.service.systemUser.create({ role_id, username, display_name, real_name, position, company, email, mobile, sex, avatar, introduction, status })

    if (res.code) {
      this.fail({ ctx, code: res.code })
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
    ctx.validate({ id: 'string', realName: 'string' }, ctx.request.body)
    const { id, roleId: role_id, displayName: display_name, realName: real_name, position, company, email, mobile, sex, avatar, introduction, status } = ctx.request.body

    const res = await ctx.service.systemUser.update({ id, role_id, display_name, real_name, position, company, email, mobile, sex, avatar, introduction, status })

    if (res.code) {
      this.fail({ ctx, code: res.code })
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

    const res = await ctx.service.systemUser.delete({ ids })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 详情
   * @return {Promise<void>}
   */
  async get() {
    const { ctx } = this;
    ctx.validate({ id: 'string' }, ctx.request.query)
    const { id } = ctx.request.query

    const res = await ctx.service.systemUser.get({ id })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

  /**
   * 查询
   * @return {Promise<void>}
   */
  async list() {
    const { ctx } = this;

    const res = await ctx.service.systemUser.list()

    this.success({ ctx, data: res })
  }

  /**
   * 分页
   * @return {Promise<void>}
   */
  async page() {
    const { ctx } = this;
    const { page, limit, username } = ctx.request.query

    const res = await ctx.service.systemUser.page({ page, limit, username })

    this.success({ ctx, data: res })
  }

  /**
   * 获取详情-基本信息
   * @return {Promise<void>}
   */
  async getUserBasic() {
    const { ctx } = this;
    const id = ctx.request.user.id

    const res = await ctx.service.systemUser.getUserBasic({ id })

    if (res.code) {
      this.fail({ ctx, code: res.code })
      return
    }
    this.success({ ctx, data: res })
  }

}

module.exports = SystemUserController;

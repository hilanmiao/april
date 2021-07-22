'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SystemRoleService extends Service {


  /**
   * 创建
   * @param name
   * @return {Promise<*>}
   */
  async create({ name }) {
    const { ctx } = this;
    const res = await ctx.model.SystemRole.create({ name });
    return res
  }

  /**
   * 更新
   * @param name
   * @return {Promise<*>}
   */
  async update({ id, name }) {
    const { ctx } = this;
    const res = await ctx.model.SystemRole.update(id, { name });
    return res
  }

  /**
   * 删除
   * @param ids
   * @return {Promise<*>}
   */
  async delete({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: ids } } };
    const res = await ctx.model.SystemPower.destroy(query);
    return res
  }
}

module.exports = SystemRoleService;

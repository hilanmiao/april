'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SystemRoleService extends Service {

  /**
   * 创建
   * @param name
   * @return {Promise<*>}
   */
  async create({ name, powerMenus, powerOperations }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      const modelRole = await ctx.model.SystemRole.create({ name }, { transaction });
      powerMenus = _.map(powerMenus, item => {
        return { role_id: modelRole.id, power_id: item }
      });
      await ctx.model.SystemRolePower.bulkCreate(powerMenus, { transaction })

      // 提交事务
      await transaction.commit()
      res = { role_id: modelRole.id }
      return res
    } catch (e) {
      await transaction.rollback();
      return res
    }
  }

  /**
   * 更新
   * @param name
   * @return {Promise<*>}
   */
  async update({ id, name, powerMenus, powerOperations }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      const modelRole = await ctx.model.SystemRole.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
      await modelRole.update({ name })
      await ctx.model.SystemRolePower.destroy({ where: { role_id: id }, transaction })
      powerMenus = _.map(powerMenus, item => {
        return { role_id: modelRole.id, power_id: item }
      });
      await ctx.model.SystemRolePower.bulkCreate(powerMenus, { transaction })

      // 提交事务
      await transaction.commit()
      res = { role_id: modelRole.id }
      return res
    } catch (e) {
      await transaction.rollback();
      return res
    }
  }

  /**
   * 删除
   * @param ids
   * @return {Promise<*>}
   */
  async delete({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = { where: { id: { [Op.in]: ids } } };
    const res = await ctx.model.SystemRole.destroy(op);
    return res
  }

  async get({ id }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        id
      },
      include: [
        {
          model: ctx.model.SystemPower,
          attributes: ['id']
        }
      ]
    }
    const res = await ctx.model.SystemRole.findOne(op);
    return res
  }

  async count() {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const res = await ctx.model.SystemRole.count()
    return res;
  }

  async list() {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const res = await ctx.model.SystemRole.findAll()
    return res;
  }

  async page({ page, limit }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20
    }
    const res = await ctx.model.SystemRole.findAndCountAll(op);
    return res;
  }
}

module.exports = SystemRoleService;

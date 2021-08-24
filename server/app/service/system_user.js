'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SystemUserService extends Service {

  /**
   * 创建
   * @param role_id
   * @param username
   * @param display_name
   * @param real_name
   * @param position
   * @param company
   * @param email
   * @param mobile
   * @param sex
   * @param avatar
   * @param introduction
   * @param status
   * @return {Promise<{user_id}|{code: number}>}
   */
  async create({ role_id, username, display_name, real_name, position, company, email, mobile, sex, avatar, introduction, status }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 创建用户
      const modelUser = await ctx.model.SystemUser.create({ username, display_name, real_name, position, company, email, mobile, sex, avatar, introduction, status }, { transaction });

      // 提交事务
      await transaction.commit()
      res = { user_id: modelUser.id }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 更新
   * @param id
   * @param role_id
   * @param display_name
   * @param real_name
   * @param position
   * @param company
   * @param email
   * @param mobile
   * @param sex
   * @param avatar
   * @param introduction
   * @param status
   * @return {Promise<{user_id}|{code: number}>}
   */
  async update({ id, role_id, display_name, real_name, position, company, email, mobile, sex, avatar, introduction, status }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 更新角色
      const modelUser = await ctx.model.SystemUser.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
      await modelUser.update({ display_name, real_name, position, company, email, mobile, sex, avatar, introduction, status }, { transaction })


      // 提交事务
      await transaction.commit()
      res = { user_id: modelUser.id }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 删除
   * @param ids
   * @return {Promise<{code: number}|{count}>}
   */
  async delete({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    // const op = { where: { id: { [Op.in]: ids } } };
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      for (const id of ids) {
        const modelUser = await ctx.model.SystemUser.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
        // 删除用户
        await modelUser.destroy({ transaction })
      }

      // 提交事务
      await transaction.commit()
      res = { count: ids.length }

      return res
    } catch (e) {
      console.log(e)
      ctx.logger.error(e)
      await transaction.rollback();

      // 操作失败
      return { code: 20107 }
    }
  }

  /**
   * 查询
   * @param id
   * @return {Promise<*|{code: number}>}
   */
  async get({ id }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        id
      },
      include: []
    }

    const res = await ctx.model.SystemUser.findOne(op);
    if (!res) {
      // 未找到用户
      return { code: 20501 }
    }

    return res
  }

  /**
   * 查询
   * @return {Promise<*>}
   */
  async list() {
    const { ctx, app: { Sequelize: { Op } } } = this;

    const res = await ctx.model.SystemUser.findAll()

    return res;
  }

  /**
   * 分页
   * @param page
   * @param limit
   * @param username
   * @return {Promise<{pagination: {total, size, page}, list: (number|number|M[]|TInstance[]|SQLResultSetRowList|HTMLCollectionOf<HTMLTableRowElement>|string|*)}>}
   */
  async page({ page, limit, username }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        username: { [Op.like]: `%${username || ''}%` },
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20
    }

    let res = await ctx.model.SystemUser.findAndCountAll(op);
    res = {
      list: res.rows,
      pagination: {
        page,
        size: limit,
        total: res.count
      }
    }

    return res;
  }

  /**
   * 获取详情-基本信息
   * @param id
   * @return {Promise<*>}
   */
  async getUserBasic({ id }) {
    const { ctx } = this;
    const op = {
      where: {
        id
      },
      attributes: ['id', 'display_name', 'real_name', 'position', 'company', 'email', 'mobile', 'sex', 'avatar', 'introduction', 'status']
    }

    const res = await ctx.model.SystemUser.findOne(op);

    if (!res) {
      // 未找到用户
      return { code: 20501 }
    }

    return res
  }
}

module.exports = SystemUserService;

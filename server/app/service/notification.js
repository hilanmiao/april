'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class NotificationService extends Service {

  /**
   * 创建
   * @param title
   * @param content
   * @param type
   * @param recipient_ids
   * @param remark
   * @return {Promise<{code: number}|{count}>}
   */
  async create({ title, content, type, recipient_ids, remark }) {
    const { ctx } = this;
    const manager_id = ctx.request.user.id
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 批量创建
      const notifications = _.map(recipient_ids, item => {
        return { title, content, type, recipient_id: item, manager_id, remark }
      });
      await ctx.model.Notification.bulkCreate(notifications, { ignoreDuplicates: true, transaction })

      // 提交事务
      await transaction.commit()
      res = { count: recipient_ids.length }

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
   * @param title
   * @param content
   * @param type
   * @param remark
   * @returns {Promise<{code: number}|{id}>}
   */
  async update({ id, title, content, type, remark }) {
    const { ctx } = this;
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

      // 更新通知（不能更新接收者，而且最好是不要更新，而是删除并发送新的通知，社会）
      const modelNofication = await ctx.model.Notification.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
      await modelNofication.update({ title, content, type, remark }, { transaction })

      // 提交事务
      await transaction.commit()
      res = { id: modelNofication.id }

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
        const modelNotification = await ctx.model.Notification.findOne({ where: { id }, transaction, lock: true, skipLocked: true });
        // 删除用户通知
        await ctx.model.NotificationUser.destroy({ where: { notification_id: id }, transaction })
        // 删除通知
        await modelNotification.destroy({ transaction })
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
   * 详情
   * @param id
   * @return {Promise<awaited Bluebird<TInstance | null> | Promise<Model> | Promise<Model | null>|{code: number}>}
   */
  async get({ id }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        id
      }
    }

    const res = await ctx.model.Notification.findOne(op);
    if (!res) {
      // 未找到通知
      return { code: 20701 }
    }

    return res
  }

  /**
   * 查询
   * @return {Promise<awaited Bluebird<TInstance[]> | Promise<Model[]>>}
   */
  async list() {
    const { ctx, app: { Sequelize: { Op } } } = this;

    const res = await ctx.model.Notification.findAll()

    return res;
  }

  /**
   * 分页
   * @param page
   * @param limit
   * @param title
   * @return {Promise<{pagination: {total, size, page}, list: number | TInstance[] | M[] | SQLResultSetRowList | HTMLCollectionOf<HTMLTableRowElement> | string}>}
   */
  async page({ page, limit, title }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        title: { [Op.like]: `%${title || ''}%` },
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20
    }

    let res = await ctx.model.Notification.findAndCountAll(op);
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
}

module.exports = NotificationService;

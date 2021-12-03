'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class SystemOnlineUserService extends Service {

  /**
   * 下线
   * @param ids
   * @return {Promise<{code: number}|{count}>}
   */
  async kick({ ids }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    // const op = { where: { id: { [Op.in]: ids } } };
    let res,
      transaction;
    try {
      // 开启事务
      transaction = await ctx.model.transaction();

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
   * 分页
   * @param page
   * @param limit
   * @param name
   * @return {Promise<{pagination: {total, size, page}, list: (number|number|M[]|TInstance[]|SQLResultSetRowList|HTMLCollectionOf<HTMLTableRowElement>|string|*)}>}
   */
  async page({ page, limit, name }) {
    const { ctx, app: { Sequelize: { Op } } } = this;
    const op = {
      where: {
        name: { [Op.like]: `%${name || ''}%` },
      },
      order: [
        [ 'created_at', 'desc' ]
      ],
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20
    }

    const nsp = app.io.of('/');

    nsp.adapter.clients(rooms, (err, clients) => {
      logger.info('#online_join', clients);

    });
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

module.exports = SystemOnlineUserService;

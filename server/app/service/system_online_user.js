'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')
const dayjs = require('dayjs')

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
  async page({ page, limit, dateRange }) {
    const { ctx, app, app: { Sequelize: { Op } } } = this;
    const op = {
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20
    }
    const redisOnlineUsersKey = app.config.sysConfig.redis.redisOnlineUsersKey
    let total = 0
    let redisResult = []
    const list = []
    if (dateRange && dateRange.length) {
      const min = dayjs(dateRange[0]).unix()
      const max = dayjs(dateRange[1]).unix()
      total = await app.redis.zcount(redisOnlineUsersKey, min, max)
      // ZREVRANGEBYSCORE集合中按得分从高到底排序,所以"max"在前面,"min"在后面, ZRANGEBYSCORE集合中按得分从底到高排序,所以"min"在前面,"max"在后面。
      redisResult = await app.redis.zrevrangebyscore(redisOnlineUsersKey, max, min, 'WITHSCORES', 'LIMIT', op.offset, op.limit)
    } else {
      total = await app.redis.zcount(redisOnlineUsersKey, '-inf', '+inf')
      redisResult = await app.redis.zrevrangebyscore(redisOnlineUsersKey, '+inf', '-inf', 'WITHSCORES', 'LIMIT', op.offset, op.limit)
    }
    for (let i = 0; i < redisResult.length; i += 2) {
      list.push({
        username: redisResult[i],
        created_at: redisResult[i + 1]
      })
    }

    const res = {
      list,
      pagination: {
        page,
        size: limit,
        total
      }
    }

    return res;
  }
}

module.exports = SystemOnlineUserService;

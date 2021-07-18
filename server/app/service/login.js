'use strict';

const Service = require('egg/index').Service;
const _ = require('lodash')

class LoginService extends Service {

  /**
   * 登录
   * @param username
   * @param password
   * @return {Promise<{accessToken: string, user: {}, refreshToken: string}>}
   */
  async login({ username, password }) {
    const { ctx } = this;
    const data = {
      user: {},
      accessToken: '',
      refreshToken: ''
    };

    const user = await ctx.model.SysUser.findByCredentials(username, password);
    // 未找到用户
    if (!user) {
      return false
    }

    const session = await ctx.model.SysSession.createInstance(user);
    const accessToken = await ctx.helper.createToken(user, null, this.config.sysConfig.expirationPeriod.short);
    const refreshToken = await ctx.helper.createToken(null, session, this.config.sysConfig.expirationPeriod.long);

    data.user = user;
    data.accessToken = accessToken;
    data.refreshToken = refreshToken;

    return data
  }

  async getBaseInfo({ id }) {
    const { ctx } = this;

    const user = await ctx.model.SysUser.findByPk(id, { attributes: ['id', 'display_name', 'mobile', 'company', 'position', 'head_thumb'] });
    if (!user) {
      return false
    }

    return user
  }

  async getPermmenu({ id }) {
    const { ctx, app: { Sequelize: { Op } } } = this;


    // 根据角色获取所有菜单
    const menus = await ctx.model.SysMenu.findAll()
    // 获取当前用户的所有权限
    let perms = []
    const result = await ctx.model.SysMenu.findAll({ where: { perms: { [Op.not]: null }, type: '2' } })
    if (!_.isEmpty(result)) {
      result.forEach(e => {
        perms = _.concat(perms, e.perms.split(','));
      });
      perms = _.uniq(perms);
    }
    return { menus, perms }
  }
}

module.exports = LoginService;

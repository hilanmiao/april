'use strict';

module.exports = (options, app) => {
  return async function(ctx, next) {
    console.log('middleware token required');

    const { header: { authorization }, url } = ctx;
    const decodedToken = ctx.helper.decodeToken(authorization);

    // 如果token验证不正确或没有
    if (!decodedToken) {
      ctx.helper.fail({ ctx, code: 10003, message: 'Invalid Token' });
      return
    }

    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      // Tips: 注意这里的message是固定的，不能改，前端根据文字判断是哪种token过期
      if (decodedToken.user) {
        ctx.helper.fail({ ctx, code: 10003, message: 'Expired Access Token' });
      } else {
        ctx.helper.fail({ ctx, code: 10003, message: 'Expired Refresh Token' });
      }
      return
    }

    // 如果没有过期
    if (decodedToken.user) {
      let user = decodedToken.user;

      // token 验证通过，把当前完整的 user 挂载到ctx.request 上
      user = await ctx.model.SystemUser.findOne({ where: { username: user.username } });
      ctx.request.user = user;
      await next();
    } else if (decodedToken.sessionId) {
      const session = await ctx.model.SystemSession.findByCredentials(decodedToken.sessionId, decodedToken.sessionKey)

      if (!session) {
        // 检验失败，这个用户的session可能已经被删除
        ctx.helper.fail({ ctx, code: 10003, message: 'Session may have been deleted' });
        return
      }
      const user = await ctx.model.SystemUser.findByPk(session.userId)
      if (!user) {
        // 校验失败，这个用户可能已经被删除
        ctx.helper.fail({ ctx, code: 10003, message: 'User may have been deleted' });
        return
      }

      if (user.password !== decodedToken.passwordHash) {
        // 检验失败，用户密码可能已经被修改了（另一台电脑）
        ctx.helper.fail({ ctx, code: 10003, message: 'Password may have been modified' });
        return
      }

      // accessToken和refreshToken都有且都没有过期，就要刷新
      const accessToken = await ctx.helper.createToken(user, null, app.config.sysConfig.expirationPeriod.short)
      const refreshToken = await ctx.helper.createToken(null, session, app.config.sysConfig.expirationPeriod.long)
      // 设置浏览器可以获取自定义的响应头
      ctx.set('Access-Control-Expose-Headers', 'X-Access-Token, X-Refresh-Token')
      ctx.set('X-Access-Token', accessToken)
      ctx.set('X-Refresh-Token', refreshToken)
      // 设置完整的 user 和 session
      ctx.request.user = user;
      ctx.request.session = session
      await next();
    }
  };
};

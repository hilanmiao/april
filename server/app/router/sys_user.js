'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { sysUser } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/sys/user/basic', tokenRequired, sysUser.getBasic);
  apiRouter.resources('sys/user', '/sys/user', sysUser)

};

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemUser } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/system/user/basic', tokenRequired, systemUser.getBasic);
  apiRouter.resources('system/user', '/system/user', systemUser)

};

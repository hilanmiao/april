'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemUser } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/system/user', systemUser.create);
  apiRouter.put('/system/user', systemUser.update);
  apiRouter.delete('/system/user', systemUser.delete);
  apiRouter.get('/system/user', systemUser.get);
  apiRouter.get('/system/user/list', systemUser.list);
  apiRouter.get('/system/user/page', systemUser.page);
  apiRouter.get('/system/user/basic', tokenRequired, systemUser.getUserBasic);
  // apiRouter.resources('system/user', '/system/user', systemUser)
};

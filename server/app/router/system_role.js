'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemRole } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/system/role', systemRole.create);
  apiRouter.put('/system/role', systemRole.update);
  apiRouter.delete('/system/role', systemRole.delete);
  apiRouter.get('/system/role', systemRole.get);
  apiRouter.get('/system/role/list', systemRole.list);
  apiRouter.get('/system/role/page', systemRole.page);
};

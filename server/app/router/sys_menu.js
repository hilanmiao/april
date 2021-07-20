'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { sysMenu } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/sys/menu/list', sysMenu.list);
  apiRouter.get('/sys/menu', sysMenu.get);
  apiRouter.post('/sys/menu', sysMenu.create);
  // apiRouter.put('/sys/menu', sysMenu.update);
  apiRouter.delete('/sys/menu', sysMenu.delete);
  // apiRouter.resources('menu', '/sys/menu', sysMenu)

};

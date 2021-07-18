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
  apiRouter.post('/sys/menu/add', sysMenu.add);
  apiRouter.post('/sys/menu/update', sysMenu.update);
  apiRouter.post('/sys/menu/delete', sysMenu.delete);
  apiRouter.get('/sys/menu/info', sysMenu.info);
  apiRouter.resources('menu', '/sys/menu', sysMenu)

};

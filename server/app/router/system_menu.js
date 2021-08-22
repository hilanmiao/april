'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemMenu } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/system/menu', systemMenu.create);
  apiRouter.put('/system/menu', systemMenu.update);
  apiRouter.delete('/system/menu', systemMenu.delete);
  apiRouter.get('/system/menu/menu-and-parent-menu', systemMenu.getMenuAndParentMenu);
  apiRouter.get('/system/menu/list', systemMenu.list);
};

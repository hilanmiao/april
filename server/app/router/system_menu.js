'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemMenu } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/system/menu', systemMenu.get);
  apiRouter.post('/system/menu', systemMenu.create);
  // apiRouter.put('/system/menu', systemMenu.update);
  apiRouter.delete('/system/menu/:id', systemMenu.delete);
  // apiRouter.resources('menu', '/system/menu', systemMenu)

};

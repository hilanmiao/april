'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemRole } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.resources('system/role', '/system/role', systemRole)

};

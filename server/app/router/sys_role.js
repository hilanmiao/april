'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { sysRole } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.resources('sys/role', '/sys/role', sysRole)

};

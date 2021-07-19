'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { sysPower } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/sys/power/my_power_operations', tokenRequired, sysPower.getMyPowerOperations);
  apiRouter.get('/sys/power/my_power_menus', tokenRequired, sysPower.getMyPowerMenus);
  apiRouter.resources('sys/power', '/sys/power', sysPower)

};

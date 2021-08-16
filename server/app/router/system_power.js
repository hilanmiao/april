'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { systemPower } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/system/power/my_power_operations', tokenRequired, systemPower.getMyPowerOperations);
  apiRouter.get('/system/power/my_power_menus', tokenRequired, systemPower.getMyPowerMenus);
  apiRouter.get('/system/power/power_menus', tokenRequired, systemPower.getPowerMenus);
  apiRouter.resources('system/power', '/system/power', systemPower)

};

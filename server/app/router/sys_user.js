'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller } = app;
  const { sysUser } = controller

  apiRouter.resources('user', '/user', sysUser)

};

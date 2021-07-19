'use strict';

const base = require('./base');

module.exports = app => {
  const { UUID } = app.Sequelize;
  const SysRoleMenu = base.defineModel(app, 'sys_role_menu', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: UUID,
      comment: '用户Id'
    },
    power_id: {
      type: UUID,
      comment: '权限Id'
    }
  }, {
    comment: '系统-角色菜单表'
  });

  return SysRoleMenu;
};

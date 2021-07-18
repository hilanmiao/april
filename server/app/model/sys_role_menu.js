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
    role_id: {
      type: UUID,
      comment: '角色Id'
    }
  }, {
    comment: '系统-角色菜单表'
  });

  return SysRoleMenu;
};

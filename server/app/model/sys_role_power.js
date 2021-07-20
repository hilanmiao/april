'use strict';

const base = require('./base');

module.exports = app => {
  const { UUID } = app.Sequelize;
  const SysRolePower = base.defineModel(app, 'sys_role_power', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    role_id: {
      type: UUID,
      comment: '角色Id'
    },
    power_id: {
      type: UUID,
      comment: '权限Id'
    }
  }, {
    comment: '系统-角色权限表'
  });

  return SysRolePower;
};

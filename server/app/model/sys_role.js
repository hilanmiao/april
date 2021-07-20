'use strict';

const base = require('./base');

module.exports = app => {
  const { STRING, UUID, BOOLEAN } = app.Sequelize;
  const SysRole = base.defineModel(app, 'sys_role', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: STRING,
      comment: '名称'
    }
  }, {
    comment: '系统-角色表'
  });

  return SysRole;
};

'use strict';

const base = require('./base');

module.exports = app => {
  const { STRING, UUID, BOOLEAN } = app.Sequelize;
  const SysOperation = base.defineModel(app, 'sys_operation', {
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
    comment: '系统-操作表'
  });

  return SysOperation;
};

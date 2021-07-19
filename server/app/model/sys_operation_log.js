'use strict';

const base = require('./base');

module.exports = app => {
  const { STRING, UUID, BOOLEAN } = app.Sequelize;
  const SysOperationLog = base.defineModel(app, 'sys_operation_log', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: STRING,
      comment: '名称'
    },
    remark: {
      type: STRING,
      comment: '备注'
    },
    is_enabled: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '是否可用'
    },
  }, {
    comment: '系统-操作日志表'
  });

  return SysOperationLog;
};

'use strict';

const base = require('./base');

module.exports = app => {
  const { STRING, UUID, BOOLEAN } = app.Sequelize;
  const SysFile = base.defineModel(app, 'sys_file', {
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
    comment: '系统-页面元素表'
  });

  return SysFile;
};

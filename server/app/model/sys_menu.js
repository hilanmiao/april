'use strict';

const base = require('./base');

module.exports = app => {
  const { STRING, UUID, BOOLEAN, ENUM, INTEGER } = app.Sequelize;
  const SysMenu = base.defineModel(app, 'sys_menu', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    parent_id: {
      type: UUID,
      comment: '父菜单Id'
    },
    name: {
      type: STRING,
      comment: '名称'
    },
    router: {
      type: STRING,
      comment: '菜单地址'
    },
    type: {
      type: ENUM,
      values: [ 'directory', 'menu' ],
      comment: '类型，directory：目录、menu：菜单'
    },
    icon: {
      type: STRING,
      comment: '对应图标'
    },
    order_num: {
      type: INTEGER,
      comment: '排序'
    },
    view_path: {
      type: STRING,
      comment: '视图地址，对应vue文件'
    },
    keepalive: {
      type: BOOLEAN,
      comment: '路由是否缓存'
    },
    is_show: {
      type: BOOLEAN,
      comment: '是否显示在菜单栏'
    },
    remark: {
      type: STRING,
      comment: '备注'
    }
  }, {
    comment: '系统-菜单表'
  });

  return SysMenu;
};

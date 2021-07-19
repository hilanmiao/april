'use strict';

const Bcrypt = require('bcryptjs');

const base = require('./base');

module.exports = app => {
  const { STRING, BOOLEAN, UUID, ENUM } = app.Sequelize;
  const SysUser = base.defineModel(app, 'sys_user', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: STRING,
      comment: '用户名'
    },
    password: {
      type: STRING,
      comment: '密码'
    },
    display_name: {
      type: STRING,
      comment: '显示名称'
    },
    real_name: {
      type: STRING,
      comment: '真实名称'
    },
    position: {
      type: STRING,
      comment: '职位'
    },
    company: {
      type: STRING,
      comment: '公司'
    },
    email: {
      type: STRING,
      comment: '邮箱'
    },
    mobile: {
      type: STRING,
      comment: '手机'
    },
    sex: {
      type: ENUM,
      values: [ '1', '2' ],
      defaultValue: '1',
      comment: '性别：1:男 2：女'
    },
    avatar: {
      type: STRING,
      comment: '头像'
    },
    introduction: {
      type: STRING,
      comment: '简介'
    },
    is_enabled: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '是否可用'
    },
    github_id: {
      type: STRING,
      comment: 'githubId'
    },
  }, {
    comment: '系统-用户表'
  });

  // 有context的时候可以用this
  SysUser.findByCredentials = async function(username, password) {
    const user = await SysUser.findOne({ where: { username } });
    if (!user) {
      return false;
    }

    const source = user.password;

    const passwordMatch = await Bcrypt.compare(password, source);
    if (passwordMatch) {
      return user;
    }

    return false;
    // return await this.findOne({
    //   where: {
    //     username
    //   }
    // })
  };

  // 没有context的时候只能用prototype（和普通函数不冲突）
  SysUser.prototype.findByCredentials = async function(username, password) {
    return await SysUser.findOne({
      where: {
        username,
      },
    });
  };

  // 生成哈希
  SysUser.generateHash = async function generateHash(key) {
    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(key, salt);
    return { key, hash };
  };

  SysUser.prototype.generateHash = async function generateHash(key) {
    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(key, salt);
    return { key, hash };
  };

  async function generateHash(key) {
    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(key, salt);
    return { key, hash };
  }

  // 添加钩子
  SysUser.beforeCreate((user, options) => {
    return generateHash(user.password).then(({ hash }) => {
      user.password = hash;
    });
    // 需要返回一个promise
    // return new Promise((resolve, reject) => {
    //   user.password = ''
    //   console.log('-------哈希后的密码：' + user.password);
    //   return resolve(user, options);
    // });
  });

  SysUser.associate = function() {
  };

  return SysUser;
};

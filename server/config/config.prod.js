/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

// 系统公共配置项目
const sysConfig = require('./config_sys');
// 根据不同环境导入不同配置
const envConfig = require('./config_env_prod');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1626422927421_6940';

  // 打开前置代理模式
  config.proxy = true
  config.maxProxyCount = 1;

  // 集群
  config.cluster = {
    listen: {
      path: '',
      port: parseInt(envConfig.port),
      hostname: '',
    },
  };

  // 日志
  config.logger = {
    outputJSON: true
  }

  // 全局设置响应头
  config.globalHeader = {
    'Powered-by': envConfig.name,
  };

  // 模板配置
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'path/to/another'),
    ].join(','),
    mapping: {
      '.nj': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks', // 默认模板引擎
    defaultExtension: '.nj', // 省略.nj后缀名
  };

  //  关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 白名单
    domainWhiteList: ['*'],
  };

  // 允许跨域
  config.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 上传文件配置
  config.multipart = {
    // mode: 'file',  //file模式上传  默认是流的形式上传
    fileExtensions: ['.rar', '.7z'], // 添加不在默认白名单中的文件类型
    fileSize: '100mb'
  };

  // 配置表单提交的最大限制
  config.bodyParser = {
    jsonLimit: '10mb'
  };

  // sequelize
  config.sequelize = {
    dialect: 'mysql', // 表示使用mysql
    host: envConfig.mysql.host, // 连接的数据库主机地址
    port: envConfig.mysql.port, // mysql服务端口
    database: envConfig.mysql.database, // 数据库名
    username: envConfig.mysql.user, // 数据库用户名
    password: envConfig.mysql.password, // 数据库密码
    timezone: '+08:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    define: {
      freezeTableName: true, // 设置后表不用加s
      timestamps: true, // 禁用时间戳 creaedAt 转 created_at问题
      underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    },
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: false,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };

  // redis
  config.redis = {
    client: {
      port: envConfig.redis.port,
      host: envConfig.redis.host,
      password: envConfig.redis.password,
      db: envConfig.redis.db,
    },
  };

  // 添加你的全局中间件(路由的单独中间件顺序在全局之后)
  config.middleware = ['errorHandler'];

  // 其他配置
  config.sysConfig = sysConfig
  config.envConfig = envConfig

  return {
    ...config
  };
};

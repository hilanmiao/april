'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async index() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    console.log(message)
    await ctx.socket.emit('res', { name: 'server', msg: `Hi! I\'ve got your message: ${message.msg}` });
  }

}

module.exports = DefaultController;

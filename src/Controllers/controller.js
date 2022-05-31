import axios from "axios"

import utils from '../utils/utils.js'

class Controller {
  constructor(ctx, url) {
    this.ctx = ctx
    this.url = url
    this.seconds = [
      1800,
      2040,
      2160,
      2280,
      2400,
    ]
    this.generateMessage()
  }

  getData() {
    return axios.get(this.url).then(res => ({
      data: res.data.rows,
      total: res.data.rowCount
    })).catch(err => {
      this.ctx.reply('Something went wrong whit dota 2 api, try again')
    })
  }

  sendMessage(msg) {
    this.log()
    this.ctx.replyWithHTML(msg)
  }

  log() {
    utils.log(`'${this.ctx.match}' is requested by ${this.ctx.from.first_name}`)
  }

}

export default Controller

import { Telegraf, Markup } from 'telegraf'
import registerUser from './registerUser.js'
import utils from '../utils/utils.js'

const telegraf = new Telegraf(process.env.BOT_TOKEN)

const keyboardInitial = Markup.keyboard([
  ['Average', 'Percent By Time'],
  ['Average Time All Heroes in The Patch'],
  ['List By Hero', 'List By Hero 2', 'List By Hero 3'],
])

telegraf.start((ctx) => {
  utils.log('Request from', ctx.from.username)
  const from = ctx.update.message.from
  registerUser(ctx)

  ctx.reply(
    `Welcome ${from.first_name}!\nTo your Dota2 Statistics Bot\nI will show you the average time of your matches, and the percentage of your matches by time\nFor the patch ${process.env.PATCH}`,
    keyboardInitial
  )
})

export default telegraf

import { Telegraf, Markup } from 'telegraf'
import registerUser from './registerUser.js'

const telegraf = new Telegraf(process.env.BOT_TOKEN)

const keyboardInitial = Markup.keyboard([
  ['Average', 'Percent By Time'],
  ['Average Time All Heroes in The Patch'],
  ['List By Hero', 'List By Hero 2', 'List By Hero 3'],
])

telegraf.start((ctx) => {
  const from = ctx.update.message.from
  registerUser(ctx)
  
  ctx.reply(
    `Welcome ${from.first_name}!\nTo your Dota2 Statistics Bot\nI will show you the average time of your matches, and the percentage of your matches by time\nFor the patch ${process.env.PATCH}`,
    keyboardInitial
  )
})

export default telegraf
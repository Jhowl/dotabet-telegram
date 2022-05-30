import telegraf from '../telegram/start.js'
import average from '../Controllers/avgByPatch.js'
import percentTimeByMatch from '../Controllers/percentTimeByMatch.js'
import avgTimeByHeroPatch from '../Controllers/avgTimeByHeroPatch.js'
import percentTimeByHeroMatch from '../Controllers/percentTimeByHeroMatch.js'
import heroesButton from '../Controllers/heroesButton.js'

const hears = [
  { name: 'Average', controller: average },
  { name: 'Percent By Time', controller: percentTimeByMatch },
  { name: 'Average Time All Heroes in The Patch', controller: avgTimeByHeroPatch },
]

hears.forEach(({ name, controller }) => {
  telegraf.hears(name, controller)
})

telegraf.hears('List By Hero', ctx => heroesButton(ctx))
telegraf.hears('List By Hero 2', ctx => heroesButton(ctx, 1))
telegraf.hears('List By Hero 3', ctx => heroesButton(ctx, 2))

telegraf.on('callback_query', percentTimeByHeroMatch)


export default telegraf

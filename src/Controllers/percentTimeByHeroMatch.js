import dotaconstants from 'dotaconstants'
import { Markup } from 'telegraf'

import Controller from './controller.js'
import utils from '../utils/utils.js'

class percentTimeByHeroMatch extends Controller {
  constructor(ctx) {
    super(ctx, `https://api.opendota.com/api/explorer?sql=SELECT%0Aplayer_matches.hero_id%2C%0Amatches.duration%20as%20duration%0AFROM%20matches%0AJOIN%20match_patch%20using(match_id)%0AJOIN%20leagues%20using(leagueid)%0AJOIN%20player_matches%20using(match_id)%0AJOIN%20heroes%20on%20heroes.id%20%3D%20player_matches.hero_id%0ALEFT%20JOIN%20notable_players%20ON%20notable_players.account_id%20%3D%20player_matches.account_id%0ALEFT%20JOIN%20teams%20using(team_id)%0AWHERE%20TRUE%0AAND%20leagues.tier%3D%27premium%27%0AAND%20patch%3D%277.31%27%0AAND%20player_matches.hero_id%3D%27${ctx.update.callback_query.data}%27`)
    this.data = ''
    this.heroId = ctx.update.callback_query.data
  }

  async generateMessage() {
    const { data, total } = await this.getData()
    this.data = data

    const heroName = dotaconstants.heroes[this.heroId].localized_name
    const percents = this.getPercentage(total)

    this.sendMessage(`Percent By Time of matches for ${heroName}\n${percents.join('\n')}\nTotal matches: ${total}`)
  }

  generateKeyboard() {
    const heroes = Object.keys(dotaconstants.heroes)
    const formatted = heroes.map(hero => ({
      text: dotaconstants.heroes[hero].localized_name,
      callback_data: hero
    }))

    const keyboard = []

    for (let i = 0; i < heroes.length; i++) {
      keyboard.push([formatted[i], formatted[i + 1] || formatted[0]])
      i++
    }

    return Markup.inlineKeyboard(keyboard).resize()
  }

  getPercentage(total) {
    return this.seconds.map(duration => {
      const count = this.filterDuration(duration)
      const percentage = utils.getPercentage(count, total)
      return `${utils.secondsToMinutes(duration)}: ${percentage}`
    })
  }

  filterDuration(duration) {
    const filtered = this.data.reduce((acc, curr) => {
        if (curr.duration < duration) {
            acc.count++
        }
        return acc
    }, { count: 0 })

    return filtered.count
  }
}

export default ctx => new percentTimeByHeroMatch(ctx)

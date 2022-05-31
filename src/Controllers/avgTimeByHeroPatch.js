import dotaconstants from 'dotaconstants'

import Controller from './controller.js'
import utils from '../utils/utils.js'

class AvgTimeByHeroPatch extends Controller {
  constructor(ctx) {
    super(ctx, `https://api.opendota.com/api/explorer?sql=SELECT%0Aplayer_matches.hero_id%2C%0ASUM(matches.duration)%2C%0ACOUNT(player_matches.hero_id)%20as%20total%0AFROM%20matches%0AJOIN%20match_patch%20using(match_id)%0AJOIN%20leagues%20using(leagueid)%0AJOIN%20player_matches%20using(match_id)%0AJOIN%20heroes%20on%20heroes.id%20%3D%20player_matches.hero_id%0ALEFT%20JOIN%20notable_players%20ON%20notable_players.account_id%20%3D%20player_matches.account_id%0ALEFT%20JOIN%20teams%20using(team_id)%0AWHERE%20TRUE%0AAND%20leagues.tier%20%3D%20%27premium%27%0AAND%20patch%20%3D%20%27${process.env.PATCH}%27%0AGROUP%20BY%20player_matches.hero_id%20%0AORDER%20BY%20total%20DESC`)
    this.data = ''
  }

  async generateMessage() {
    const { data } = await this.getData()
    this.data = data
    const heroes = this.byHero()

    this.sendMessage(`Average Time By Hero:\n${heroes.map(hero => `<b>${hero.name}</b>:\n${hero.time} total: <b>${hero.total}</b>\n`).join('\n')}`)
  }

  byHero() {
    return this.data.map(hero => {
      const time = utils.secondsToMinutes(hero.sum / hero.total)
      return {
        name: dotaconstants.heroes[hero.hero_id].localized_name,
        time: time,
        total: hero.total,
      }
    })
  }
}

export default ctx => new AvgTimeByHeroPatch(ctx)

import fs from 'fs'
import Controller from './controller.js'
import utils from '../utils/utils.js'

class PercentTimeByMatch extends Controller {
  constructor(ctx) {
    super(ctx, `https://api.opendota.com/api/explorer?sql=SELECT%0Amatch_id%2C%0Aduration%2C%0Apatch%2C%0Aleagues.name%20leaguename%0AFROM%20matches%0AJOIN%20match_patch%20using(match_id)%0AJOIN%20leagues%20using(leagueid)%0AWHERE%20leagues.tier%20%3D%20%27premium%27%0AAND%20patch%20%3D%20%27${process.env.PATCH}%27%0AORDER%20BY%20match_id%20DESC%0A%0A`)
    this.ctx = ctx
    this.data = ''
  }

  async generateMessage() {
    const { data, total } = await this.getData()
    this.data = data

    const percents = this.getPercentage(total)

    this.sendMessage(`${process.env.PATCH} Percent By Time of matches ended before:\n${percents.join('\n')}\nTotal matches: <b>${total}</b>`)
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

export default ctx => new PercentTimeByMatch(ctx)

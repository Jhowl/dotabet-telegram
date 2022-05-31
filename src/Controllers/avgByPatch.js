import fs from 'fs'
import Controller from './controller.js'
import utils from '../utils/utils.js'

class AvgByPatch extends Controller {
    constructor(ctx) {
        super(ctx, `https://api.opendota.com/api/explorer?sql=SELECT%0Amatch_id%2C%0Aduration%2C%0Apatch%2C%0Aleagues.name%20leaguename%0AFROM%20matches%0AJOIN%20match_patch%20using(match_id)%0AJOIN%20leagues%20using(leagueid)%0AWHERE%20leagues.tier%20%3D%20%27premium%27%0AAND%20patch%20%3D%20%27${process.env.PATCH}%27%0AORDER%20BY%20match_id%20DESC%0A%0A`)
        this.ctx = ctx
    }

    async generateMessage() {
        const { data, total } = await this.getData()
        const average = utils.average(data)
       this.sendMessage(`The match Average for this patch (${process.env.PATCH}) is: <b>${utils.secondsToMinutes(average)}</b> \nTotal matches:  <b>${total} </b>`)
    }
}

export default ctx => new AvgByPatch(ctx)

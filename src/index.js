import 'dotenv/config'
import telegraf from './router/index.js'

import utils from './utils/utils.js'

telegraf.launch()
utils.log('Bot started!')

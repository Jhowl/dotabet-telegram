import fs from 'fs'

import utils from '../utils/utils.js'

const registerUser = async (ctx) => {
  const user = ctx.update.message.from
  user.date = new Date()

  const file_path = `./src/telegram/users/${user.id}.json`

  if (!fs.existsSync(file_path)) {
    utils.log(`User ${user.first_name} registered!`)

    fs.writeFileSync(file_path, JSON.stringify(user))
  }
}

export default registerUser

import fs from 'fs'

const registerUser = async (ctx) => {
    const user = ctx.update.message.from
    user.date = new Date()

    const file_path = `./src/telegram/users/${user.id}.json`

    if (!fs.existsSync(file_path)) {
        fs.writeFileSync(file_path, JSON.stringify(user))
    }
}

export default registerUser

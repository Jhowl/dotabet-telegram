import dotaconstants from 'dotaconstants'
import { Markup } from 'telegraf'

function generateKeyboard(option = 0) {
  const keyboard = []
  const heroes = Object.keys(dotaconstants.heroes)
  const formatted = heroes.map(hero => ({
    text: dotaconstants.heroes[hero].localized_name,
    callback_data: hero
  }))

  sortAlfabetically(formatted)

  let i = option * 50
  const end = i + 50 

  for (i; i < end; i++) {
    keyboard.push([formatted[i], formatted[i + 1] || formatted[0]])
    i++

    if (formatted[i] === undefined) {
      break
    }
  }
  
  return Markup.inlineKeyboard(keyboard).resize()
}

function sortAlfabetically(heroes) {
  return heroes.sort((a, b) => {
    if (a.text < b.text) {
      return -1
    }
    if (a.text > b.text) {
      return 1
    }
    return 0
  })
}

const HeroesButton = (ctx, option) => { 
    ctx.reply('Select the hero you want to see the percentage of matches finished by time', generateKeyboard(option)) 
}

export default HeroesButton
import express from 'express'
import fetch from 'node-fetch'
import {PORT, TOKEN, TICKET, URL, BODY, data} from './config.js'
import pkg from 'telegraf'

const {Telegraf, session, BaseScene, Stage, Markup, Scenes} = pkg
import {getMainMenu, yesNoKeyboard} from './keyboards.js'
import {callScene, getCallScene, loginScene, mcodScene, passScene} from "./scenes.js"
import {getList} from "./db.js";


const app = express()
const bot = new Telegraf(TOKEN)


const stage = new Stage([loginScene, passScene, mcodScene, callScene, getCallScene])
stage.hears('назад', ctx => ctx.scene.leave())

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => {
    ctx.replyWithHTML(
        'Приветсвую в <b>DispetcherBot</b>\n\n' +
        'Что бы начать работу, авторизуйтесь',
        getMainMenu())
})

bot.hears('Мои вызовы', async ctx => {
    if (!ctx.session?.isAuth == true) {
        ctx.reply(`Вы не авторизованы`)
    } else {

        let result = await getList();

        ctx.replyWithHTML(
            '<b>Список ваших вызовов:</b>\n\n' + `${result}`
        )
    }
})

bot.hears('Обслужить вызов', ctx => {
    if (!ctx.session?.isAuth == true) {
        ctx.reply(`Вы не авторизованы`)
    } else {
        ctx.scene.enter('callScene')
    }

})

bot.hears('Авторизация', (ctx) => {

    if (ctx.session?.isAuth == true) {
        ctx.reply(`Ваши данные:\n логин - ${ctx.session?.login}\n пароль - ${ctx.session?.pass}\n мкод - ${ctx.session?.mcod}\n`)
    } else {
        ctx.scene.enter('loginScene')
    }
})

bot.launch()
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))

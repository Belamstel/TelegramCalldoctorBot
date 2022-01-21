import pkg from 'telegraf';
import {getList} from "./db.js";
const { Telegraf, session, BaseScene, Stage, Markup, Scenes } = pkg;


export const loginScene = new BaseScene('loginScene')
loginScene.enter(ctx => ctx.reply('Введите логин'))
loginScene.on('text', ctx => {
    return ctx.scene.enter('passScene', { login: ctx.message.text })
})
loginScene.leave(ctx => ctx.reply('Логин принят'))


export const passScene = new BaseScene('passScene')
passScene.enter(ctx => ctx.reply('Введите пароль'))
passScene.on('text', ctx => {
    ctx.session.login = ctx.scene.state.login
    return ctx.scene.enter('mcodScene', { pass: ctx.message.text })
})
passScene.leave(ctx => ctx.reply('Пароль принят'))


export const mcodScene = new BaseScene('mcodScene')
mcodScene.enter(ctx => ctx.reply('Введите мкод учреждения'))
mcodScene.on('text', ctx => {
    ctx.session.pass = ctx.scene.state.pass
    ctx.session.mcod = ctx.message.text
    ctx.session.isAuth = true
    return ctx.scene.leave()
})
mcodScene.leave(ctx => ctx.reply('Код учреждения принят. Авторизация пройдена, загрузите список вызовов'))


export const callScene = new BaseScene('callScene')
callScene.enter(ctx => ctx.reply('Введите номер вызова, чтобы перевсти его в обслуженные:'))
callScene.on('text', ctx => {
//    ctx.session.isAuth = false
    return ctx.scene.leave()
})
callScene.leave(ctx => ctx.reply('Вызов обслужен'))


export const getCallScene = new BaseScene('getCallScene')
getCallScene.enter(ctx =>
    ctx.reply('Получение списка...'))
getCallScene.on('text', ctx => {

    return ctx.scene.leave()
})
getCallScene.leave(ctx => {
    let result = getList();
    ctx.replyWithHTML('<b>Список ваших вызовов:</b>\n\n' + `${result}`)})





//getCallScene.leave(ctx => ctx.reply('Вызов обслужен'))
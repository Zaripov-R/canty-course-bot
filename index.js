require('dotenv').config()
const { Telegraf, Markup } = require('telegraf')
const consObj = require('./const')


const bot = new Telegraf(process.env.BOT_TOKEN)


bot.start((ctx) => ctx.reply(`Welcome, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'unknown'}`))
bot.help((ctx) => ctx.reply(consObj.comands))

bot.command('course', async ctx => {
    try {
        await ctx.replyWithHTML('<b>Courses</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Course 1', 'btn_1'), Markup.button.callback('Course 2', 'btn_2'), Markup.button.callback('Course 3', 'btn_3')],
            ]
        ))
    } catch (error) {
        console.error(error);
    }
})

function addActionBot(name, src, text) {
    bot.action(name, async ctx => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disabled_web_page_preview: true
            })
        } catch (error) {
            console.error(error);
        }
    })
}

addActionBot('btn_1', './img/1.jpg', consObj.text1)
addActionBot('btn_2', false, consObj.text2)
addActionBot('btn_3', false, consObj.text3)



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
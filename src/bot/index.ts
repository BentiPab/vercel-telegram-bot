
import { Telegraf } from "telegraf";
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);


bot.start((ctx) => ctx.reply('Welcome to my Telegram bot!'));


bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`));


export default bot


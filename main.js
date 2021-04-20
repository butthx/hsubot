const fs = require("fs")
// unuk mencegah error cek apakah file config.js ada
if(!fs.existsSync("./config.js")){
  let dataFs = `module.exports = {
  // di dapat dari https://my.telegram.org/
  API_ID: ${Number(process.env.api_id)},
  API_HASH: ${String(process.env.api_hash)},
  pathTDLib : './tdlib/libtdjson.so',
  // aktifkan jika pakai bot API
  BOT_API: ${Boolean(String(process.env.bot_api))},
  // HANYA jika BOT_API true, token bot API dari @botfather
  BOT_TOKEN: ${String(process.env.bot_token)},
  // untuk verbose mode
  debug: {
    active: ${Boolean(String(process.env.debug_mode))},
    level: ${Number(process.env.debug_level)|1} // 1 event only, 2 detail, 3 semua termasuk object dan fungsi
  },
  admin:
  {
    active: ${Boolean(String(process.env.admin_mode))},
    // Jika admin.active, sesuaikan dengan ID mu
    id: ${[Number(process.env.admin_id)|"OWNER_ID"]},
  },
}`
  fs.writeFileSync("./config.js",dataFs)
}

// milai import module
const CONFIG = require('./config.js');
const { client, logAuth } = require('./module/client');
const { Telegram } = require('./Library/telegram');
require('console-stamp')(console, 'HH:MM:ss.l');
const updateNewMessage = require('./update/updateNewMessage')

/*
HSUbot

Hasanudin H Syafaat
@hasanudinhs
banghasan@gmail.com

Support Grup Telegram @botindonesia
*/

// variable tg aku samakan dengan library di GAS
const tg = new Telegram(client)

client
    .on('error', err => {
        console.error('Got error:', JSON.stringify(err, null, 2))
    })
    .on('destroy', () => {
        console.log('Destroy event')
    })


client.on('update', update => {

    // handle debugging
    let debugLog = false
    if (CONFIG.debug.level == 0) {
        // minimalis
    } else if (CONFIG.debug.level == 1) {
        debugLog = '📥 ' + update['_']
    } else if (CONFIG.debug.level == 2) {
        debugLog = update
    } else if (CONFIG.debug.level == 3) {
        debugLog = update
    } else {
        CONFIG.debug.active = false
    }

    if (CONFIG.debug.active && debugLog)
        console.log(JSON.stringify(debugLog, null, 1))


    // tangkap event

    switch (update['_']) {

        case 'updateNewMessage':
            if (!CONFIG.BOT_API && CONFIG.terbaca) tg.viewMessages(update.message.chat_id, update.message.id, true)
            updateNewMessage(tg, update)
            break;

        case 'updateMessageSendSucceeded':
            break;

        case 'updateConnectionState':
            break;

        default:
            break;
    }
})

async function main() {
    await client.connect()
    if (CONFIG.BOT_API) {
        await client.login(() => API_BOT_AUTH)
    } else {
        // await client.login()
        await client.login(() => logAuth);
    }
}
main()

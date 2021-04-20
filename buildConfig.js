const fs = require("fs")
let dataFs = `module.exports = {
  API_ID: ${Number(process.env.api_id)},
  API_HASH: "${String(process.env.api_hash)}",
  pathTDLib : './tdlib/libtdjson.so',
  BOT_API: ${process.env.bot_api},
  BOT_TOKEN: "${String(process.env.bot_token)}",
  debug: {
    active: ${process.env.debug_mode},
    level: ${Number(process.env.debug_level)||1}
  },
  admin:
  {
    active: ${process.env.admin_mode},
    id: [${Number(process.env.admin_id) || 213567634}],
  },
  base: {
    uploadPath: '',
  },
  plugins: {
    bash: ${process.env.bash || false},
    debugJSON: ${process.env.debugJSON || false}, 
    parseMode: ${process.env.parseMode || true},
    foto: ${process.env.foto || true}, 
    dokumen ${process.env.dokumen || true}, 
    video: ${process.env.video || true}, 
    audio : ${process.env.audio || true}, 
    voice: ${process.env.voice || true}, 
    sticker: ${process.env.sticker || true},
    getMe: ${process.env.getMe || true}, 
    invoke: ${process.env.invoke || true},
    pin: ${process.env.pin || true}, 
    unpin: ${process.env.unpin || true}, 
    ping: ${process.env.ping || true}, 
    pong: ${process.env.pong || true},
    quotes: ${process.env.quotes || true}, 
    wikipedia: ${process.env.wikipedia || true},
    uploadFoto: ${process.env.uploadFoto || true}, 
    uploadDokumen: ${process.env.uploadDokumen || true}, 
    uploadVideo: ${process.env.uploadVideo || true},
    uploadAudio: ${process.env.uploadAudio || true}, 
    uploadVoice: ${process.env.uploadVoice || true}, 
    uploadSticker: ${process.env.uploadSticker || true},
    getUser: ${process.env.getUser || false}
  },
  terbaca: true,
  skipme: false,
}`
function buildConfig(){
  if(!fs.existsSync("./config.js")){
    fs.writeFileSync("./config.js",dataFs)
    return "config.js berhasil dibikin"
  }
  return "config.js sudah ada."
}

module.exports = {buildConfig}
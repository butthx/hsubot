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
    bash: false,
    debugJSON: false, parseMode: false,
    foto: true, dokumen: true, video: true, audio: true, voice: true, sticker: true,
    getMe: true, invoke: false,
    pin: true, unpin: true, ping: true, pong: true,
    quotes: true, wikipedia: true,
    uploadFoto: true, uploadDokumen: true, uploadVideo: true,
    uploadAudio: true, uploadVoice: true, uploadSticker: true,
    getUser: false
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
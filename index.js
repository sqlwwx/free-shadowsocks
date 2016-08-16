const superagent = require('superagent')
const cherrio = require('cheerio')

const url = 'http://www.ishadowsocks.org/'
const translator= {
  'A服务器地址': 'server',
  'B服务器地址': 'server',
  'C服务器地址': 'server',
  '端口': 'server_port',
  'A密码': 'password',
  'B密码': 'password',
  'C密码': 'password',
  '加密方式': 'method'
}

function parseServer (str) {
  let server = {}
  str.split('\n').forEach(function (s) {
    let kv = s.split(':')
    if (kv.length > 1) {
      let key = kv[0].trim()
      let val = kv[1].trim()
      let trueKey = translator[key]
      if (trueKey) {
        server[trueKey] = val
      }
    }
  })
  return server
}

function loadFreeShadowsocks () {
  let freeShadowsocks = []
  return superagent.get(url).then(function (res){
    let $ = cherrio.load(res.text)
    $('#free .container .row > .col-lg-4').each(function(i, elem) {
      freeShadowsocks.push(
        parseServer(
          $(this).text().trim()
        )
      )
    })
    return Promise.resolve(freeShadowsocks)
  })
}

module.exports = loadFreeShadowsocks

if (require.main === module) {
  loadFreeShadowsocks().then(function (freeShadowsocks) {
    console.log(freeShadowsocks)
  }, function (err) {
    console.error(err)
  })
}

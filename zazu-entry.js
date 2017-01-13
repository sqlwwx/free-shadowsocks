var freeShadowsocks = require('.')

const template = (server) => ({
  icon: 'fa-globe',
  title: `${server.password}`,
  subtitle: `${server.server} ${server.method} ${server.server_port}`,
  value: server.password
})

module.exports = (pluginContext) => {
  return () => {
    return freeShadowsocks().then((servers) => {
      return Promise.resolve(
        servers.map(template)
      )
    })
  }
}

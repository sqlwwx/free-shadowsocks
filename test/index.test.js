const loadFreeShadowsocks = require('..')

test('loadFreeShadowsocks', async () => {
  const freeShadowsocks = await loadFreeShadowsocks()
  expect(freeShadowsocks.length).toBeGreaterThan(3)
})

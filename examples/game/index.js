const WebRender = require('src/index.js').WebRender

const renderer = new WebRender('#webgl-output')

// Member
const { shadowLight, hemisphereLight } = require('./lights')
const SeaGeometry = require('./sea')

// 添加灯光
renderer.addMember(shadowLight)
renderer.addMember(hemisphereLight)

// 创建大海
const sea = new SeaGeometry()
sea.mesh.position.y = -600

renderer.addMember(sea.mesh)

renderer.render()

window.addEventListener('resize', function () {
  renderer.handleResize(window.innerWidth, window.innerHeight)
})

const THREE = require('three')

function WebRender (container, options) {
  this.$container = document.querySelector(container)

  this.scene = null
  this.camera = null
  this.renderer = null

  this.init(options)
  this.initComponents()
}

WebRender.prototype.render = function () {
  this._render()
}

WebRender.prototype.addMember = function (member) {
  this.scene.add(member)
}

WebRender.prototype._render = function () {
  requestAnimationFrame(() => this._render())

  this.renderer.render(this.scene, this.camera)
}

WebRender.prototype.handleResize = function (w, h) {
  this.renderer.setSize(w, h)    
  this.camera.aspect = w / h          
  this.camera.updateProjectionMatrix()
}

WebRender.prototype.initComponents = function () {
  const { basic } = this.$options
  // 场景
  this.scene = new THREE.Scene()

  // 在场景中添加雾的效果；样式上使用和背景一样的颜色
  this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

  // 照相机
  const { fov, aspect, near, far, position } = basic.camera
  const camera = this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.x = position.x
  camera.position.y = position.y
  camera.position.z = position.z

  camera.lookAt(this.scene.position)

  // 渲染器
  const { size, clearColor } = basic.renderer
  const renderer = this.renderer = new THREE.WebGLRenderer({ 
    // 在 css 中设置背景色透明显示渐变色
    alpha: true, 
    // 开启抗锯齿，但这样会降低性能。
    // 不过，由于我们的项目基于低多边形的，那还好 :) 
    antialias: true 
  })

  renderer.setClearColor(clearColor)
  renderer.setSize(size.w, size.h)

  // 打开渲染器的阴影地图
  renderer.shadowMap.enabled = true; 

  this.$container.appendChild(renderer.domElement)
}

WebRender.prototype.init = function (options) {
  this.initOpt(options)
}

WebRender.prototype.initOpt = function (options) {
  this.$options = Object.assign({
    basic: {
      camera: {
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
        position: {
          x: 0, y: 100, z: 200
        }
      },
      renderer: {
        size: {
          w: window.innerWidth, h: window.innerHeight
        },
        clearColor: 0xEEEEEE
      }
    }
  }, options)
}

module.exports = WebRender

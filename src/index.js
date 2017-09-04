const THREE = require('three')

function WebRender (container, options) {
  this.$container = document.querySelector(container)

  this.scene = null
  this.camera = null

  this.init(options)
  this.initComponents()
}

WebRender.prototype.render = function () {
  this._render()
}

WebRender.prototype._render = function () {
  requestAnimationFrame(() => this._render())

  this.renderer.render(this.scene, this.camera)
}

WebRender.prototype.initComponents = function () {
  const { basic } = this.$options
  // 场景
  this.scene = new THREE.Scene()

  // 照相机
  const { fov, aspect, near, far, position } = basic.camera
  const camera = this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.x = position.x
  camera.position.y = position.y
  camera.position.z = position.z

  camera.lookAt(this.scene.position)

  // 渲染器
  const { size, clearColor } = basic.renderer
  const renderer = this.renderer = new THREE.WebGLRenderer()

  renderer.setClearColor(clearColor)
  renderer.setSize(size.w, size.h)

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

const THREE = require('three')

// 场景 -> 容器
const scene = new THREE.Scene()
// 相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
// 渲染器 -> 使用显卡来渲染
const renderer = new THREE.WebGLRenderer()

// 设置 renderer 的背景色
renderer.setClearColor(0xEEEEEE, 1.0)

// 告诉 render 将 scene 设置成多大尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

// 需要阴影映射
renderer.shadowMapEnabled = true

// 1.坐标轴
// 创建一个坐标轴对象
// 添加到场景中
const axis = new THREE.AxisHelper(20)
scene.add(axis)

// 2.平面
// 定义平面尺寸：w-60, h-20
var planeGeometry = new THREE.PlaneGeometry(60, 20)
// 创建一个基本的材质，定义颜色
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc})

// 合并为一个 plain 平面的 mesh 网格对象中
var plain = new THREE.Mesh(planeGeometry, planeMaterial)
// 平面接收阴影
plain.receiveShadow = true

// 把 plain 添加到场景之前
// 设置合适的位置

// 绕 x 轴旋转 45 度
plain.rotation.x = -0.5 * Math.PI

// 用 position 属性来设置在场景中的位置
plain.position.x = 15
plain.position.y = 0
plain.position.z = 0

scene.add(plain)

// 用同样的方法添加方块和球体

const cubeGeometry = new THREE.CubeGeometry(4, 4, 4)    
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xfff0000,
  wireframe: true
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.castShadow = true

cube.position.x = -4
cube.position.y = 3
cube.position.z = 0

scene.add(cube)

const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0x7777ff,
  wireframe: true
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true

sphere.position.x = 20
sphere.position.y = 4
sphere.position.z = 2


scene.add(sphere)

// 添加光源
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-40, 60, -10)

spotLight.castShadow = true

scene.add(spotLight)

// 指定相机位置 -> 悬挂在场景的上方
camera.position.x = -30
camera.position.y = 40
camera.position.z = 30

// 将镜头指向场景的中心
camera.lookAt(scene.position)

document.body.appendChild(renderer.domElement)
// const effect = new THREE.AsciiEffect(renderer)
// effect.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(effect.domElement)

renderFrame()

var step = 0

function renderFrame () {
    requestAnimationFrame(renderFrame)

    // 旋转方块
    cube.rotation.x += 0.2
    cube.rotation.y += 0.2
    cube.rotation.z += 0.2

    // 弹跳球
    step += 0.04
    sphere.position.x = 20 + (10 * (Math.cos(step)))
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))

    renderer.render(scene, camera)
    // effect.render(scene, camera)
}
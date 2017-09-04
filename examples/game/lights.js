const THREE = require('three')

// 半球光就是渐变的光；
// 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

// 方向光是从一个特定的方向的照射
// 类似太阳，即所有光源是平行的
// 第一个参数是关系颜色，第二个参数是光源强度
shadowLight = new THREE.DirectionalLight(0xffffff, .9)

// 设置光源的方向。  
// 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
shadowLight.position.set(150, 350, 350)

// 开启光源投影 
shadowLight.castShadow = true

// 定义可见域的投射阴影
shadowLight.shadow.camera.left = -400
shadowLight.shadow.camera.right = 400
shadowLight.shadow.camera.top = 400
shadowLight.shadow.camera.bottom = -400
shadowLight.shadow.camera.near = 1
shadowLight.shadow.camera.far = 1000

// 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
shadowLight.shadow.mapSize.width = 2048
shadowLight.shadow.mapSize.height = 2048

module.exports = {
  shadowLight, hemisphereLight
}

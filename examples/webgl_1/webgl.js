export default class WebGL {
  // WebGL 上下文
  context = null;

  constructor(canvas) {
    this.initCanvas(canvas)
    if (this.context) {
      this.clearCanvas()
    }
  }
  
  initCanvas(canvas) {
    try {
      // 兼容IE11和Edge
      this.context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    } catch (err) {
      throw err
    }
    if (!this.context) {
      alert('WebGL初始化失败，可能是您的浏览器不支持！')
    }
  }

  clearCanvas() {
    const context = this.context
    ///////////////
    // 设置清除颜色为黑色
    ///////////////
    context.clearColor(0.0, 0.0, 0.0, 1.0)

    ///////////////
    // 清除颜色: COLOR_BUFFER_BIT
    // 深度缓存: DEPTH_BUFFER_BIT
    ///////////////
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT)
  }
}

export default class Shader {
  // webgl instance
  context = null;

  constructor(webGL) {
    this.context = webGL
  }

  /**
   * 创建程序
   * @param  {[type]} vshader [description]
   * @param  {[type]} fshader [description]
   * @return {[type]}         WebGLProgram
   */
  initProgram (vshader, fshader) {
    const program = this.createProgram(vshader, fshader)
    const context = this.context

    if (!program) {
      console.error('创建程序失败！')
      return false
    }

    context.program = program
    return program
  }

  /**
   * 连接到可用程序
   * @param  {[type]} vshader 顶点着色器
   * @param  {[type]} fshader 片元着色器
   * @return {[type]}         WebGLProgram
   */
  createProgram (vshader, fshader) {
    // 创建着色器对象
    const context = this.context
    const vertexShader = this.createShader(context.VERTEX_SHADER, vshader)
    const fragmentShader = this.createShader(context.FRAGMENT_SHADER, fshader)

    if (!vertexShader || !fragmentShader) {
      return null
    }

    // 创建编程对象
    const program = context.createProgram()
    
    if (!program) {
      return null
    }

    // 赋值已经创建的着色器对象
    context.attachShader(program, vertexShader)
    context.attachShader(program, fragmentShader)
    // 连接到 webgl
    context.linkProgram(program)

    // 检查结果
    if (!context.getProgramParameter(program, context.LINK_STATUS)) {
      console.error('连接程序失败：\n' + context.getProgramInfoLog(program))

      context.deleteProgram(program)
      context.deleteShader(vertexShader)
      context.deleteShader(fragmentShader)
      return null
    }

    return program
  }

  /**
   * 编译着色器
   * @param  {[type]} type   编译着色器类型：顶点着色器、元着色器
   * @param  {[type]} sourceCode GLSL 源码
   * @return {[type]}        WebGLShader
   */
  createShader (type, sourceCode) {
    const context = this.context
    const shader = context.createShader(type)

    context.shaderSource(shader, sourceCode)
    context.compileShader(shader)

    // 编译失败时删除着色器
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      const info = context.getShaderInfoLog(shader)

      console.error('无法编译 WebGL 程序：\n' + info)
      context.deleteShader(shader)
      return null
    }

    return shader
  }
}

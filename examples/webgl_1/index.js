import WebGL from './webgl'
import Shader from './shader'

const webRender = new WebGL(document.querySelector('#webgl'))
const shader = new Shader(webRender.context)

// 顶点着色器程序
const VSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // 设置顶点位置
  '  gl_PointSize = 10.0;\n' +                    // 设置点的大小
  '}\n'

// 片元着色器程序
const FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n' + // 设置点的颜色，此处为白色
  '}\n'

webRender.context.useProgram(shader.initProgram(VSHADER_SOURCE, FSHADER_SOURCE))
webRender.context.drawArrays(webRender.context.POINTS, 0, 1)

console.log(webRender)

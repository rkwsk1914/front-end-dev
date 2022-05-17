export class FunctionString {
  getfunction (string) {
    let name = ''
    const functionStr = string.match(/function\s*\w+\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/g)
    if (functionStr) {
      const trimFunctionStr = functionStr[0].replace(/function\s*/, '')
      name = trimFunctionStr.replace(/\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/, '')
    }

    const constStr = string.match(/const\s*\w+\s*=\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*=>\s*\{/g)
    if (constStr) {
      const trimFunctionStr = constStr[0].replace(/const\s*/, '')
      name = trimFunctionStr.replace(/\s*=\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*=>\s*\{/, '')
    }

    const prototypeStr = string.match(/\.prototype\.\w+\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/g)
    if (prototypeStr) {
      const trimFunctionStr = prototypeStr[0].replace(/\.prototype\.*/, '')
      name = trimFunctionStr.replace(/\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/, '')
    }

    const classVarTypeStr = string.match(/var\s*\w+\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/g)

    if (classVarTypeStr) {
      const trimFunctionStr = classVarTypeStr[0].replace(/var\s*/, '')
      name = trimFunctionStr.replace(/\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/, '')
    }

    const classLetTypeStr = string.match(/let\s*\w+\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/g)
    if (classLetTypeStr) {
      const trimFunctionStr = classLetTypeStr[0].replace(/let\s*/, '')
      name = trimFunctionStr.replace(/\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/, '')
    }

    const classConstTypeStr = string.match(/const\s*\w+\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/g)
    if (classConstTypeStr) {
      const trimFunctionStr = classConstTypeStr[0].replace(/const\s*/, '')
      name = trimFunctionStr.replace(/\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/, '')
    }

    return name
  }

  getArguments (string) {
    const argumentsString = string.match(/\(\s*\w*\s*(,\s*\w*\s*)*\)/g)
    const trimBefore = argumentsString[0].replace(/\(\s*/, '')
    const trimAfter = trimBefore.replace(/\s*\)/, '')
    const result = trimAfter.split(',')

    // if (arguments[0] -eq "") {
    //    arguments = []
    // }

    // console.log(result)
    return result
  }

  getMvcClassName (string) {
    const prototypeStr = string.match(/\w+\.prototype\.\w+\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/g)
    if (prototypeStr) {
      const name = prototypeStr[0].replace(/\.prototype\.\w+\s*=\s*function\s*\(\s*\w*\s*(,\s*\w*\s*)*\)\s*\{/, '')
      return name
    }
    return ''
  }
}

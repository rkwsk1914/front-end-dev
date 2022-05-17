import { FunctionString } from './function-string.js'

export class FuncListMaker {
  constructor () {
    this.functionString = new FunctionString()
    this.list = []
    this.nowFuncID = 1

    // 入れ子データ
    this.bracket = []
    this.bracketID = 1

    // 関数の入れ子データ
    this.funcBracket = []
    this.funcBracketID = 1

    // 現在行が、関数の入れ子なのか確認用のデータ
    this.nowFunctionBracket = false
    this.nowFunction = 'JavaScript Whole'
    this.nowFunctionIndex = 0

    // 条件分岐カウント数
    this.countIF = 0
  }

  /**
   * 関数一覧の詳細データ取得
   * @param {*} jsData
   */
  checkDetail (jsData) {
    this.subGetList(jsData)

    const funcBracketData = {
      id: 0,
      func: this.nowFunction,
      index: this.nowFunctionIndex
    }

    this.funcBracket.push(funcBracketData)

    let index = 1

    jsData.forEach(line => {
      // 終了(テスト用index.js対象行で終了させる)
      if (index === 200) {
        // return
      }

      // console.log('index', index, line)

      // 関数名があったら、関数カッコの開始
      this.subGetStartBrankOfFunction(line, index)

      // 内部カッコの開始
      this.subGetStartBrank(line)

      // 条件分岐のカウント
      this.subCountUpIF(line)

      // 呼び出し関数の取得
      this.subGetUseMethods(line)

      // 内部カッコの終了
      this.subGetEndBrank(line)

      index++
    })

    // console.log(this.list)

    return this.list
  }

  /**
   * 関数一覧の大枠作成
   * @param {*} jsData
   */
  subGetList (jsData) {
    let index = 1

    this.list.push({
      name: this.nowFunction,
      useMethods: [],
      arguments: [],
      ifNum: '',
      mvc: '',
      index: index,
      id: this.nowFuncID
    })
    this.nowFuncID++

    jsData.forEach(line => {
      const functionName = this.functionString.getfunction(line)

      if (functionName !== '') {
        // console.log('functionName', functionName, index)
        const functionData = {
          name: functionName,
          useMethods: [],
          arguments: this.functionString.getArguments(line),
          ifNum: '',
          mvc: this.functionString.getMvcClassName(line),
          index: index,
          id: this.nowFuncID
        }

        // console.log(functionData)
        this.list.push(functionData)
        // console.log(list.length)
        this.nowFuncID++
      }
      index++
    })
  }

  /**
   * ソースコードの入れ子構造を取得
   * @param {*} line
   * @param {*} index
   */
  subGetStartBrankOfFunction (line, index) {
    const functionName = this.functionString.getfunction(line)
    if (functionName !== '') {
      this.nowFunction = functionName
      this.nowFunctionIndex = index
      this.countIF = 0

      const funcBracketData = {
        id: this.bracketID,
        func: functionName,
        index: index
      }
      this.funcBracket.push(funcBracketData)
      // console.log('this.funcBracket', index, line, this.funcBracket)
    }
  }

  /**
   *
   * @param {*} line
   */
  subGetStartBrank (line) {
    const start = line.match(/\{/g)
    // console.log(line)
    // console.log('start', start)

    if (!start) {
      return
    }

    this.bracket.push(this.bracketID)
    this.bracketID++

    // console.log('this.bracket', this.bracket)

    /*
    start.forEach(startitem => {
      this.bracket.push(this.bracketID)
      this.bracketID++
    })
    */
  }

  /**
   *
   * @param {*} line
   */
  subGetEndBrank (line) {
    const end = line.match(/\}/g)
    // console.log(line)
    // console.log('end', end)

    if (!end) {
      return
    }

    /*
    end.forEach(endItem => {
      this.bracketID--
      this.bracket = this.bracket.slice(0, this.bracket.Length - 2)
    })
    */

    this.bracketID--
    this.bracket.pop()

    // console.log('this.bracket', this.bracket)

    // 関数カッコの終了
    this.funcBracket.forEach(funBranketItem => {
      if (funBranketItem.id === this.bracketID) {
        this.subGetEndBrankOfFunction()
      }
    })
  }

  /**
   *
   */
  subGetEndBrankOfFunction () {
    // 関数の入れ子終了
    if (this.funcBracket.length !== 1) {
      // console.log('subGetEndBrankOfFunction', this.funcBracket)

      this.funcBracket.pop()
      this.nowFunction = this.funcBracket[this.funcBracket.length - 1].func
      this.nowFunctionIndex = this.funcBracket[this.funcBracket.length - 1].index
    }
  }

  /**
   * 関数リストの対象要素番号の取得
   */
  subGetListIndex (name, index) {
    let result = 0

    // console.log('[subGetListIndex] list: ', list)
    let listIndex = 0
    this.list.forEach(item => {
      if (item.name === name && item.index === index) {
        // console.log('[subGetListIndex] list: ', item.name)
        // console.log('[subGetListIndex] list: ', name)
        // console.log('[subGetListIndex] list: ', item.index)
        // console.log('[subGetListIndex] list: ', index)
        result = listIndex
      }
      listIndex++
    })
    return result
  }

  /**
   * 条件分岐カウント
   */
  subCountUpIF (line) {
    const isIF = this.subCheckIF(line)
    if (isIF === true) {
      this.countIF++

      const elem = this.subGetListIndex(this.nowFunction, this.nowFunctionIndex)
      // console.log('elem', elem, line)

      if (elem === -1 || elem === 0) {
        return
      }

      this.list[elem].ifNum = this.countIF
    }
  }

  /**
   *
   * @param {*} line
   * @returns
   */
  subCheckIF (line) {
    const checkIf = line.match(/if\s*\(/)
    const checkElseIf = line.match(/else\s*if\s*\(/)
    const checkSwitch = line.match(/switch\s*\(/)

    if (checkIf || checkElseIf || checkSwitch) {
      return true
    }

    return false
  }

  /**
   * 呼び出しメソッド取得
   */
  subGetUseMethods (line) {
    // console.log('subGetUseMethods', line)
    const check = this.functionString.getfunction(line)
    if (check !== '') {
      return
    }
    // console.log('check', check)

    const elem = this.subGetListIndex(this.nowFunction, this.nowFunctionIndex)
    // console.log('elem', elem)
    if (elem === -1) {
      return
    }

    const itemName = this.subCheckMethods(line)
    // console.log(itemName)
    if (itemName) {
      // console.log(itemName, this.nowFunction, this.nowFunctionIndex)
      // console.log(itemName)
      const newMethods = this.list[elem].useMethods.concat(itemName)
      // console.log(newMethods)
      this.list[elem].useMethods = Array.from(new Set(newMethods))
      // console.log(this.list[elem].useMethods)
    }
  }

  /**
   *
   * @param {*} line
   * @returns
   */
  subCheckMethods (line) {
    const callMethods = []
    const callStr = line.match(/\w+\s*\(/g)

    // console.log('callStr', callStr)

    if (!callStr) {
      return
    }

    if (callStr.length === 1) {
      this.list.forEach(item => {
        const isCallFunc = callStr[0].indexOf(item.name)
        if (isCallFunc !== -1) {
          callMethods.push(item.name)
        }
      })
    }

    if (callStr.length > 1) {
      callStr.forEach((callItem) => {
        this.list.forEach(item => {
          const isCallFunc = callItem.indexOf(item.name)
          if (isCallFunc !== -1) {
            callMethods.push(item.name)
          }
        })
      })
    }

    if (callMethods.length < 1) {
      // console.log('callMethods', callMethods)
      return null
    }

    return callMethods
  }
}

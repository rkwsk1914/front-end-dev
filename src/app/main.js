import * as Head from './header.js'
import { IndexJSChecker } from './module/indexjs-check/indexjs-checker.js'
import { SSList } from './module/ss-list/ss-list.js'
import { CallFunc } from './module/call-func/call-func.js'
import { SimpleGoogleSpreadsheet } from './common/simple-google-spreadsheet.js'

export class App {
  constructor () {
    this.running = false
  }

  /**
   * 初期化処理
   */
  init () {
    if (this.running === true) {
      // Browser.msgBox('別スクリプトが実行中です。')
      console.log('cancel')
      return
    }
    // console.log("[App] init")
    // Browser.msgBox('実行中')
    // let gasApp = new SimpleGoogleSpreadsheet(Head.BOOK_URL, Head.SHEET_FUNCTION_LIST)
    // const running = gasApp.doReadSS(1, Head.COL_A)
    // gasApp = null
    this.running = true
  }

  /**
   * 終了処理
   */
  fix () {
    // console.log("[App] resetRunnigStatusApp")
    // Browser.msgBox('Finish')

    // let gasApp = new SimpleGoogleSpreadsheet(Head.BOOK_URL, Head.SHEET_FUNCTION_LIST)
    // gasApp.doWriteSS(false, 1, Head.COL_A)
    // gasApp = null

    this.running = false
  }

  createList () {
    if (this.running === true) {
      return
    }

    this.init()

    const indexJSChecker = new IndexJSChecker()
    const data = indexJSChecker.doing()
    let gasApp = new SimpleGoogleSpreadsheet(Head.BOOK_URL, Head.SHEET_FUNCTION_LIST)
    const sslist = new SSList(data, gasApp)
    gasApp = null
    sslist.setList()

    this.fix()
  }

  checkCallFunction (row) {
    if (this.running === true) {
      return
    }

    this.init()

    let gasApp = new SimpleGoogleSpreadsheet(Head.BOOK_URL, Head.SHEET_FUNCTION_LIST)
    const callFunc = new CallFunc(gasApp)
    callFunc.showCallFunc(row)
    gasApp = null

    this.fix()
  }

  test () {
    const indexJSChecker = new IndexJSChecker()
    // const data = indexJSChecker.testDoing()
    const data = indexJSChecker.doing()
    // console.log(data)
    // let gasApp = new SimpleGoogleSpreadsheet(Head.BOOK_URL, Head.SHEET_FUNCTION_LIST)
    // const sslist = new SSList(data, gasApp)
    // gasApp = null
    // sslist.setList()
  }
}

import $ from 'jquery'
import { FuncListMaker } from './sub/func-list-maker.js'

export class IndexJSChecker {
  doing () {
    const jsData = this.readIndexjs()
    // console.log(jsData)
    const funcListMaker = new FuncListMaker()
    const list = funcListMaker.checkDetail(jsData)
    // console.log(list)
    return list
  }

  readIndexjs () {
    const username = 'kioiu'
    const password = '59438672'
    const url = 'https://www-pc-tr.sbpv.jp/mobile/set/data/support/lib/js/shared/src/index.js'

    const options = {
      headers: {
        Authorization: 'Basic ' + Utilities.base64Encode(username + ':' + password)
      }
    }
    const response = UrlFetchApp.fetch(url, options)
    const context = response.getContentText()
    const jsData = context.split(/\n/)
    return jsData
  }

  testDoing () {
    const url = 'http://wiro-br-pc.m2-dev.local/mobile/set/data/support/lib/js/shared/src/index.js'

    return $.ajax({
      /* Ajaxリクエストの設定  設定の詳細はこちら => http://js.studio-kingdom.com/jquery/ajax/ajax#1 */
      type: 'GET', /* リクエストタイプ GETかPOSTか */
      url: url, /* Ajaxリクエストを送信するURL */
      dataType: 'text' /* csv、txtファイルなら「text」, jsonファイルなら「json」などなど */
    })
      .done((data, textStatus, jqXHR) => {
        /* 読み込みに成功した時に行う処理 */
      // const jsData = this.readIndexjs()
        const jsData = data.split(/\n/)
        // console.log(jsData)
        const funcListMaker = new FuncListMaker()
        funcListMaker.checkDetail(jsData)
      // const list = funcListMaker.list
      // console.log(list)
      })
      .fail((jqXHR, textStatus, errortdrown) => {
        console.log(jqXHR)
        /* 読み込みに失敗した時に行う処理 */
      })
      .always(() => {
        /* どんな場合でも行う処理 */
      })
  }
}

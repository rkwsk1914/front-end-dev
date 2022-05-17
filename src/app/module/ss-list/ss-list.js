import * as Head from './../../header.js'

export class SSList {
  constructor (data, gasApp) {
    this.gasApp = gasApp
    this.data = data
  }

  setHorizontalAxis () {
    let col = Head.COL_H
    const row = Head.HORIZONTAL_AXIS_ROW
    this.data.forEach(item => {
      this.gasApp.doWriteSS(item.name, row, col)
      col = col + 1
    })
  }

  setVerticalAxis () {
    let row = Head.VERTICAL_AXIS_START_ROW
    this.data.forEach(item => {
      this.gasApp.doWriteSS(item.name, row, Head.COL_B)
      this.gasApp.doWriteSS(item.mvc, row, Head.COL_C)
      this.gasApp.doWriteSS(item.arguments.toString(), row, Head.COL_E)
      this.gasApp.doWriteSS(item.ifNum, row, Head.COL_G)
      this.setSelfFuncion(item, row)
      this.setCallfunction(item, row)
      row++
    })
  }

  setSelfFuncion (nowItem, row) {
    let col = Head.COL_H
    const data = this.data

    data.forEach(item => {
      if (item.name === nowItem.name) {
        this.gasApp.doWriteSS('ー', row, col)
        col++
        return
      }
      col++
    })
  }

  setCallfunction (nowItem, row) {
    const data = this.data

    nowItem.useMethods.forEach(method => {
      // console.log(method)
      let col = Head.COL_H

      data.forEach(item => {
        console.log(item.name)
        console.log(method)
        if (item.name === method) {
          console.log('○')
          this.gasApp.doWriteSS('◯', row, col)
          col++
          return
        }
        col++
      })
    })
  }

  setList () {
    this.setHorizontalAxis()
    this.setVerticalAxis()
  }
}

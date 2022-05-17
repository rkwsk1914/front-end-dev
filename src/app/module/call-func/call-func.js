import * as Head from './../../header.js'

export class CallFunc {
  constructor (gasApp) {
    this.gasApp = gasApp
    this.redColorRanges = []
    this.yellowColorRanges = []
    this.blueColorRanges = []

    this.lastRow = this.gasApp.doGetLastRow(Head.VERTICAL_AXIS_START_ROW, Head.COL_B)
    this.lastCol = this.gasApp.doGetLastCol(2, Head.COL_H)
    this.ssData = this.getAllData()
  }

  getAllData () {
    const data = this.gasApp.doReadSS(1, Head.COL_A, this.lastRow, this.lastCol)
    return data
  }

  changeColor () {
    this.yellowColorRanges.forEach(range => {
      this.gasApp.changeCellBackGroundColor('#f1d553', range.row, range.col)
    })

    this.redColorRanges.forEach(range => {
      this.gasApp.changeCellBackGroundColor('#e14e30', range.row, range.col)
    })

    this.blueColorRanges.forEach(range => {
      this.gasApp.changeCellBackGroundColor('#5a86ea', range.row, range.col)
    })
  }

  reset (newRow) {
    console.log('reset', this.lastRow)
    this.gasApp.changeCellBackGroundColor('#ffffff', Head.VERTICAL_AXIS_START_ROW, Head.COL_B, this.lastRow, Head.COL_B)
    this.gasApp.changeCellBackGroundColor('#ffffff', Head.HORIZONTAL_AXIS_ROW, Head.COL_H, Head.HORIZONTAL_AXIS_ROW, this.lastCol)

    for (let row = Head.VERTICAL_AXIS_START_ROW; row < this.lastRow; row++) {
      if (row !== newRow) {
        this.gasApp.doWriteSS(false, row, Head.COL_A)
      }
    }
  }

  getCallFunction (col, level) {
    for (let row = Head.VERTICAL_AXIS_START_ROW; row <= this.lastRow; row++) {
      const value = this.ssData[row - 1][col - 1]

      if (value === '◯') {
        const functionName = this.ssData[row - 1][Head.ARRAY_COL_B]
        console.log(`getCallFunction ${level}`, functionName)

        this.changeColorCallFunc(functionName, level)
      }
    }
  }

  changeColorCallFunc (functionName, level) {
    for (let row = 3; row <= this.lastRow; row++) {
      const value = this.ssData[row - 1][Head.ARRAY_COL_B]

      if (value === functionName) {
        const rangeData = {
          row: row,
          col: Head.COL_B
        }

        const functionName = this.ssData[row - 1][Head.ARRAY_COL_B]
        console.log('changeColorCallFunc', functionName, level)
        const col = this.getSelectFunction(functionName)

        switch (level) {
          case 1:
            this.redColorRanges.push(rangeData)
            this.redColorRanges.push({
              row: Head.HORIZONTAL_AXIS_ROW,
              col: col
            })
            break
          case 2:
            this.blueColorRanges.push(rangeData)
            this.blueColorRanges.push({
              row: Head.HORIZONTAL_AXIS_ROW,
              col: col
            })
            break
          default:
            break
        }
        this.getCallFunction(col, 2)
      }
    }
  }

  getSelectFunction (functionName) {
    for (let col = Head.COL_H; col < this.lastCol; col++) {
      const name = this.ssData[Head.HORIZONTAL_AXIS_ROW - 1][col - 1]
      if (name === functionName) {
        return col
      }
    }

    return null
  }

  checkCheckBox (row) {
    const value = this.ssData[row - 1][Head.ARRAY_COL_A]
    // console.log('checkCheckBox', value)
    this.reset(row)

    if (value === true) {
      this.yellowColorRanges.push({
        row: row,
        col: Head.COL_B
      })

      const functionName = this.ssData[row - 1][Head.ARRAY_COL_B]
      console.log('checkCheckBox', functionName)
      const col = this.getSelectFunction(functionName)
      this.yellowColorRanges.push({
        row: Head.HORIZONTAL_AXIS_ROW,
        col: col
      })

      this.getCallFunction(col, 1)
      this.changeColor()
    }
  }

  showCallFunc (row) {
    this.checkCheckBox(row)
  }
}

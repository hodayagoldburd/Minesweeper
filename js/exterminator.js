'use strict'

var gIsExterminatorUsed = false

function exterminator() {
    if (gIsExterminatorUsed || !gGame.isOn) return
    console.log('hi')

    gIsExterminatorUsed = true

    const elBtn = document.querySelector('#exterminatorBtn')
    elBtn.disabled = true
    elBtn.classList.add('disabled')
    const cellsToRemove = findMinesToRemove(3)
    if (!cellsToRemove.length) return
    exterminateMines(cellsToRemove)
}

function resetExterminatorBtn() {
    gIsExterminatorUsed = false
    const elBtn = document.querySelector('#exterminatorBtn')
    elBtn.disabled = false
    elBtn.classList.remove('disabled')
}

function findMinesToRemove() {
    var numToRemove = 3
    var mineCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) mineCells.push({ i, j })
        }
    }
    if (!mineCells.length) return []

    var toRemoveCells = []

    // var count = Math.min(numToRemove, mineCells.length)

    //always leaves at least one mine. not a bug :) 

    var count = Math.min(numToRemove, mineCells.length - 1 )

    for (var k = 0; k < count; k++) {
        var randIdx = getRandomInt(0, mineCells.length)
        var cell = mineCells.splice(randIdx, 1)[0]
        toRemoveCells.push(cell)
    }
    return toRemoveCells
}

function exterminateMines(toRemoveCells) {
    for (var k = 0; k < toRemoveCells.length; k++) {
        var i = toRemoveCells[k].i
        var j = toRemoveCells[k].j

        gBoard[i][j].isMine = false
    }
    gMinesLeftCount -= toRemoveCells.length
    updateMinesLeftDisplay()

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].minesAroundCount = minesAroundCount(i, j, gBoard)
            if (gBoard[i][j].isShown) {
                var elCell = document.querySelector('.cell[data-i="' + i + '"][data-j="' + j + '"]')
                if (elCell) {
                    elCell.textContent = gBoard[i][j].minesAroundCount
                }
                gBoard[i][j].minesAroundCount = minesAroundCount(i, j, gBoard)
            }

        }
    }
}
'use strict'

var gMinesLeftCount = 0

function setMines(board, mineCount, cellToExclude = null) {

    var emptyCells = []

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (cellToExclude && i === cellToExclude.i && j === cellToExclude.j) continue
            emptyCells.push({ i, j })
        }
    }
    for (var k = 0; k < mineCount; k++) {

        const randomIdx = getRandomInt(0, emptyCells.length)
        const minePosition = emptyCells.splice(randomIdx, 1)[0]

        board[minePosition.i][minePosition.j].isMine = true
        gMinesLeftCount = mineCount
        console.log(gMinesLeftCount)
        updateMinesLeftDisplay()
    }
}

function minesAroundCount(cellI, cellJ, board) {
    var count = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (board[i][j].isMine) count++
        }
    }
    return count
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine) continue
            board[i][j].minesAroundCount = minesAroundCount(i, j, board)
        }
    }
}

function allMinesReveal(clickedI, clickedJ) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine && !(i === clickedI && j === clickedJ)) {
                var selector = `[data-i="${i}"][data-j="${j}"]`
                var elCell = document.querySelector(selector)
                elCell.innerText = MINE

            }
        }
    }
}

function updateMinesLeftDisplay() {
    const elMinesLeft = document.getElementById('mines-left-number')
    elMinesLeft.innerText = `${gMinesLeftCount}`
}
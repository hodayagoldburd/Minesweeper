'use strict'

var gBoard = []
var gFirstClick = true

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInit() {
    buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    const size = gLevel.SIZE
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                isMine: false,
                isShown: false,
                isMarked: false,
                minesAroundCount: 0
            }
        }
    }
    setMines(board, gLevel.MINES)
    setMinesNegsCount(board)
    console.table(board)
    gBoard = board
}

function setMines(board, mineCount) {

    var emptyCells = []

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            emptyCells.push({ i, j })
        }
    }
    for (var k = 0; k < mineCount; k++) {

        const randomIdx = getRandomInt(0, emptyCells.length)
        const minePosition = emptyCells.splice(randomIdx, 1)[0]

        board[minePosition.i][minePosition.j].isMine = true
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


function renderBoard(board) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            strHTML += `<td class="cell" onclick="onCellClicked(this, ${i}, ${j})"
            oncontextmenu="onCellMarked(this, ${i}, ${j}); return false;">
                        </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {

}

function onCellMarked(elCell, i, j) {

}

function checkGameOver() {

}

function expandReveal(board, elCell, i, j) {

}
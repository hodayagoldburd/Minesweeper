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

var gMinesLeftCount = 0

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
    console.table(board)
    gBoard = board
}

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
            strHTML += `<td class="cell" data-i="${i}" data-j="${j}">
                        </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML

    var allCells = elContainer.querySelectorAll('.cell')

    for (var k = 0; k < allCells.length; k++) {
    var cellElement = allCells[k];
    (function(el, i, j){
        el.onclick = function() { onCellClicked(el, i, j); };
        el.oncontextmenu = function(event){
            event.preventDefault()
            onCellMarked(el, i, j)
        }
    })(cellElement, +cellElement.dataset.i, +cellElement.dataset.j);
}
}

function onCellClicked(elCell, i, j) {

    // if (!gGame.isOn) return
    if (gFirstClick) {
        gFirstClick = false
        gGame.isOn = true

        setMines(gBoard, gLevel.MINES, { i, j })
        setMinesNegsCount(gBoard)
            console.table(gBoard)

    }
    cellReveal(elCell, i, j)
}

function cellReveal(elCell, i, j) {

    var cell = gBoard[i][j]
    if (cell.isShown || cell.isMarked) return
    cell.isShown = true

    if (cell.isMine) {
        elCell.innerText = '💣'
    }
    else if (cell.minesAroundCount > 0) {
        elCell.innerText = cell.minesAroundCount
    }
    else {
        elCell.innerText = ''
    }
    elCell.classList.add('revealed')
}

function onCellMarked(elCell, i, j) {

    var cell = gBoard[i][j]
    if (cell.isShown) return

    cell.isMarked = !cell.isMarked
    if (cell.isMarked){
        elCell.innerText = '🚩'
    } else {
        elCell.innerText = ''
    }

}

function checkGameOver() {

}

function expandReveal(board, elCell, i, j) {

}
'use strict'

var gBoard = []
var gLevel = {
    SIZE: 4,
    MINES: 2,
    NAME: 'beginner'
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
    // console.table(board)
    gBoard = board
}

function renderBoard(board) {

    gLives = 3
    // console.log('lives left:', gLives)
    livesDisplayUpdate()
    resetHintsPanel()
    resetSafeClickBtn()

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
        (function (el, i, j) {
            el.onclick = function () { onCellClicked(el, i, j); };
            el.oncontextmenu = function (event) {
                event.preventDefault()
                onCellMarked(el, i, j)
            }
        })(cellElement, +cellElement.dataset.i, +cellElement.dataset.j);
    }
}

function setDifficulty(level) {
    if (level === 'beginner') {
        gLevel.SIZE = 4
        gLevel.MINES = 2
        gLevel.NAME = 'beginner'
    } else if (level === 'medium') {
        gLevel.SIZE = 8
        gLevel.MINES = 14
        gLevel.NAME = 'medium'
    } else if (level === 'expert') {
        gLevel.SIZE = 12
        gLevel.MINES = 32
        gLevel.NAME = 'expert'
    } else if (level === 'custom'){
        gLevel.SIZE = +prompt('Choose a board size:')
        gLevel.MINES = +prompt('How many mines to place?')
        gLevel.NAME = 'custom'
        if (gLevel.MINES >= Math.pow(gLevel.SIZE, 2) || gLevel.SIZE === 1 || !gLevel.MINES || gLevel.SIZE > 45) return
    }
    gMinesLeftCount = gLevel.MINES
    updateMinesLeftDisplay()
    resetHintsPanel()
    resetSafeClickBtn()
    resetTimer()
    resetExterminatorBtn()

    gFirstClick = true
    gGame.isOn = false
    // updateSmiley('neutral')
    onInit()
}
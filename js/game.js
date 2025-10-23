'use strict'

var gBoard = []
var gFirstClick = true
const gLabel = document.getElementById('lives-label')

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isGameOver: false
}
var gLives = 3
var gSmiley = null
var gMinesLeftCount = 0


function onInit() {
    buildBoard()
    renderBoard(gBoard)
    resetHintsPanel()
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


function renderBoard(board) {

    gLives = 3
    console.log('lives left:', gLives)
    livesDisplayUpdate()
    resetHintsPanel()

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
    } else if (level === 'medium') {
        gLevel.SIZE = 8
        gLevel.MINES = 14
    } else if (level === 'expert') {
        gLevel.SIZE = 12
        gLevel.MINES = 32
    } else if (level === 'custom'){
        gLevel.SIZE = +prompt('Choose a board size:')
        gLevel.MINES = +prompt('How many mines to place?')
        if (gLevel.MINES >= gLevel.SIZE || gLevel.SIZE === 1 || !gLevel.MINES) return
    }
    gMinesLeftCount = gLevel.MINES
    updateMinesLeftDisplay()
    resetHintsPanel()

    gFirstClick = true
    gGame.isOn = false
    // updateSmiley('neutral')
    onInit()
}

function onCellClicked(elCell, i, j) {
    if (gGame.isGameOver) return
    if (gIsHintMode && gHintsCounter > 0){
        gIsHintMode = false
        showHint(i, j)
        return
    }
    if (gFirstClick) {
        gFirstClick = false
        gGame.isOn = true

        setMines(gBoard, gLevel.MINES, { i, j })
        setMinesNegsCount(gBoard)
        console.table(gBoard)


    }
    cellReveal(elCell, i, j)
    checkGameOver()
}

function livesDisplayUpdate() {
    const heartsContainer = document.getElementById('lives-hearts')
    if (gLives === 0) {
        gLabel.innerText = "No lives left"
        heartsContainer.style.display = "none"
    } else {
        gLabel.innerText = "Lives left:"
        heartsContainer.style.display = "flex"
    }
    const heartImages = heartsContainer.querySelectorAll('.heart')

    for (var i = 0; i < heartImages.length; i++) {
        if (i < gLives) {
            heartImages[i].style.display = 'inline-block'
        } else {
            heartImages[i].style.display = 'none'
        }
    }
}


function cellReveal(elCell, i, j) {

    var cell = gBoard[i][j]
    if (cell.isShown || cell.isMarked) return
    cell.isShown = true

    if (cell.isMine) {
        if (gLives > 0) {
            elCell.innerText = '💣'
            gLives--
            console.log('lives left:', gLives)
            livesDisplayUpdate()
            setTimeout(() => {
                elCell.innerText = ''
            }, 1500)
            cell.isShown = false
            return

        } else {
            elCell.classList.add('exploded')
            elCell.innerText = '💣'

            gGame.isGameOver = true
            allMinesReveal(i, j)
            updateSmiley('sad')
            console.log('Game over')
            gLabel.innerText = "Game over.... Try again!"

            return
        }
    }
    else if (cell.minesAroundCount > 0) {
        elCell.innerText = cell.minesAroundCount
    }
    else {
        elCell.innerText = ''
    }
    elCell.classList.add('revealed')
    if (cell.minesAroundCount === 0 && !cell.isMine) {
        expandReveal(gBoard, elCell, i, j)
    }
    checkGameOver()
}

function allMinesReveal(clickedI, clickedJ) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine && !(i === clickedI && j === clickedJ)) {
                var selector = `[data-i="${i}"][data-j="${j}"]`
                var elCell = document.querySelector(selector)
                elCell.innerText = '💣'

            }
        }
    }
}


function onCellMarked(elCell, i, j) {

    var cell = gBoard[i][j]
    if (cell.isShown) return

    if (!cell.isMarked && gMinesLeftCount === 0) return

    cell.isMarked = !cell.isMarked
    if (cell.isMarked) {
        elCell.innerText = '🚩'
        gMinesLeftCount--
        checkGameOver()
        console.log('mines left: ', gMinesLeftCount)
        updateMinesLeftDisplay()
    } else {
        elCell.innerText = ''
        gMinesLeftCount++
        console.log('mines left: ', gMinesLeftCount)
        updateMinesLeftDisplay()
    }

}

function updateMinesLeftDisplay() {
    const elMinesLeft = document.getElementById('mines-left-number')
    elMinesLeft.innerText = `${gMinesLeftCount}`
}

function checkGameOver() {
    //it is checking for win only after the click, need to repair that
    var size = gBoard.length
    var allCellsRevealedOrMarked = true

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var cell = gBoard[i][j]
            if (!cell.isMine && !cell.isShown) allCellsRevealedOrMarked = false
            if (cell.isMine && !cell.isMarked) allCellsRevealedOrMarked = false
        }
    }

    if (allCellsRevealedOrMarked) {
        gGame.isGameOver = true

        updateSmiley('happy')
        console.log('You won!')
        gLabel.innerText = "You won!"
    }
}

function updateSmiley(state) {
    var elSmiley = document.getElementById('smiley')
    if (state === 'happy') elSmiley.src = 'images/happy.jpg'
    else if (state === 'sad') elSmiley.src = 'images/sad.jpg'
    else elSmiley.src = 'images/neutral.jpg'
}

function smileyClicked() {
    if (!gGame.isGameOver) return

    gGame.isGameOver = false
    gFirstClick = true
    gGame.isOn = false
    updateSmiley('neutral')
    onInit()
}

function expandReveal(board, elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === cellI && j === cellJ) continue

            var neighborCell = board[i][j]
            if (neighborCell.isShown || neighborCell.isMarked) continue

            var selector = `[data-i="${i}"][data-j="${j}"]`
            var elNeighborCell = document.querySelector(selector)

            cellReveal(elNeighborCell, i, j)
        }
    }


}
'use strict'

var gFirstClick = true
var MINE = '💣'
var FLAG = '🚩'
const gLabel = document.getElementById('lives-label')

var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isGameOver: false
}

function onInit() {
    buildBoard()
    renderBoard(gBoard)
    resetHintsPanel()
    resetTimer()
    resetExterminatorBtn()
    resetFairPlayBtn()
    checkFairModeAvailable()
    initDarkModeStatus()
    loadBestTime()
    renderBestTimes()
    resetMegaHintBtn()
    resetUndoBtn()
}

function onCellClicked(elCell, i, j) {
    if (gGame.isGameOver) return

    if (gIsHintMode) {
        gIsHintMode = false
        showHint(i, j)
        return
    }
    if (gFirstClick) {
        gFirstClick = false
        gGame.isOn = true
        startTimer()
        enableMegaHintBtn()
        setMines(gBoard, gLevel.MINES, { i, j })
        setMinesNegsCount(gBoard)
    }


    if (gMegaHintActive) {
        handleMegaHint(i, j)
        return
    }


    // console.table(gBoard)

    gLastClickedCell = { el: elCell, i: i, j: j, content: elCell.innerText }
    gUndoAvailable = true

    cellReveal(elCell, i, j)
    checkGameOver()

}


var gLives = 3
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
            elCell.innerText = MINE
            gLives--
            // console.log('lives left:', gLives)
            livesDisplayUpdate()
            setTimeout(() => {
                elCell.innerText = ''
            }, 1500)
            cell.isShown = false
            return

        } else {
            elCell.classList.add('exploded')
            elCell.innerText = MINE

            gGame.isGameOver = true
            stopTimer()
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

function onCellMarked(elCell, i, j) {

    var cell = gBoard[i][j]
    if (cell.isShown) return

    if (!cell.isMarked && gMinesLeftCount === 0) return

    cell.isMarked = !cell.isMarked
    if (cell.isMarked) {
        elCell.innerText = FLAG
        gMinesLeftCount--
        checkGameOver()
        console.log('mines left: ', gMinesLeftCount)
        updateMinesLeftDisplay()
    } else {
        elCell.innerText = ''
        gMinesLeftCount++
        // console.log('mines left: ', gMinesLeftCount)
        updateMinesLeftDisplay()
    }

}


function checkGameOver() {
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
        stopTimer()

        updateSmiley('happy')
        gLabel.innerText = "You won!"
        if (gLevel.NAME !== 'custom')

            saveBestTime(gLevel.NAME)
        loadBestTime()
        renderBestTimes()
    }
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

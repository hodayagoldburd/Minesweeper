'use strict'

var gMegaHintActive = false
var gMegaHintUsed = false
var gGiveMegaHint = null
var gChosenCells = null


function onMegaHintBtnClick() {
    if (gMegaHintUsed) return
    gMegaHintActive = true
    var btn = document.getElementById('mega-hint-btn')
    btn.disabled = true
    btn.classList.add('disabled')
    // console.log('Mega-Hint activated! Click top-left and bottom-right cells.')
}


function handleMegaHint(i, j) {

    if (gMegaHintUsed) return

    if (!gGiveMegaHint) {
        gGiveMegaHint = { i, j }
        // console.log('Top-left cell selected:', gGiveMegaHint)
        return
    }


    gChosenCells = { i, j }
    console.log('Bottom-right cell selected:', gChosenCells)

    revealMegaHintArea(gGiveMegaHint, gChosenCells)

    gMegaHintUsed = true
    gMegaHintActive = false

    gGiveMegaHint = null
    gChosenCells = null
}

function revealMegaHintArea(topLeft, bottomRight) {
    var cellsToReveal = []

    for (var i = topLeft.i; i <= bottomRight.i; i++) {
        for (var j = topLeft.j; j <= bottomRight.j; j++) {
            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            if (!elCell) continue

            var cellData = gBoard[i][j]

            
            var originalContent = elCell.innerText

           
            var alreadyRevealed = elCell.classList.contains('revealed')

            
            elCell.classList.add('mega-hint-temp')

            if (cellData.isMine) {
                elCell.innerText = MINE
            } else {
                elCell.innerText = cellData.minesAroundCount || ''
            }

           
            cellsToReveal.push({
                el: elCell,
                originalContent: originalContent,
                wasAlreadyRevealed: alreadyRevealed
            })
        }
    }

    
    setTimeout(function () {
        for (var k = 0; k < cellsToReveal.length; k++) {
            var cell = cellsToReveal[k]

            
            if (!cell.wasAlreadyRevealed) {
                cell.el.innerText = cell.originalContent
                cell.el.classList.remove('mega-hint-temp')
            } else {
                
                cell.el.classList.remove('mega-hint-temp')
            }
        }
    }, 2000)
}



function resetMegaHintBtn() {
    gMegaHintActive = false
    gMegaHintUsed = false
    gGiveMegaHint = null
    gChosenCells = null

    var btn = document.getElementById('mega-hint-btn')
    if (btn) {
        btn.disabled = true
        btn.classList.add('disabled')
    }


}

function enableMegaHintBtn() {
    var btn = document.getElementById('mega-hint-btn')
    if (!btn) return
    btn.disabled = false
    btn.classList.remove('disabled')
    // console.log('Mega Hint button is now enabled!')
}
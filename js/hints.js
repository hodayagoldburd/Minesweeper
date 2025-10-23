'use strict'

var gIsHintsAvailable = true
var gHintsCounter = 3
var gIsHintMode = false

function giveHint(ev) {

    if (!gIsHintsAvailable || gGame.isGameOver || !gGame.isOn) return

    gIsHintMode = true
    const elHintLights = document.querySelectorAll('.hint-light')

    for (var i = 0; i < elHintLights.length; i++) {
        if (elHintLights[i].src.includes('hint-on.png')) {
            elHintLights[i].src = 'images/hint-off.png'

            gHintsCounter--
            console.log('hints left', gHintsCounter)
            break
        }
    }

    if (gHintsCounter === 0) {
        // gIsHintsAvailable = false
        var elHintBtn = document.querySelector('.btn-hint')
        elHintBtn.disabled = true
        elHintBtn.classList.add('disabled')
    }
}

function showHint(cellI, cellJ) {

    gIsHintMode = false
    var cellsToReveal = []

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            var cell = gBoard[i][j]
            if (!cell.isShown && !cell.isMarked) {
                cellsToReveal.push({ i, j })
            }
        }
    }

    for (var k = 0; k < cellsToReveal.length; k++) {
        var pos = cellsToReveal[k]
        var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`)
        var cell = gBoard[pos.i][pos.j]
        elCell.classList.add('revealed')
        if (cell.minesAroundCount > 0) elCell.innerText = cell.minesAroundCount
        if (cell.isMine) elCell.innerText = '💣'
    }

    setTimeout(function () {
        for (var k = 0; k < cellsToReveal.length; k++) {
            var pos = cellsToReveal[k]
            var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`)
            var cell = gBoard[pos.i][pos.j]
            if (!cell.isShown) {
                elCell.classList.remove('revealed')
                elCell.innerText = ''
            }
        }
    }, 1500)
}


function resetHintsPanel() {
    gHintsCounter = 3
    gIsHintsAvailable = true
    gIsHintMode = false
    const elHintBtn = document.querySelector('.btn-hint')
    elHintBtn.disabled = false
    elHintBtn.classList.remove('disabled')

    const elHintLights = document.querySelectorAll('.hint-light')
    for (var i = 0; i < elHintLights.length; i++) {
        elHintLights[i].src = 'images/hint-on.png'

    }
}
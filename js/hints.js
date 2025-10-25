'use strict'

var gIsHintsAvailable = true
var gHintsCounter = 3
var gIsHintMode = false

function giveHint(event) {

    if (!gIsHintsAvailable || gGame.isGameOver || !gGame.isOn || gIsHintMode) return

    gIsHintMode = true
    const elHintLights = document.querySelectorAll('.hint-light')

    for (var i = 0; i < elHintLights.length; i++) {
        if (elHintLights[i].src.includes('hint-off.png')) {
            elHintLights[i].src = 'images/hint-on.png'

            gHintsCounter--
            
            break
        }
    }

    if (gHintsCounter === 0) {

        var elHintBtn = document.querySelector('.hints-label')
        elHintBtn.disabled = true
        elHintBtn.classList.add('disabled')
    }
}

function showHint(cellI, cellJ) {

// if (!gIsHintMode) return
if (gHintsCounter < 0) return

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
        if (cell.isMine) elCell.innerText = MINE
    }

    setTimeout(function () {
        for (var k = 0; k < cellsToReveal.length; k++) {
            var pos = cellsToReveal[k]
            var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`)
           if (!elCell) continue
            var cell = gBoard[pos.i][pos.j]
            if (!cell.isShown) {
                elCell.classList.remove('revealed')
                elCell.innerText = ''
            }
        }
        var elHintLights = document.querySelectorAll('.hint-light')
        for (var i = 0; i < elHintLights.length; i++) {
            if (elHintLights[i].style.display !== 'none') {
                elHintLights[i].style.display = 'none'
                break
            }
        }
        var elHintContainer = document.querySelector('.hint-lights')
        var anyLightVisible = false

        for (var i = 0; i < elHintLights.length; i++) {
            if (elHintLights[i].style.display !== 'none') {
                anyLightVisible = true
                break
            }
        }

        if (!anyLightVisible) {
            elHintContainer.style.display = 'none'
        }
            gIsHintMode = false
            
        
    }, 1500)
}


function resetHintsPanel() {
    gHintsCounter = 3
    gIsHintsAvailable = true
    gIsHintMode = false

    const elHintBtn = document.querySelector('.hints-label')
    elHintBtn.disabled = false
    elHintBtn.classList.remove('disabled')

    const elHintLights = document.querySelectorAll('.hint-light')
    for (var i = 0; i < elHintLights.length; i++) {
        elHintLights[i].src = 'images/hint-off.png'
        elHintLights[i].style.display = 'inline-block'

        const elHintContainer = document.querySelector('.hint-lights')
        elHintContainer.style.display = 'flex'
    }
}
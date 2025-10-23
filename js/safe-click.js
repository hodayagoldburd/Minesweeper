'use strict'

var gSafeClicksLeft = 3
var gSafeClickBtn = document.querySelector('.btn-safe-click')

function safeClick() {

    if (gSafeClicksLeft === 0 || !gGame.isOn) return

    gSafeClicksLeft--
    gSafeClickBtn.textContent = `Safe clicks left: ${gSafeClicksLeft}`
    if (gSafeClicksLeft === 0) {
        gSafeClickBtn.classList.add('disabled')
        gSafeClickBtn.disabled = true
    }
    const safeCells = []
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j]
            if (!cell.isShown && !cell.isMine && !cell.isMarked) {
                safeCells.push({ i, j })
            }
        }
    }
    if (!safeCells.length) return

    const randIdx = getRandomInt(0, safeCells.length)
    const { i, j } = safeCells[randIdx]
    const elCell = document.querySelector(`.cell[data-i="${i}"][data-j="${j}"]`)
    elCell.classList.add('safe-hint')

    setTimeout(() => {
        elCell.classList.remove('safe-hint')

    }, 1500)
}

function resetSafeClickBtn() {
    gSafeClicksLeft = 3
    gSafeClickBtn.classList.remove('disabled')
    gSafeClickBtn.textContent = `Safe clicks left: ${gSafeClicksLeft}`
    gSafeClickBtn.disabled = false
}

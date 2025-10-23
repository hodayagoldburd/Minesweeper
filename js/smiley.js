'use strict'

var gSmiley = null

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
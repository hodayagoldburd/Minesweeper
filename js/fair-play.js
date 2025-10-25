'use strict'

function checkFairModeAvailable() {

    const btn = document.getElementById('fairPlayBtn')
    
    if (gLives < gLevel.MINES) {
        btn.disabled = true
        btn.classList.add('disabled')
        // btn.innerText = 'Fair play mode is not available'
        btn.setAttribute('data-trans', 'fairPlayNotAvailable')
    } else {
        btn.disabled = false
        btn.classList.remove('disabled')
        // btn.innerText = 'Fair play'
        btn.setAttribute('data-trans', 'fairPlayBtn')
    }
    const key = btn.getAttribute('data-trans')
if (translations[gCurrentLang] && translations[gCurrentLang][key]) {
    btn.innerText = translations[gCurrentLang][key]
}
    // btn.innerText = translations[currentLang][btn.getAttribute('data-trans')]
}

function fairPlayMode() {
    console.log('fair')
    var mines = gLevel.MINES
    
    const btn = document.getElementById('fairPlayBtn')
    if (btn.disabled) return

    if (gLives >= mines) {
        gLives = mines - 1;
        if (gLives < 1) gLives = 1
    }

    livesDisplayUpdate()

    btn.setAttribute('data-trans', 'playingFair')

    // btn.innerText = 'Playing fair'
if (translations[gCurrentLang] && translations[gCurrentLang][btn.getAttribute('data-trans')]) {
        btn.innerText = translations[gCurrentLang][btn.getAttribute('data-trans')]
    } else {
        btn.innerText = 'Playing fair'
    }
    btn.disabled = true

    btn.classList.add('disabled')
    // btn.innerText = translations[currentLang][btn.getAttribute('data-trans')]
}

function resetFairPlayBtn(){

const btn = document.getElementById('fairPlayBtn')

btn.classList.remove('disabled')
btn.disabled = false
}
'use strict'

var gTimerInterval = null
var gStartTime = 0
var gBestTimes = {}

function startTimer() {
    if (gTimerInterval) return
    gStartTime = Date.now()
    gTimerInterval = setInterval(updateTimer, 1000)
}

function updateTimer() {
    var secCount = Math.floor((Date.now() - gStartTime) / 1000)
    document.getElementById('timer').innerText = secCount
}

function stopTimer() {
    clearInterval(gTimerInterval)
    gTimerInterval = null
}

function resetTimer() {
    stopTimer()
    gStartTime = 0
    document.getElementById('timer').innerText = 0
}

function saveBestTime(level) {
    if (level === 'custom') return
    var timeInSeconds = Math.floor((Date.now() - gStartTime) / 1000)
    const key = 'bestTime_' + level
    const prevTime = localStorage.getItem(key)
    if (!prevTime || timeInSeconds < +prevTime) {
        localStorage.setItem(key, timeInSeconds)
    }
}

function loadBestTime() {

    var levels = ['beginner', 'medium', 'expert']
    for (var i = 0; i < levels.length; i++) {
        var level = levels[i];
        var time = localStorage.getItem('bestTime_' + level)

        if (time) {
            gBestTimes[level] = +time
        } else {
            gBestTimes[level] = null
        }
    }
}

function renderBestTimes() {
    var levels = ['beginner', 'medium', 'expert'];

    for (var i = 0; i < levels.length; i++) {
        var level = levels[i];
        var elSpan = document.getElementById('bestTime_' + level)
        if (gBestTimes[level] !== null) {
            elSpan.innerText = gBestTimes[level];
        } else {
            elSpan.innerText = '-'
        }
    }
}
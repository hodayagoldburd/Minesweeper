'use strict'

var gIsDarkMode = false

function toggleDarkMode() {
    gIsDarkMode = !gIsDarkMode
    document.body.classList.toggle('dark-mode', gIsDarkMode)

    const btn = document.getElementById('darkModeBtn')
    btn.setAttribute('data-trans', gIsDarkMode ? 'light-mode' : 'dark-mode')

   
    setLanguage(document.documentElement.lang.startsWith('he') ? 'he' : 'en')
}

function initDarkModeStatus() {
    const btn = document.getElementById('darkModeBtn')
    gIsDarkMode = document.body.classList.contains('dark-mode')
btn.innerText = gIsDarkMode ? 'Light Mode' : 'Dark Mode'
    btn.setAttribute('data-trans', gIsDarkMode ? 'light-mode' : 'dark-mode')

    setLanguage(document.documentElement.lang.startsWith('he') ? 'he' : 'en')
}

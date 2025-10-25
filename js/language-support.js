'use strict'

const translations = {
    en: {
        title: 'Minesweeper',
        'btn-safe-click': 'Safe clicks left: ',
        signature: 'Hodaya Goldburd.',
        'hints-label': 'Hint',
        'best-title': 'Best results:',
        beginner: 'Beginner',
        medium: 'Medium',
        expert: 'Expert',
        'btn-beginner': 'Beginner',
        'btn-medium': 'Medium',
        'btn-expert': 'Expert',
        'btn-custom': 'Custom',
        'dark-mode': 'Dark mode 🌛',
        'light-mode': 'Light mode ☀️',
        'choose-difficulty-header': 'Choose game difficulty level:',
        exterminatorBtn: 'Exterminator',
        fairPlayBtn: 'Fair play',
        fairPlayNotAvailable: 'Fair play mode is not available',
        playingFair: 'Playing fair',
        'mega-hint-btn': 'Mega hint',
        undoBtn: 'Undo last click',
        // 'mines-left-container':'Mines left'
        // timer: 'Timer: '
    },

    he: {
        title: 'שולה המוקשים',
        'btn-safe-click': 'לחיצות בטוחות שנותרו: ',
        signature: 'הודיה גולדבורד.',
        'hints-label': 'רמז',
        'best-title': 'התוצאות הטובות ביותר:',
        beginner: 'מתחיל',
        medium: 'בינוני',
        expert: 'מומחה',
        'btn-beginner': 'מתחיל',
        'btn-medium': 'בינוני',
        'btn-expert': 'מומחה',
        'btn-custom': 'התאמה אישית',
        'dark-mode': 'מצב לילה 🍌',
        'light-mode': 'מצב יום 🌻',
        'choose-difficulty-header': 'בחר רמת קושי למשחק:',
        exterminatorBtn: 'מחסל המוקשים',
        fairPlayBtn: 'משחק הוגן',
        fairPlayNotAvailable: 'מצב משחק הוגן לא פעיל',
        playingFair: 'מצב משחק הוגן מופעל',
        'mega-hint-btn': 'רמז מיוחד',
        undoBtn: 'בטל לחיצת עכבר אחרונה',
        // 'mines-left-container': 'מספר מוקשים שנותרו: '
        // timer:'שניות שחלפו: '
    }
}

var gCurrentLang = 'en'

function setLanguage(language) {

    gCurrentLang = language
    document.documentElement.dir = (language === 'he') ? 'rtl' : 'ltr'
    document.documentElement.lang = (language === 'he') ? 'he' : 'en'

    const elements = document.querySelectorAll('[data-trans]')

    elements.forEach(el => {
       
        if (el.id === 'darkModeBtn') {
            if (document.body.classList.contains('dark-mode')) {
                el.setAttribute('data-trans', 'light-mode')
            } else {
                el.setAttribute('data-trans', 'dark-mode')
            }
        }

        const key = el.getAttribute('data-trans')
        if (translations[language] && translations[language][key]) {
            el.textContent = translations[language][key]
        }
    })
}
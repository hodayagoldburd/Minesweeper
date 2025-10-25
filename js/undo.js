'use strict'

var gLastClickedCell = null
var gUndoAvailable = false



function undoLastClick(){
    // console.log('undo!')
    
    if (!gUndoAvailable || !gLastClickedCell) return

    gLastClickedCell.el.innerText = gLastClickedCell.content

    gLastClickedCell.el.classList.remove('revealed')

    gUndoAvailable = false
    gLastClickedCell = null
    // console.log('Undo performed. Button is now disabled.')

    var btn = document.getElementById('undoBtn')
    btn.classList.add('disabled')
    btn.disabled = true
}

function resetUndoBtn() {
    var btn = document.getElementById('undoBtn')
    if (!btn) return

    btn.disabled = false

    btn.classList.remove('disabled')

    // console.log('Undo button reset and enabled!');
}

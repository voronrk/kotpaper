document.addEventListener('DOMContentLoaded', ()=> {
    'use strict';
    
    const dropdown=document.getElementById('dropdown'),
          paper=document.getElementById('paper');

    paper.addEventListener('focus', () => {
        dropdown.style.display='block';
    });

    paper.addEventListener('input', () => {
        dropdown.style.display='none';
    });

    dropdown.addEventListener('blur', () => {
        dropdown.style.display='none';
    });

    dropdown.addEventListener('click', (event) => {
        const target=event.target;
        const targetItem=target.textContent;
        paper.value=targetItem;
        dropdown.style.display='none';
    });

});
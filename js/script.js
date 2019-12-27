document.addEventListener('DOMContentLoaded', ()=> {
    'use strict';
    
    const dropdown=document.getElementById('dropdown');
    const dropdownItems=dropdown.childNodes;
    console.log(dropdown);
    console.log(dropdownItems);

    dropdown.addEventListener('click', () => {
        const dropdownItems=dropdown.childNodes;
        console.log (dropdownItems);
    });

});
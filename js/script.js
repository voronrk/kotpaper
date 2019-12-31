document.addEventListener('DOMContentLoaded', ()=> {
    'use strict';
    
    const dropdown=document.getElementById('dropdown'),
          paper=document.getElementById('paper');
          num=document.getElementById('num');
          plan=document.getElementById('plan');
          fact=document.getElementById('fact');
          oper=document.getElementById('oper');
          submit=document.getElementById('submit');

    const papersList = () => {
          const request = new XMLHttpRequest();
          const url = "../loadPapers.php";
          request.open("POST", url, true);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
           
          request.addEventListener("readystatechange", () => {
              if(request.readyState === 4 && request.status === 200) {       
                  let papersList=(request.responseText).split(';');

                  papersList.forEach( (paper, i) =>{
                      dropdown.innerHTML +='<li class="dropdown-item">'+paper+'</li>';
                  });
              }
          });
          request.send();
    };
    
    papersList();

    paper.addEventListener('focus', () => {
        dropdown.style.display='block';
    });

    paper.addEventListener('input', () => {
        dropdown.style.display='none';
    });

    dropdown.addEventListener('click', (event) => {
        const target=event.target;
        const targetItem=target.textContent;
        paper.value=targetItem;
        dropdown.style.display='none';
    });

    submit.addEventListener('click', () => {
        let currentString = num.value + ';' + 
                            paper.value + ';' + 
                            plan.value + ';' + 
                            (-1)*fact.value + ';' + 
                            oper.value + ';' +
                            new Date();
        console.log(currentString);
        const request = new XMLHttpRequest();
        const url = "../savePaper.php";
        const params = 'paper=' + currentString;
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
           
        request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) {       
                let savingResult=(request.responseText);
		console.log(savingResult);
            }
          });
          request.send(params);
          num.value="";
          paper.value="";
          plan.value="";
          fact.value="";
          oper.value="";
    });

    
});
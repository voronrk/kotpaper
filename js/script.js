document.addEventListener('DOMContentLoaded', ()=> {
    'use strict';
    
    const dropdown=document.getElementById('dropdown'),
          dropdownIn=document.getElementById('dropdown-in'),
          paper=document.getElementById('paper'),
          paperIn=document.getElementById('paper-in'),
          num=document.getElementById('num'),
          numIn=document.getElementById('num-in'),
          plan=document.getElementById('plan'),
          fact=document.getElementById('fact'),
          countIn=document.getElementById('count-in'),
          oper=document.getElementById('oper'),
          operIn=document.getElementById('oper-in'),
          submit=document.getElementById('submit'),
          submitIn=document.getElementById('submit-in'),
          container=document.getElementById('container'),
          form=document.getElementById('form'),
          formReport=document.getElementById('form-report'),
          submitMove=document.getElementById('submit-move'),
          submitReport=document.getElementById('submit-report'),
          submitBalance=document.getElementById('submit-balance'),
          reportTable=document.getElementById('report-table'),
          dateFrom1=document.getElementById('date-from-1'),
          dateFrom2=document.getElementById('date-from-2'),
          dateTo1=document.getElementById('date-to-1'),
          dateTo2=document.getElementById('date-to-2');


    const papersList = () => {
          const request = new XMLHttpRequest();
          const url = "../loadPapers.php";
          request.open("POST", url, true);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
           
          request.addEventListener("readystatechange", () => {
              if(request.readyState === 4 && request.status === 200) {       
                  let papersList=(request.responseText).split(';');

                  papersList.forEach( (paper, i) =>{
                      dropdown.innerHTML +='<li class="dropdown-item" id="paper-item">'+paper+'</li>';
                      dropdownIn.innerHTML +='<li class="dropdown-item" id="paper-item-in">'+paper+'</li>';
                  });
              }
          });
          request.send();
    };
    
    papersList();

    container.addEventListener('click', (event) => {
        const target=event.target;
        // console.log(target.id);
        if (target.id!='paper') dropdown.style.display='none';
        if (target.id!='paper-in') dropdownIn.style.display='none';

    });

    paper.addEventListener('focus', () => {
        dropdown.style.display='block';
    });

    paperIn.addEventListener('focus', () => {
        dropdownIn.style.display='block';
    });

    paper.addEventListener('input', () => {
        // dropdown.style.display='none';
    });

    dropdown.addEventListener('click', (event) => {
        const target=event.target;
        const targetItem=target.textContent;
        paper.value=targetItem;
        dropdown.style.display='none';
    });

    dropdownIn.addEventListener('click', (event) => {
        const target=event.target;
        const targetItem=target.textContent;
        paperIn.value=targetItem;
        dropdownIn.style.display='none';
    });

    submit.addEventListener('click', () => {
        let currentString = num.value + ';' + 
                            paper.value + ';' + 
                            (-1)*plan.value + ';' + 
                            (-1)*fact.value + ';' + 
                            oper.value + ';' +
                            new Date().getFullYear()+ '-'+ new Date().getMonth()+1 + '-'+ new Date().getDate();
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

    submitIn.addEventListener('click', () => {
        let currentString = numIn.value + ';' + 
                            paperIn.value + ';' + 
                            '0' + ';' + 
                            countIn.value + ';' + 
                            operIn.value + ';' +
                            new Date().getFullYear()+ '-'+ new Date().getMonth()+1 + '-'+ new Date().getDate();
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
          numIn.value="";
          paperIn.value="";
          countIn.value="";
          operIn.value="";
    });

    submitMove.addEventListener('click', () => {
        form.style.display='none';
        formReport.style.display='flex';

        const request = new XMLHttpRequest();
          const url = "../readPapersBase.php";
          const params="datefrom='"+dateFrom1.value+"'&dateto='"+dateTo1.value+"'";
          request.open("POST", url, true);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
           
          request.addEventListener("readystatechange", () => {
              if(request.readyState === 4 && request.status === 200) {       
                  let result=JSON.parse(request.responseText)
                  result.forEach( (items, i) =>{
                    let item=items.split(';');
                        let incoming="";
                        let expenditure="";
                        if (item[4]>0) {
                            incoming=item[4];
                            expenditure="";
                        } else {
                            incoming="";
                            expenditure=item[4]*(-1);}

                      reportTable.innerHTML += 
                      '<tr><td class="table-cell">'+
                      item[2]+
                      '</td><td class="table-cell">'+
                      incoming+
                      '</td><td class="table-cell">'+
                      expenditure+
                      '</td><td class="table-cell">'+
                      item[5]+
                      '</td><td class="table-cell">'+
                      item[6]+
                      '</td></tr>';

                  });
              }
          });
          request.send(params);
    });

    
});

const addEdBut=document.querySelector('#addedbut') ;
const addExpBut=document.querySelector('#addexpbut') ;
    addEdBut.addEventListener('click',(e)=>{
    e.preventDefault();
    
    var edDiv=document.getElementById('education');
    var edCont=document.querySelector('.educontainer');
    var innerDiv=document.createElement('div');    
    innerDiv.innerHTML=''           
    edDiv.appendChild(innerDiv);
    
    
});

    addExpBut.addEventListener('click',(e)=>{
    e.preventDefault();
    
    var edDiv=document.getElementById('education');
    var edCont=document.querySelector('.educontainer');
    var innerDiv=document.createElement('div');    
    innerDiv.innerHTML=''           
    edDiv.appendChild(innerDiv);
    
    
});
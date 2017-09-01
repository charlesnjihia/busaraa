const addRolesBut=document.querySelector('#addrolesbut') ;
addRolesBut.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('clicked')
    var rolesDiv=document.getElementById('roles');
    let inputText=document.createElement('input');
    inputText.className='form-control';
    inputText.style.marginTop='5px';
    rolesDiv.appendChild(inputText); 
    //rolesDiv.insertBefore(addRolesBut,inputText);   
    
});

const addReqBut=document.querySelector('#addreqbut') ;
addReqBut.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('clicked')
    var reqDiv=document.getElementById('requirements');
    let inputText=document.createElement('input');
    inputText.className='form-control';
    inputText.style.marginTop='5px';
    reqDiv.appendChild(inputText); 
    //rolesDiv.insertBefore(addRolesBut,inputText);   
    
});


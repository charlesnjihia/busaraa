const addRolesBut=document.querySelector('#addrolesbut') ;
addRolesBut.addEventListener('click',(e)=>{
    e.preventDefault();
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
    var reqDiv=document.getElementById('requirements');
    let inputText=document.createElement('input');
    inputText.className='form-control';
    inputText.style.marginTop='5px';
    reqDiv.appendChild(inputText); 
    //rolesDiv.insertBefore(addRolesBut,inputText);   
    
});

const submitFormBut=document.querySelector('form .btn') ;
submitFormBut.addEventListener('click',(e)=>{
    e.preventDefault();
    
    const post={title:'',description:'',roles:'',required:''};
    var roles=[];   
    var requirements=[];
    
   var requirementInputs=$('#requirements  input');
    var roleInputs=$('#roles input');
    
    $.each(roleInputs,(index,inputEl)=>{
       if(inputEl.value!==''){
       roles.push(inputEl.value); 
       }
    });
   
    $.each(requirementInputs,(index,inputEl)=>{
       if(inputEl.value!==''){
       requirements.push(inputEl.value); 
       }
    });
    
    
    post.title=$('form #title').val();
    post.description=$('form #description').val();    
    post.roles=roles.join('_');
    post.required=requirements.join('_');
    
    $.ajax({
  type: "POST",
  url: '/newpost',
  data: post
}).done(function( data ) {
   if(data.status==200){
    $('#response').html('Post successfully added');
    
    $('form').trigger("reset");
   } else{
     $('#response').html('Error -please try again');
   }   
    
   // John
   
});
   
});

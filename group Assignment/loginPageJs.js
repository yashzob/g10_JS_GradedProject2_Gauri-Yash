localStorage.setItem('username', "admin");
localStorage.setItem('password', "password");

const username=localStorage.getItem("username");
const password =localStorage.getItem("password");

window.history.forward();
let inputUserName, inputPassword;

document.querySelector("#userName").addEventListener('input', function()
                    {
                        inputUserName=this.value;    
                    });

document.querySelector("#password").addEventListener('input', function()
{
    inputPassword=this.value;    
});


//check to verify userId and Password
function ButtonClick(){
    if (inputUserName==null || inputUserName==""|| inputPassword==null || inputPassword==""){  
        alert("Username And/Or Password can't be blank");    
      }else if(inputUserName!==username || inputPassword!==password  ){
        alert("Username And/Or Password is incorrect");
      }else{
        sessionStorage.setItem("login Status", true);
        window.location.href = "./Resume/resume.html";
      }
}
if (sessionStorage.getItem('login Status')== 'true') {
    javascript:window.history.forward(1);
}

function preventBack() {
  window.history.forward(); 
}

setTimeout("preventBack()", 0);

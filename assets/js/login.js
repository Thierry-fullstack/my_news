import {showMessage, clearField, checkFielsLogin, alertChamps} from "./fontions.js";
import {controlEmail} from "./email.js";
import {checkLoginPassword} from "./password.js";
import {checkLoginCheckbox} from "./checkbox.js";

window.onload = () =>{
    const loginForm = document.body.querySelector('#loginForm');
    if(loginForm){
        /* info field process */
        const dialogLogin = document.body.querySelector('#dialogLogin');
        /* fields */
        const inputAll =loginForm.getElementsByTagName('input');
        const inputEmail = loginForm.querySelector('#inputEmail');
        const inputPassword = loginForm.querySelector('#inputPassword');
        const inputRemember = loginForm.querySelector('#inputRemember');
        const inputSubmit = loginForm.querySelector('#submitConnect');

        /* info fields */
        const labelEmail = loginForm.querySelector('#labelEmail');
        const labelPassword = loginForm.querySelector('#labelPassword');
        const labelRemember = loginForm.querySelector('#labelRemember');
        /* unactivated button submit */
        inputSubmit.setAttribute('disabled','disabled');
        let message ='* Champs obligatoires';
        showMessage(dialogLogin,message);
        /* eventlistener email */
        inputEmail.addEventListener('focus',function(){
            message =' Saisir adresse email';
            showMessage(dialogLogin,message);
            clearField(this,labelEmail);
            checkFielsLogin(inputAll,inputSubmit);
        });
        inputEmail.addEventListener('input',function(){
            controlEmail(this,labelEmail);
            checkFielsLogin(inputAll,inputSubmit);
        });
        inputEmail.addEventListener('blur',function(){
            controlEmail(this,labelEmail);
            checkFielsLogin(inputAll,inputSubmit);
        });
        /* eventlistener password */
        inputPassword.addEventListener('focus',function(){
            message =' Saisir mot de passe';
            showMessage(dialogLogin,message);
            clearField(this,labelPassword);
            checkFielsLogin(inputAll,inputSubmit);
        });
        inputPassword.addEventListener('input',function(){
            checkLoginPassword(this,labelPassword);
            checkFielsLogin(inputAll,inputSubmit);
        });
        inputPassword.addEventListener('blur',function(){
            checkLoginPassword(this,labelPassword);
            checkFielsLogin(inputAll,inputSubmit);
        });
        /* eventlistener checkbox remember */
        inputRemember.addEventListener('focus',function(){
            message='Conserver mon profil';
            showMessage(dialogLogin,message);
            clearField(this,labelRemember);
            checkFielsLogin(inputAll,inputSubmit);
        });
        inputRemember.addEventListener('input',function(){
            checkLoginCheckbox(this,dialogLogin,labelRemember);
            checkFielsLogin(inputAll,inputSubmit);
        });
        inputRemember.addEventListener('blur',function(){
            checkLoginCheckbox(this,dialogLogin,labelRemember);
            checkFielsLogin(inputAll,inputSubmit);
        });
        /* eventlistener sublit */
        inputSubmit.addEventListener('click',function ( event){
            let fieldSelect = [];
            let counter = 0;
            for(let i =0; i < inputAll.length;i++){
                if(inputAll[i].type ==='email' || inputAll[i].type==='password'){
                    fieldSelect[i] = inputAll[i];
                }
            }
            for(let i =0; i < fieldSelect.length;i++){
                if(fieldSelect[i].value==="" || fieldSelect[i].classList.contains('is-invalid'))
                {
                    counter++;
                    alertChamps(fieldSelect[i]);
                }
            }
            if(counter > 0 ){
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
            }

        });
    }
}

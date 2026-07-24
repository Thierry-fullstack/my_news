import {alertChamps} from "./alertChamps.js";
import {showMessage} from "./showMessage.js";
import {controlEmail} from "./controlEmail.js";
import {controlPseudo} from "./controlPseudo.js";
import {controlPortrait} from "./controlPortrait.js";
import {successField} from "./successField.js";
import {alertField} from "./alertField.js";
import { controlPassword} from "./controlPassword.js";
import {controlCheckbox} from "./controlCheckbox.js";

window.onload = () =>{
    const form = document.body.querySelector('#registration_form');
    if(form){
        const inputAll = form.getElementsByTagName('input');
        const labelAll = form.querySelectorAll('label');
        const inputEffect = [];
        const labelEffect = [];
        for(let i =0; i < inputAll.length; i++)
        {
            if(inputAll[i].type !=='hidden' )
            {
                inputEffect[i] = inputAll[i];
                labelEffect[i] = labelAll[i];
                if(inputEffect[i].id.includes('email')) {
                    const inputEmail = inputEffect[i];
                    const labelEmail = labelEffect[i];
                 }
                if(inputEffect[i].id.includes('pseudo')) {
                    const inputPseudo = inputEffect[i];
                    const labelPseudo = labelEffect[i];
                }
                if(inputEffect[i].id.includes('portrait')) {
                    const inputPortrait = inputEffect[i];
                    const labelPortrait = labelEffect[i];
                }
                if(inputEffect[i].id.includes('plainPassword')) {
                    const inputPassword = inputEffect[i];
                    const labelPassword = labelEffect[i];
                }
                if(inputEffect[i].id.includes('agreeTerms')) {
                    const inputAgreeTerms = inputEffect[i];
                    const labelAgreeTerms = labelEffect[i];
                }

            }
        }
        /* button submit */
        const buttonSubmit = form.querySelector('[type=submit]');
        /* field general info */
        const dialogRegister = document.body.querySelector('#dialogRegister');
        /* div.small error inputPortrait */
        const errorPortrait = form.querySelector('#errorPortrait');
        /* all ul li of document */
        const tagLiAll = document.querySelectorAll("ul li");
        // Parcourir la liste avec une boucle forEach extraire li class contect-item
        /* left info of state elements */
        const infoAll = [];
        tagLiAll.forEach((li) => {
            if(li.classList.contains('contact-item'))
                infoAll.push(li.firstElementChild) ;
        });
        /* element info special regex password */
        const all_password_criteria = document.body.querySelectorAll("li[data-password-criteria]");
        /* begin */
        let message = "* Champs obligatoires"
        showMessage(dialogRegister,message);

        /* eventlistener on inputEmail */
        inputEffect[0].addEventListener('focus',function (){
           message = 'Saisir votre email';
           showMessage(dialogRegister,message);
        });
        inputEffect[0].addEventListener('input',function(){
          controlEmail(this,infoAll[0],labelEffect[0]);
        });
        inputEffect[0].addEventListener('blur',function(){
          controlEmail(this,infoAll[0],labelEffect[0]);
        });

        /* eventlistener on inputPseudo */
        inputEffect[1].addEventListener('focus',function(){
           message = 'Saisir votre pseudonyme';
           showMessage(dialogRegister,message);
        });
        inputEffect[1].addEventListener('input',function (){
          controlPseudo(this,infoAll[1],labelEffect[1]);
        });
        inputEffect[1].addEventListener('blur',function (){
          controlPseudo(this,infoAll[1],labelEffect[1]);
        });

        /* eventlistener on inputPortrait */
        inputEffect[2].addEventListener('focus',function(){
          message = 'Choisir un portrait';
          showMessage(dialogRegister,message);
        });
        inputEffect[2].addEventListener('input',function(e){
          controlPortrait(infoAll[2],errorPortrait,e) ? successField(this,infoAll[2],labelEffect[2]):alertField(this,infoAll[2],labelEffect[2]);
        });
        inputEffect[2].addEventListener('blur',function(e){
          controlPortrait(infoAll[2],errorPortrait,e) ? successField(this,infoAll[2],labelEffect[2]):alertField(this,infoAll[2],labelEffect[2]);
        });
        /* eventlistener on inputPassword */
        inputEffect[3].addEventListener('focus',function({currentTarget}){
            message = 'Saisir votre mot de passe';
            showMessage(dialogRegister,message);
            let password = currentTarget.value;
            if(password.length ===0){
                all_password_criteria.forEach((li)=>(li.className =""));
                password_length_criteria.textContent = " 10 caractères ";
            }
            password_criteria.style.display="block";
        });
        inputEffect[3].addEventListener('input',function({currentTarget}){
            let password = currentTarget.value;
            controlPassword(this,infoAll[3],labelEffect[3],password);
        });
        inputEffect[3].addEventListener('blur',function({currentTarget}){
            let password = currentTarget.value;
            controlPassword(this,infoAll[3],labelEffect[3],password);
        });

        /* eventlistener on inputAgreeTerms */
        inputEffect[4].addEventListener('focus',function(){
            message ='Accepter les rgpd';
            showMessage(dialogRegister,message);
        });
        inputEffect[4].addEventListener('input',function(){
            controlCheckbox(this,infoAll[4],labelEffect[4],dialogRegister);
        });
        inputEffect[4].addEventListener('blur',function(){
            controlCheckbox(this,infoAll[4],labelEffect[4],dialogRegister);
        });


     /* eventlistener on submit  */
        buttonSubmit.addEventListener('click',function (event){
            let counter = 0;
            for(let i =0; i < inputEffect.length; i++)
            {
                if(inputEffect[i].type!=='checkbox' && inputEffect[i].value ==='')
                {
                    alertChamps(inputEffect[i],labelEffect[i]);
                    counter++;
                }
                if(inputEffect[i].type==='checkbox' && !(inputEffect[i].checked))
                {
                    alertChamps(inputEffect[i],labelEffect[i]);
                    counter++;
                }
            }
            if(counter > 0) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
            }
        });
    }
}

import {showMessage, invalidFeedback, clearField,alertField,successField,checkFieldsRegister,alertChamps} from "./fontions.js";
import {controlEmail} from "./email.js";
import {controlPseudo} from "./pseudo.js";
import {controlImage} from "./portrait.js";
import {controlPassword} from "./password.js";
import {controlCheckbox} from "./checkbox.js";

window.onload = () =>{
    const registerForm = document.querySelector('#registerForm');
    if(registerForm){
        /* elements dom */
        const inputAll = registerForm.getElementsByTagName('input');
        const registration_form_email = registerForm.querySelector('#registration_form_email');  /*email*/
        const registration_form_pseudo = registerForm.querySelector('#registration_form_pseudo'); /*pseudo*/
        const registration_form_plainPassword = registerForm.querySelector('#registration_form_plainPassword'); /*password*/
        const registration_form_portrait = registerForm.querySelector('#registration_form_portrait'); /*portrait*/
        const registration_form_agreeTerms = registerForm.querySelector('#registration_form_agreeTerms'); /*deal rgpd*/
        const registerPortrait = registerForm.querySelector('#registration_form_portrait');
        const errorPortrait = registerForm.querySelector('#errorPortrait');
        const registration_form_register = registerForm.querySelector('#registration_form_register'); /* submit */
        /* left elements info */
        const dialogRegister = document.body.querySelector('#dialogRegister');
        const emailInfo = document.querySelector('#email-info');
        const pseudoInfo = document.querySelector('#pseudo-info');
        const portraitInfo = document.querySelector('#portrait-info');
        const passwordInfo = document.querySelector('#password-info');
        const agreeInfo = document.querySelector('#agree-info');
        /* element info special regex password */
        const password_criteria = document.body.querySelector('#password_criteria');
        const password_length_criteria = document.body.querySelector('#password_length_criteria');
        const password_special_character_criteria = document.body.querySelector("#password_special_character_criteria");
        const password_uppercase_criteria = document.body.querySelector("#password_uppercase_criteria");
        const password_number_criteria = document.body.querySelector("#password_number_criteria");
        const password_lowercase_criteria = document.body.querySelector("#password_lowercase_criteria");
        const all_password_criteria = document.body.querySelectorAll("li[data-password-criteria]");
        /* fields return error from regex php */
        const registration_form_email_error = registerForm.querySelector('#registration_form_email_error1');
        const registration_form_pseudo_error = registerForm.querySelector('#registration_form_pseudo_error1');
        const registration_form_portrait_error = registerForm.querySelector('#registration_form_portrait_error1');
        const registration_form_plainPassword_error = registerForm.querySelector('#registration_form_plainPassword_error1');
        const registration_form_agreeTerms_error = registerForm.querySelector('#registration_form_agreeTerms_error1');
        /* unactivited submit button */
        registration_form_register.setAttribute('disabled','disabled');

        /* onload form begin */
        let message = "* champs obligatoires"
        showMessage(dialogRegister,message);
        /* eventlister email*/
        registration_form_email.addEventListener('focus',function(){
            message="Saisir votre adresse email";
            showMessage(dialogRegister,message);
            clearField(this,emailInfo);
            checkFieldsRegister(inputAll,registration_form_register);
            if(registration_form_email_error )
            invalidFeedback(registration_form_email_error);
        });
        registration_form_email.addEventListener('input',function(){
            controlEmail(this,emailInfo);
            checkFieldsRegister(inputAll,registration_form_register);
        });
        registration_form_email.addEventListener('blur',function(){
            controlEmail(this,emailInfo);
            checkFieldsRegister(inputAll,registration_form_register);
        });
        /* eventlistener pseudo */
        registration_form_pseudo.addEventListener('focus',function(){
            message="Saisir votre pseudo";
            showMessage(dialogRegister,message);
            clearField(this,pseudoInfo);
            checkFieldsRegister(inputAll,registration_form_register);
            if(registration_form_portrait_error)
            invalidFeedback(registration_form_pseudo_error);
        });
        registration_form_pseudo.addEventListener('input',function(){
            controlPseudo(this,pseudoInfo);
            checkFieldsRegister(inputAll,registration_form_register);
        });
        registration_form_pseudo.addEventListener('blur',function(){
            controlPseudo(this,pseudoInfo);
            checkFieldsRegister(inputAll,registration_form_register);
        });
        /* eventlistener portrait */
        registration_form_portrait.addEventListener('focus',function(){
            message = "Choisir un portrait";
            showMessage(dialogRegister,message);
            checkFieldsRegister(inputAll,registration_form_register);
            if(registration_form_portrait_error)
            invalidFeedback(registration_form_portrait_error);
        });
        registration_form_portrait.addEventListener('input',function(e){
            controlImage(portraitInfo,errorPortrait,e) ? successField(registerPortrait,portraitInfo) : alertField(registerPortrait,portraitInfo);
            checkFieldsRegister(inputAll,registration_form_register);
        });
        registration_form_portrait.addEventListener('blur',function(e){
            controlImage(portraitInfo,errorPortrait,e) ? successField(registerPortrait,portraitInfo) : alertField(registerPortrait,portraitInfo);
            checkFieldsRegister(inputAll,registration_form_register);
        });
        /* eventlistener password */
        registration_form_plainPassword.addEventListener('focus',function({ currentTarget}){
            message = "Saisir un mot de passe de 10 caractères";
            showMessage(dialogRegister,message);
            clearField(this,passwordInfo);
            let password = currentTarget.value;
            if(password.length ===0){
                all_password_criteria.forEach((li)=>(li.className =""));
                password_length_criteria.textContent = " 10 caractères ";
            }
            password_criteria.style.display="block";
            checkFieldsRegister(inputAll,registration_form_register);
            if(registration_form_plainPassword_error)
            invalidFeedback(registration_form_plainPassword_error);
        });
        registration_form_plainPassword.addEventListener('input',function({currentTarget}){
            let password = currentTarget.value;
            controlPassword(this,passwordInfo,password);
            checkFieldsRegister(inputAll,registration_form_register);
        });
        registration_form_plainPassword.addEventListener('blur',function({currentTarget}){
            let password = currentTarget.value;
            controlPassword(this,passwordInfo,password);
            checkFieldsRegister(inputAll,registration_form_register);
        });
        /* eventlistener agreeTerms */
        registration_form_agreeTerms.addEventListener('focus',function(){
            message = "Accepter le contrat";
            showMessage(dialogRegister,message);
            clearField(this,agreeInfo);
            checkFieldsRegister(inputAll,registration_form_register);
            if(registration_form_agreeTerms_error)
            invalidFeedback(registration_form_agreeTerms_error);
        });
        registration_form_agreeTerms.addEventListener('input',function(){
            controlCheckbox(this,agreeInfo,dialogRegister);
            checkFieldsRegister(inputAll,registration_form_register);
        });
        registration_form_agreeTerms.addEventListener('blur',function(){
            controlCheckbox(this,agreeInfo,dialogRegister);
            checkFieldsRegister(inputAll,registration_form_register);
        });

        /* eventListener Submit field */
        registration_form_register.addEventListener('click',function( event){
            let inputs = registerForm.getElementsByTagName('input');
            let fieldsSuccess = [];
            let counter = 0;
            for(let i = 0; i < inputs.length; i++){
                if(inputs[i].type ==='email' || inputs[i].type ==='text' || inputs[i].type ==='password' || inputs[i].type ==='file' || inputs[i].type ==='checkbox'){
                    fieldsSuccess[i]=inputs[i];
                }
            }
            for(let i = 0; i < fieldsSuccess.length; i ++){
                if( fieldsSuccess[i].value==="" || fieldsSuccess[i].classList.contains('is-invalid'))
                {
                    counter++;
                    alertChamps(fieldsSuccess[i]);
                }
                if(fieldsSuccess[i].type==='checkbox' && !fieldsSuccess[i].checked)
                {
                    counter++;
                    alertChamps(fieldsSuccess[i]);
                }
            }
          //  console.log(counter);
            if(  counter > 0 ){
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
            }
        });
    }
}

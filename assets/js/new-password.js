import {showMessage,clearField,checkFieldsNewPassword,alertChamps,successField,alertField} from "./fontions.js";
import { controlPassword} from "./password.js";

window.onload = () => {
    const resetPasswordForm = document.body.querySelector('#resetPasswordForm');
    if(resetPasswordForm){
       /* inputs password */
        const allInputs = resetPasswordForm.querySelectorAll("input[type='password']");
        const plainPassword_first = resetPasswordForm.querySelector('#change_password_form_plainPassword_first');
        const plainPassword_second = resetPasswordForm.querySelector('#change_password_form_plainPassword_second');
        const changePasswordSubmit = resetPasswordForm.querySelector('#change_password_form_submit');

        /* indication messages */
        const dialogpassword = document.body.querySelector('#dialogNewpassword');
        /* left elements info */
        const passwordInfo = document.querySelector('#password-info');
        const confirmationInfo = document.querySelector('#confirmation-info');

        /* element info special regex password */
        const password_criteria = document.body.querySelector('#password_criteria');
        const password_length_criteria = document.body.querySelector('#password_length_criteria');
        const password_special_character_criteria = document.body.querySelector("#password_special_character_criteria");
        const password_uppercase_criteria = document.body.querySelector("#password_uppercase_criteria");
        const password_number_criteria = document.body.querySelector("#password_number_criteria");
        const password_lowercase_criteria = document.body.querySelector("#password_lowercase_criteria");
        const all_password_criteria = document.body.querySelectorAll("li[data-password-criteria]");

        /* unactivited submit button */
        changePasswordSubmit.setAttribute('disabled','disabled');

        let message =' Saisir nouveau Mot de passe';
        showMessage(dialogpassword,message);

        /* eventlistener password_first */
        plainPassword_first.addEventListener('focus',function ({currentTarget}){
        message = '10 caractères : (AZaz09!"#$%&)';
        showMessage(dialogpassword,message);
        clearField(this,passwordInfo);
        checkFieldsNewPassword(allInputs,changePasswordSubmit);
        let password = currentTarget.value;
        if(password.length ===0){
            all_password_criteria.forEach((li)=>li.className="");
            password_length_criteria.textContent = " 10 caractères ";
        }
        password_criteria.style.display="block";
        });
        plainPassword_first.addEventListener('input',function ({currentTarget}){
            let password = currentTarget.value;
            controlPassword(this,passwordInfo,password);
            checkFieldsNewPassword(allInputs,changePasswordSubmit);
        });
        plainPassword_first.addEventListener('blur',function ({currentTarget}){
            let password = currentTarget.value;
            controlPassword(this,passwordInfo,password);
            checkFieldsNewPassword(allInputs,changePasswordSubmit);
        });
        /* eventlistener password_second */
        plainPassword_second.addEventListener('focus',function(){
            message='Confirmer votre mot de passe';
            showMessage(dialogpassword,message);
            clearField(this,confirmationInfo);
            checkFieldsNewPassword(allInputs,changePasswordSubmit);
        });
        plainPassword_second.addEventListener('input',function(){
            if(this.value !=='')
            (this.value === plainPassword_first.value) ? successField(this,confirmationInfo): alertField(this,confirmationInfo);
            checkFieldsNewPassword(allInputs,changePasswordSubmit);
        });
        plainPassword_second.addEventListener('blur',function(){
            if(this.value !=='')
            (this.value === plainPassword_first.value) ? successField(this,confirmationInfo): alertField(this,confirmationInfo);
            checkFieldsNewPassword(allInputs,changePasswordSubmit);
        });
        changePasswordSubmit.addEventListener('click',function(event){
            let counter = 0;
           for(let i = 0; i < allInputs.length; i++)
           {
               if(allInputs[i].value ==='' || allInputs[i].classList.contains('is-invalid'))
               {
                   alertChamps(allInputs[i]);
                   counter++;
               }
           }
           if(counter !==0 || counter === allInputs.length)
           {
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
           }
        });
    } /* end if */
} /* end window.onload */

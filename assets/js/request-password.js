import {controlEmail} from "./email.js";
import {clearField, checkFieldResetPassword, alertField} from "./fontions.js";

window.onload = () =>{
    const resetPasswordForm = document.body.querySelector('#resetPasswordForm');
    if(resetPasswordForm){
        /* inputs form reset-password */
        const inputEmail = resetPasswordForm.querySelector('#reset_password_request_form_email');
        const inputSubmit =resetPasswordForm.querySelector('#reset_password_request_form_submit');

        /* label */
        const labelEmail = resetPasswordForm.querySelector('#label_email');

        /* unactivated button submit */
        inputSubmit.setAttribute('disabled','disabled');

        inputEmail.addEventListener('focus',function(){
            clearField(this,labelEmail);
            checkFieldResetPassword(this,inputSubmit);
        });
        inputEmail.addEventListener('input',function(){
            controlEmail(this,labelEmail);
            checkFieldResetPassword(this,inputSubmit);
        });
        inputEmail.addEventListener('blur',function(){
            controlEmail(this,labelEmail);
            checkFieldResetPassword(this,inputSubmit);
        });
        inputSubmit.addEventListener('click',function (event){
            if(inputEmail.value === '' || inputEmail.classList.contains('is-invalid'))
            {
                alertField(inputEmail,labelEmail);
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
            }
        });
    }
}

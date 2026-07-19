import { successField,alertField,showMessage} from "./fontions.js";


/*
verify checkbox if checked in registerForm
 */
const controlCheckbox = function(champ,info,dial){
    if(champ.checked){
        let message="";
        showMessage(dial,message);
        successField(champ,info);
    }else if(!(champ.checked)){
        let message="Accepter le contrat";
        showMessage(dial,message);
        alertField(champ,info);
    }
}

const clearBorderChbox = function(champ,info){
    if(champ.classList.contains('is-invalid')) {
        champ.classList.remove('is-invalid');
        info.classList.remove('text-danger');
        champ.value=" ";
    }
    if(champ.classList.contains('is-valid')) {
        champ.classList.remove('is-valid');
        info.classList.remove('text-success');
        champ.value =" ";
    }
}

/*
verify checkbox if checked in loginForm
 */

const checkLoginCheckbox = function(champ,dial,info){
    if(champ.checked){
        let message="";
        showMessage(dial,message);
        successField(champ,info);
    }else if(!(champ.checked)){
        let message="Se souvenir de moi";
        showMessage(dial,message);
        //alertField(champ,info);
    }
}

const clearLoginCbox = function(champ){
    if(champ.classList.contains('is-invalid')) {
        champ.classList.remove('is-invalid');
        champ.value=" ";
    }
    if(champ.classList.contains('is-valid')) {
        champ.classList.remove('is-valid');
        champ.value =" ";
    }
}

export { controlCheckbox,checkLoginCheckbox,clearLoginCbox}

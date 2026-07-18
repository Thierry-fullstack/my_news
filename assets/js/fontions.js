/* function show message */
const showMessage = function(balise,text)
{
    balise.innerHTML = text;
}

const successField = function(champ,info){
    champ.classList.remove('is-invalid');
    champ.classList.add("is-valid");
    info.classList.remove('text-danger');
    info.classList.add('text-success');
}

const alertField = function (champ,info) {
    champ.classList.remove('is-valid');
    champ.classList.add("is-invalid");
    info.classList.remove('text-success');
    info.classList.add('text-danger');
}

const clearField = function(champ,info){
    if(champ.classList.contains('is-invalid')) {
        champ.classList.remove('is-invalid');
        info.classList.remove('text-danger');
        champ.value="";
    }
    if(champ.classList.contains('is-valid') ) {
        champ.classList.remove('is-valid');
        info.classList.remove('text-success');
        champ.value ="";
    }
}

const alertChamps = function (champ) {
    champ.classList.remove('is-valid');
    champ.classList.add("is-invalid");

}

const invalidFeedback = function(champs)
{

        if(champs.classList.contains('invalid-feedback'))
        {
            champs.classList.remove('invalid-feedback');
            champs.innerHTML="";
        }

}

/*
* form register
unlock button submit if all' green
 */
const checkFieldsRegister = function(mail,pseudo,password,file,checkbox,submit){
    if(mail.classList.contains('is-valid') && pseudo.classList.contains('is-valid') && password.classList.contains('is-valid') && file.classList.contains('is-valid')
        && checkbox.classList.contains('is-valid')){
        submit.classList.remove('btn-outline-primary');
        submit.classList.add('btn-primary');
        submit.textContent="Validez votre saisie"
        submit.removeAttribute('disabled','disabled');
    }else{
        submit.classList.remove('btn-primary');
        submit.classList.add('btn-outline-primary');
        submit.textContent="Saisir vos coordonnées"
        submit.setAttribute('disabled','disabled')
    }
}

export {showMessage,alertField,successField,clearField,invalidFeedback,checkFieldsRegister,alertChamps};

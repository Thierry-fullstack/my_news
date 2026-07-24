/* function show message */
const showMessage = function(balise,text)
{
    balise.innerHTML = text;
}

const successField = function(champ,info){
    champ.classList.remove('is-invalid');
    champ.classList.add("is-valid");
    if(info.classList.contains('text-warning-emphasis')){
        info.classList.remove('text-warning-emphasis');
    }
    info.classList.remove('text-danger');
    info.classList.add('text-success');
}

const alertField = function (champ,info) {
    champ.classList.remove('is-valid');
    champ.classList.add("is-invalid");
    if(info.classList.contains('text-warning-emphasis')){
        info.classList.remove('text-warning-emphasis');
    }
    info.classList.remove('text-success');
    info.classList.add('text-danger');
}

const clearField = function(champ,info){
    if(champ.classList.contains('is-invalid')) {
        champ.classList.remove('is-invalid');
        info.classList.remove('text-danger');
        info.classList.add('text-warning-emphasis');
        champ.value="";
    }
    if(champ.classList.contains('is-valid') ) {
        champ.classList.remove('is-valid');
        info.classList.remove('text-success');
        info.classList.add('text-warning-emphasis');
        champ.value ="";
    }
}

const successChamps = function (champ) {
    champ.classList.remove('is-invalid');
    champ.classList.add('is-valid');
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
const checkFieldsRegister = function(champs,bouton)
{
    let fieldSelect = [];
    let counter = 0;
    for(let i = 0; i < champs.length; i++) {
        if (champs[i].type === 'email' || champs[i].type === 'text' || champs[i].type === 'file' || champs[i].type === 'password' || champs[i].type === 'checkbox') {
            fieldSelect[i] = champs[i];
        }
    }
        for (let i = 0; i < fieldSelect.length; i++) {
            if (fieldSelect[i].value !== '' && fieldSelect[i].classList.contains('is-valid') || fieldSelect[i].checked && fieldSelect[i].classList.contains('is-valid')) {
                counter++;
            }


        }
        //console.log(counter);
        if(counter === fieldSelect.length)
        {
            bouton.classList.remove('btn-outline-dark');
            bouton.classList.add('btn-dark');
            bouton.textContent="Validez votre saisie"
            bouton.removeAttribute('disabled');
        }else if(counter !== fieldSelect.length)
        {
            bouton.classList.remove('btn-dark');
            bouton.classList.add('btn-outline-dark');
            bouton.textContent="Saisir vos coordonnées"
            bouton.setAttribute('disabled','disabled')
        }
}

/*
* form login
unlock button submit if email & password are green
 */
const checkFielsLogin = function(champs,bouton){
    let fieldSelect = [];
    let counter = 0;
    for(let i =0; i < champs.length; i++){
        if(champs[i].type === 'email' || champs[i].type==='password'){
            fieldSelect[i]= champs[i];
        }
    }
    for(let i =0; i < fieldSelect.length;i++){
        if(fieldSelect[i].value !=='' && fieldSelect[i].classList.contains('is-valid')){
            counter++;
        }
    }
    if(counter === fieldSelect.length){
        bouton.classList.remove('btn-outline-dark');
        bouton.classList.add('btn-dark');
        bouton.textContent = " Soumettre votre saisie";
        bouton.removeAttribute('disabled','disabled');
    }else if(counter !== fieldSelect.length){
        bouton.classList.remove('btn-dark');
        bouton.classList.add('btn-outline-dark');
        bouton.textContent="Saisir vos données de connexion";
        bouton.setAttribute('disabled','disabled');
    }
}


/* form request-password - checkField request-password */
const checkFieldResetPassword = function(champ,bouton){
    if(champ.value !=='' && champ.classList.contains('is-valid'))
    {
        bouton.classList.remove('btn-outline-dark');
        bouton.classList.add('btn-dark');
        bouton.textContent = " Soumettre votre saisie";
        bouton.removeAttribute('disabled','disabled');
    }
    else if(champ.value ==='' || champ.classList.contains('is-invalid'))
    {
        bouton.classList.remove('btn-dark');
        bouton.classList.add('btn-outline-dark');
        bouton.textContent="Saisir vos données de connexion";
        bouton.setAttribute('disabled','disabled');
    }
}

/* form new-password control  2 fiels password */
const checkFieldsNewPassword = function(champs,bouton)
{
    let counter = 0;
    for(let i =0; i < champs.length;i++){
        if(champs[i].value !=='' && champs[i].classList.contains('is-valid')){
            counter++;
        }
    }
    if(counter === champs.length){
        bouton.classList.remove('btn-outline-dark');
        bouton.classList.add('btn-dark');
        bouton.textContent = " Soumettre votre saisie";
        bouton.removeAttribute('disabled','disabled');
    }else if(counter !== champs.length){
        bouton.classList.remove('btn-dark');
        bouton.classList.add('btn-outline-dark');
        bouton.textContent="Saisir vos données de connexion";
        bouton.setAttribute('disabled','disabled');
    }
}

export {showMessage,alertField,successField,clearField,invalidFeedback,
    checkFieldsRegister,alertChamps,successChamps,checkFielsLogin,checkFieldResetPassword,checkFieldsNewPassword};

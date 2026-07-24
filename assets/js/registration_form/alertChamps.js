
const alertChamps = function (champ,label) {
    if(champ.classList.contains('is-valid')) {
        champ.classList.remove('is-valid');
        label.classList.remove('text-success');
    }
    champ.classList.add("is-invalid");
    label.classList.add('text-danger');
}

export {alertChamps}

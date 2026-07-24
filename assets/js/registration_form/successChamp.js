
const successChamp = function(champ,label)
{
    if(champ.classList.contains('is-invalid')) {
        champ.classList.remove('is-invalid');
        label.classList.remove('text-danger');
    }
    champ.classList.add("is-valid");
    label.classList.add('text-success');
}

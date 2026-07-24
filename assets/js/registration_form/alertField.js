

const alertField = function(champ,info,label)
{
    champ.classList.remove('is-valid');
    champ.classList.add("is-invalid");
    if(info.classList.contains('text-info-emphasis')){
        info.classList.remove('text-info-emphasis');
    }
    info.classList.remove('text-success');
    info.classList.add('text-danger');
    if(label.classList.contains('text-success')) {
        label.classList.remove('text-success');
    }
    label.classList.add('text-danger');
}

export { alertField }

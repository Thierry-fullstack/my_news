

const successField = function(champ,info,label)
{
    champ.classList.remove('is-invalid');
    champ.classList.add("is-valid");
    if(info.classList.contains('text-info-emphasis')){
        info.classList.remove('text-info-emphasis');
    }
    info.classList.remove('text-danger');
    info.classList.add('text-success');
    if(label.classList.contains('text-danger')) {
        label.classList.remove('text-danger');
    }
    label.classList.add('text-success');
}

export { successField }

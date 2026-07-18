/*
*check field upload portrait
 */
const controlImage = function(info,error,e){
    const file = e.target.files[0];
    if(info.classList.contains('text-success')){
        info.classList.remove('text-success');
    }
    if(info.classList.contains('text-danger')){
        info.classList.remove('text-danger');
    }
    error.innerHTML = " ";
    if (!file) {
        error.innerHTML = "Fichier inexistant";
        error.style.color = "red";
        return false;
    }
    if (file.size > 2004076) {
        error.innerHTML = "Le fichier doit être plus petit que 2 MB";
        error.style.color = "red";
        return false;
    }

    //  console.log('Selected file:', file.name);
    //  console.log('File MIME type (via File.type):', file.type); // e.g., "image/jpeg"
    //  console.log('File.weight', file.size);

    // Validate MIME type
    const allowedTypes = ['image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
        error.innerHTML = "Uniquement un fichier de type .jpeg";
        error.style.color = "red";
        file.value = ''; // Clear the input
        return false;
    }
    return true;
}

export {controlImage};

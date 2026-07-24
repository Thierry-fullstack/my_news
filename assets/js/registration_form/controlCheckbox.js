import {successField} from "./successField.js";
import {alertField} from "./alertField.js";
import {showMessage} from "./showMessage.js";

const controlCheckbox = function(champ,info,label,dial)
{
    if(champ.checked){
        let message="";
        showMessage(dial,message);
        successField(champ,info,label);
    }else if(!(champ.checked)){
        let message="Accepter le contrat";
        showMessage(dial,message);
        alertField(champ,info,label);
    }
}
export {controlCheckbox}

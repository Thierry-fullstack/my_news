import { alertField} from "./alertField.js";
import { successField} from "./successField.js";

/* check email register */
const controlEmail = function (champ,info,label) {
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = new RegExp(regexMail);
    return champ.value.match(emailRegex) ? successField(champ,info,label) : alertField(champ,info,label);
}

export {controlEmail};

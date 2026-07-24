import { alertField} from "./alertField.js";
import { successField} from "./successField.js";

/*
*check field Pseudo
* ^.{6,10}#[0-9]{2}$
 */
const controlPseudo = function (champ,info,label) {
    const pseudoRegex = new RegExp('^[a-zA-Z0-9 -\'èçàéïâ]{6,30}$');
    champ.value.match(pseudoRegex) ? successField(champ,info,label) : alertField(champ,info,label);
}

export {controlPseudo};

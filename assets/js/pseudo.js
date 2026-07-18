import {successField,alertField} from "./fontions.js";
/*
*check field Pseudo
* ^.{6,10}#[0-9]{2}$
 */
const controlPseudo = function (champ,info) {
    const pseudoRegex = new RegExp('^[a-zA-Z0-9 -\'èçàéï]{2,30}$');
    champ.value.match(pseudoRegex) ? successField(champ,info) : alertField(champ,info);
}

export {controlPseudo};

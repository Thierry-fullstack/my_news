import {successField,alertField} from "./fontions.js";

/* check email register */
const controlEmail = function (champ,info) {
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = new RegExp(regexMail);
    champ.value.match(emailRegex) ? successField(champ,info) : alertField(champ,info);
}

export {controlEmail};

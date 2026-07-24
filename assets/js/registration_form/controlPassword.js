import {successField} from "./successField.js";
import {alertField} from "./alertField.js";


/* element info special regex password */
const password_criteria = document.body.querySelector('#password_criteria');
const password_length_criteria = document.body.querySelector('#password_length_criteria');
const password_special_character_criteria = document.body.querySelector("#password_special_character_criteria");
const password_uppercase_criteria = document.body.querySelector("#password_uppercase_criteria");
const password_number_criteria = document.body.querySelector("#password_number_criteria");
const password_lowercase_criteria = document.body.querySelector("#password_lowercase_criteria");
const all_password_criteria = document.body.querySelectorAll("li[data-password-criteria]");


const controlPassword = function (champ,info,label,password){
    password_length_criteria.className = `password-criteria-${password.length === 10}`;
    password_special_character_criteria.className = `password-criteria-${/[ !"#$%&'()*+,-.\/:;<=>?@\]^_`{|}~]/.test(password)}`;
    password_uppercase_criteria.className = `password-criteria-${/[A-Z]/.test(password)}`;
    password_number_criteria.className = `password-criteria-${/[0-9]/.test(password)}`;
    password_lowercase_criteria.className = `password-criteria-${/[a-zà-ú]/.test(password)}`;
    password_length_criteria.textContent = `( ${password.length} ) sur 10 caractères`;
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10}$');
    champ.value.match(passwordRegex) ? successField(champ,info,label) : alertField(champ,info,label);
}

export {controlPassword}

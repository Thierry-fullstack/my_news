import { successField,alertField,successChamps,alertChamps} from "./fontions.js";

/* control register form */
/* pattern: '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,12}$/i',
 htmlPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,12}$'
 check field password */
const controlPassword = function (champ,info,password) {

    password_length_criteria.className = `password-criteria-${password.length === 10}`;
    password_special_character_criteria.className = `password-criteria-${/[ !"#$%&'()*+,-.\/:;<=>?@\]^_`{|}~]/.test(password)}`;
    password_uppercase_criteria.className = `password-criteria-${/[A-Z]/.test(password)}`;
    password_number_criteria.className = `password-criteria-${/[0-9]/.test(password)}`;
    password_lowercase_criteria.className = `password-criteria-${/[a-zà-ú]/.test(password)}`;
    password_length_criteria.textContent = `( ${password.length} ) sur 10 caractères`;
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10}$');
    champ.value.match(passwordRegex) ? successField(champ,info) : alertField(champ,info);
}

const controlPasswordTwin = function (champ,password){
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10}$');
    champ.value.match(passwordRegex) ? successChamps(champ) : alertChamps(champ);
}

/* control login form */
const checkLoginPassword = function (champ,info) {
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10}$');
    champ.value.match(passwordRegex) ? successField(champ,info) : alertField(champ,info);
}


export {controlPassword,checkLoginPassword,controlPasswordTwin};

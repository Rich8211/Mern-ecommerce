const isEmpty = require("is-empty");
const Validator = require("validator");

const validatedSignUpInput = (data) => {
    let errors = {};

    let {email, password, username} = data;

    username = !isEmpty(username) ? username : "";
    email = !isEmpty(email) ? email : "";
    password = !isEmpty(password) ? password : "";

    if (Validator.isEmpty(email)) {
        errors.email = "Email is required";
    } else if (!Validator.isEmail(email)) {
        errors.email = "Enter a valid email";
    }

    if (Validator.isEmpty(username)) {
        errors.username = "Username is required";
    }

    if (Validator.isEmpty(password)) {
        errors.password = "Password is required"
    } else if (!Validator.isLength(password, {min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};

module.exports = validatedSignUpInput;
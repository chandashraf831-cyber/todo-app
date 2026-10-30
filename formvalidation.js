
let username = document.querySelector("#name");
let formvalidation = document.querySelector("#registerForm");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmpassword = document.querySelector("#confirmPassword");
let p = document.querySelector(".successfull");
let userkaerror = document.querySelector(".userkaname");
let userkapassworderror = document.querySelector(".userkapassworderror");
let userkaemailerror = document.querySelector(".userkaemailerror");
let userkacomerror = document.querySelector(".userkacomerror");

let localstoregemeinuserkadata = JSON.parse(localStorage.getItem("userkadatahain") || "[]");

let nouser = document.querySelector("#noUsers");

// No registered user check
if (localstoregemeinuserkadata.length === 0) {
    nouser.style.display = "flex";
} else {
    nouser.style.display = "none";
}

formvalidation.addEventListener("submit", function(event) {

    event.preventDefault();

    let userkadata = username.value.trim();
    let userkaemail = email.value.trim();
    let userkapassword = password.value.trim();
    let userkacomfirmpassword = confirmpassword.value.trim();

    let usernameValid = true;

    if (userkadata === "") {
        userkaerror.textContent = "Please enter your username";
        userkaerror.style.color = "red";
        usernameValid = false;
    } else {
        userkaerror.textContent = "Valid username";
        userkaerror.style.color = "lightgreen";
    }

    // Email validation
    let emailValid = true;

    if (userkaemail === "") {
        userkaemailerror.textContent = "Please enter your email";
        userkaemailerror.style.color = "red";
        emailValid = false;
    } else if (
        !userkaemail.includes("@") ||
        !userkaemail.includes(".")
    ) {
        userkaemailerror.textContent = "Please enter a valid email";
        userkaemailerror.style.color = "red";
        emailValid = false;
    } else {
        userkaemailerror.textContent = "Valid email";
        userkaemailerror.style.color = "lightgreen";
    }

    // Password validation
    let passwordValid = true;

    if (userkapassword === "") {
        userkapassworderror.textContent = "Please enter your password";
        userkapassworderror.style.color = "red";
        passwordValid = false;
    } else if (userkapassword.length < 8) {
        userkapassworderror.textContent =
            "Minimum length required is 8 characters";
        userkapassworderror.style.color = "red";
        passwordValid = false;
    } else {
        userkapassworderror.textContent = "Valid password";
        userkapassworderror.style.color = "lightgreen";
    }

    // Confirm password validation
    let confirmPasswordValid = true;

    if (userkacomfirmpassword === "") {
        userkacomerror.textContent = "Please confirm your password";
        userkacomerror.style.color = "red";
        confirmPasswordValid = false;
    } else if (userkapassword !== userkacomfirmpassword) {
        userkacomerror.textContent = "Passwords do not match";
        userkacomerror.style.color = "red";
        confirmPasswordValid = false;
    } else {
        userkacomerror.textContent = "Passwords matched";
        userkacomerror.style.color = "lightgreen";
    }

    // Final validation
    if (
        usernameValid &&
        emailValid &&
        passwordValid &&
        confirmPasswordValid
    ) {

        p.textContent = "Registration successful!";
        p.style.color = "lightgreen";

        let object = {
            name: userkadata,
            email: userkaemail
        };

        localstoregemeinuserkadata.push(object);

        localStorage.setItem(
            "userkadatahain",
            JSON.stringify(localstoregemeinuserkadata)
        );

        // Hide no user message
        nouser.style.display = "none";

        formvalidation.reset();

        setTimeout(() => {
            userkaerror.textContent = "";
            userkaemailerror.textContent = "";
            userkapassworderror.textContent = "";
            userkacomerror.textContent = "";
            p.textContent = "";
        }, 1000);

    } else {
        p.textContent = "registration failed!";
        p.style.color = "red";
    }
});


// Display registered users
let div = document.querySelector("#registrationuse");

if (localstoregemeinuserkadata.length > 0) {

    localstoregemeinuserkadata.forEach(function(data) {

        let user = document.createElement("div");
        let userkanameoremail = document.createElement("div");

        userkanameoremail.classList.add("userkanameoremail");
        user.classList.add("user");

        let h3 = document.createElement("h3");
        h3.textContent = data.name;

        let emailp = document.createElement("p");
        emailp.textContent = data.email;

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";

        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash";

        deleteBtn.appendChild(deleteIcon);

        userkanameoremail.append(h3, emailp);
        user.append(userkanameoremail, deleteBtn);

        div.append(user);

        deleteBtn.addEventListener("click", function() {

            console.log("User delete karna hai");

            let result = localstoregemeinuserkadata.findIndex((index) => {
                return index.email === data.email;
            });

            if (result !== -1) {

                localstoregemeinuserkadata.splice(result, 1);

                localStorage.setItem(
                    "userkadatahain",
                    JSON.stringify(localstoregemeinuserkadata)
                );

                user.remove();

                // Check after deleting user
                if (localstoregemeinuserkadata.length === 0) {
                    nouser.style.display = "flex";
                }
            }
        });

    });

}

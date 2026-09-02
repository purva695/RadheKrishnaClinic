const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


/* =================================
   PASSWORD SHOW / HIDE
================================= */

const togglePassword =
    document.getElementById("togglePassword");

const passwordInput =
    document.getElementById("password");


togglePassword.addEventListener(
    "click",
    function () {

        if (
            passwordInput.type === "password"
        ) {

            passwordInput.type = "text";

            togglePassword.innerHTML =
                '<i class="fa-regular fa-eye-slash"></i>';

        } else {

            passwordInput.type = "password";

            togglePassword.innerHTML =
                '<i class="fa-regular fa-eye"></i>';

        }

    }
);



/* =================================
   LOGIN
================================= */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email")
                .value.trim();

        const password =
            passwordInput.value;


        /*
         TEMPORARY LOGIN

         Backend connect hone ke baad
         isse remove karenge.
        */

        if (
            email === "radhekrishnahospital@gmail.com"
            &&
            password === "radhekrishna@234"
        ) {

            loginMessage.textContent =
                "Login successful.";

            loginMessage.style.color =
                "green";


            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";

                },
                500
            );


        } else {

            loginMessage.textContent =
                "Invalid email or password.";

            loginMessage.style.color =
                "red";

        }

    }
);
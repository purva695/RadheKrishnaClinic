/* =========================================================
   RADHE KRISHNA CLINIC
   Main JavaScript
========================================================= */


/* =========================================================
   1. MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", function () {

        mobileMenu.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (mobileMenu.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close menu after clicking a link */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("show");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

}


/* =========================================================
   2. APPOINTMENT FORM
========================================================= */

const appointmentForm =
    document.getElementById("appointmentForm");


if (appointmentForm) {

    appointmentForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* Get form values */

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const treatment =
            document.getElementById("treatment").value;

        const date =
            document.getElementById("date").value;

        const messageElement =
            document.getElementById("message");


        const message =
            messageElement
                ? messageElement.value.trim()
                : "";


        /* =================================================
           VALIDATION
        ================================================= */


        if (name === "") {

            alert("Please enter your name.");

            return;

        }


        if (phone === "") {

            alert("Please enter your phone number.");

            return;

        }


        /* Indian phone number validation */

        const phonePattern =
            /^[6-9]\d{9}$/;


        const cleanPhone =
            phone.replace(/\D/g, "");


        if (!phonePattern.test(cleanPhone)) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return;

        }


        /* Email validation */

        if (email !== "") {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                return;

            }

        }


        if (treatment === "") {

            alert("Please select a treatment.");

            return;

        }


        if (date === "") {

            alert("Please select your preferred date.");

            return;

        }


        /* =================================================
           CREATE WHATSAPP MESSAGE
        ================================================= */


        const clinicWhatsApp =
            "91XXXXXXXXXX";


        const whatsappMessage =

            `*New Appointment Request*%0A%0A` +

            `*Name:* ${encodeURIComponent(name)}%0A` +

            `*Phone:* ${encodeURIComponent(cleanPhone)}%0A` +

            `*Email:* ${encodeURIComponent(email || "Not provided")}%0A` +

            `*Treatment:* ${encodeURIComponent(treatment)}%0A` +

            `*Preferred Date:* ${encodeURIComponent(date)}%0A` +

            `*Message:* ${encodeURIComponent(message || "None")}`;


        const whatsappURL =
            `https://wa.me/${clinicWhatsApp}?text=${whatsappMessage}`;


        /* =================================================
           OPEN WHATSAPP
        ================================================= */


        window.open(
            whatsappURL,
            "_blank"
        );


        /* =================================================
           SUCCESS MESSAGE
        ================================================= */

        alert(
            "Your appointment details are ready to send on WhatsApp."
        );


        /* Reset form */

        appointmentForm.reset();

    });

}


/* =========================================================
   3. SET MINIMUM APPOINTMENT DATE
========================================================= */

const dateInput =
    document.getElementById("date");


if (dateInput) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");


    const day =
        String(today.getDate())
            .padStart(2, "0");


    const formattedDate =
        `${year}-${month}-${day}`;


    dateInput.setAttribute(
        "min",
        formattedDate
    );

}


/* =========================================================
   4. SMOOTH SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                targetId &&
                targetId !== "#"
            ) {

                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }

        }
    );

});


/* =========================================================
   5. CURRENT YEAR
========================================================= */

const yearElements =
    document.querySelectorAll(".current-year");


yearElements.forEach(function (element) {

    element.textContent =
        new Date().getFullYear();

});
/* =====================================================
   ORTHODERMA CLINIC
   JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const mobileMenu =
    document.getElementById("mobileMenu");

const navbar =
    document.getElementById("navbar");


mobileMenu.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});


/* =====================================================
   HERO SLIDER
===================================================== */

const heroSlides =
    document.querySelectorAll(".hero-slide");

const nextSlide =
    document.getElementById("nextSlide");

const prevSlide =
    document.getElementById("prevSlide");

const sliderDots =
    document.getElementById("sliderDots");


let currentSlide = 0;


/* Create dots */

heroSlides.forEach((slide, index) => {

    const dot =
        document.createElement("span");

    dot.className = "slider-dot";

    if (index === 0) {

        dot.classList.add("active");

    }

    dot.addEventListener("click", () => {

        showHeroSlide(index);

    });

    sliderDots.appendChild(dot);

});


const heroDots =
    document.querySelectorAll(".slider-dot");


function showHeroSlide(index) {

    heroSlides.forEach(slide => {

        slide.classList.remove("active");

    });

    heroDots.forEach(dot => {

        dot.classList.remove("active");

    });


    currentSlide = index;

    heroSlides[currentSlide]
        .classList.add("active");

    heroDots[currentSlide]
        .classList.add("active");

}


nextSlide.addEventListener("click", () => {

    currentSlide++;

    if (currentSlide >= heroSlides.length) {

        currentSlide = 0;

    }

    showHeroSlide(currentSlide);

});


prevSlide.addEventListener("click", () => {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide =
            heroSlides.length - 1;

    }

    showHeroSlide(currentSlide);

});


/* Automatic hero slider */

setInterval(() => {

    currentSlide++;

    if (currentSlide >= heroSlides.length) {

        currentSlide = 0;

    }

    showHeroSlide(currentSlide);

}, 6000);


/* =====================================================
   TESTIMONIAL SLIDER
===================================================== */

const testimonials =
    document.querySelectorAll(".testimonial");

const testimonialDotsContainer =
    document.getElementById("testimonialDots");


let currentTestimonial = 0;


/* Create testimonial dots */

testimonials.forEach((testimonial, index) => {

    const dot =
        document.createElement("span");

    dot.className = "testimonial-dot";

    if (index === 0) {

        dot.classList.add("active");

    }

    dot.addEventListener("click", () => {

        showTestimonial(index);

    });

    testimonialDotsContainer.appendChild(dot);

});


const testimonialDots =
    document.querySelectorAll(".testimonial-dot");


function showTestimonial(index) {

    testimonials.forEach(item => {

        item.classList.remove("active");

    });

    testimonialDots.forEach(dot => {

        dot.classList.remove("active");

    });


    currentTestimonial = index;

    testimonials[currentTestimonial]
        .classList.add("active");

    testimonialDots[currentTestimonial]
        .classList.add("active");

}


/* Auto testimonial */

setInterval(() => {

    currentTestimonial++;

    if (currentTestimonial >= testimonials.length) {

        currentTestimonial = 0;

    }

    showTestimonial(currentTestimonial);

}, 5000);


/* =====================================================
   FAQ ACCORDION
===================================================== */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");


    question.addEventListener("click", () => {


        /* Close other FAQs */

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

            }

        });


        /* Toggle selected FAQ */

        item.classList.toggle("active");

    });

});


/* =====================================================
   APPOINTMENT FORM
===================================================== */

const appointmentForm =
    document.getElementById("appointmentForm");


appointmentForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        this.querySelector('[name="name"]').value;

    const phone =
        this.querySelector('[name="phone"]').value;

    const department =
        this.querySelector('[name="department"]').value;

    const date =
        this.querySelector('[name="date"]').value;

    const message =
        this.querySelector('[name="message"]').value;


    if (!name || !phone) {

        alert("Please enter your name and phone number.");

        return;

    }


    /*
       This is a demo form.

       To make it actually send data to your clinic,
       connect it to:

       - PHP
       - Formspree
       - Firebase
       - Supabase
       - WordPress API
       - Your own backend
    */


    const whatsappNumber =
        "919999999999";


    const whatsappMessage =
        `Hello, I would like to book an appointment.%0A%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Department: ${department}%0A` +
        `Preferred Date: ${date}%0A` +
        `Message: ${message}`;


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


    window.open(
        whatsappURL,
        "_blank"
    );


    this.reset();

});


/* =====================================================
   HEADER SHADOW ON SCROLL
===================================================== */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 5px 25px rgba(0,0,0,.06)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (href === `#${current}`) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   SET MINIMUM APPOINTMENT DATE
===================================================== */

const dateInput =
    document.querySelector(
        'input[name="date"]'
    );


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


    dateInput.min =
        `${year}-${month}-${day}`;

}


/* =====================================================
   SIMPLE IMAGE FALLBACK
===================================================== */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        /*
           If an image hasn't been added yet,
           use a neutral placeholder.
        */

        img.style.background =
            "#e9efed";

        img.style.minHeight =
            "150px";

        img.alt =
            "Clinic image placeholder";

    });

});


/* =====================================================
   PAGE LOADED
===================================================== */

console.log(
    "OrthoDerma Clinic website loaded successfully."
);
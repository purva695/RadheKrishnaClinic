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

/* =========================================================
   DYNAMIC BLOGS
   Loads published blogs from MongoDB
========================================================= */

const blogGrid =
    document.getElementById("blogGrid");


if (blogGrid) {

    const blogLoading =
        document.getElementById("blogLoading");


    const blogError =
        document.getElementById("blogError");


    const blogEmpty =
        document.getElementById("blogEmpty");



    /* =========================================
       LOAD BLOGS
    ========================================= */

    async function loadWebsiteBlogs() {

        try {

            const response =
                await fetch(
                    "https://radhekrishnaclinic.onrender.com/api/blogs"
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to load blogs."
                );

            }



            /* Hide loading */

            blogLoading.style.display =
                "none";



            /* No blogs */

            if (!data.length) {

                blogEmpty.style.display =
                    "block";

                return;

            }



            /* Render blogs */

            renderWebsiteBlogs(data);


        } catch (error) {

            console.error(
                "Website blogs error:",
                error
            );


            blogLoading.style.display =
                "none";


            blogError.style.display =
                "block";

        }

    }



    /* =========================================
       RENDER BLOG CARDS
    ========================================= */

    function renderWebsiteBlogs(blogs) {

        blogGrid.innerHTML =
            "";


        blogs.forEach(
            function (blog) {

                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "blog-card";



                /* =================================
                   IMAGE
                ================================= */

                let imageHTML = "";


                if (blog.image) {

                    imageHTML = `

                        <img
                            src="${blog.image}"
                            alt="${escapeBlogHTML(blog.title)}"
                            loading="lazy">

                    `;

                } else {

                    imageHTML = `

                        <div class="blog-no-image">

                            <i class="fa-regular fa-image"></i>

                        </div>

                    `;

                }



                /* =================================
                   DATE
                ================================= */

                const date =
                    blog.createdAt
                        ? formatWebsiteBlogDate(
                            blog.createdAt
                        )
                        : "";



                /* =================================
                   BLOG CARD
                ================================= */

                article.innerHTML = `

                    <div class="blog-image">

                        ${imageHTML}

                        <span class="blog-category">

                            ${escapeBlogHTML(
                                blog.category ||
                                "Health"
                            )}

                        </span>

                    </div>


                    <div class="blog-content">

                        <div class="blog-meta">

                            <span>

                                <i class="fa-regular fa-calendar"></i>

                                ${date}

                            </span>


                            <span>

                                <i class="fa-regular fa-clock"></i>

                                ${calculateReadTime(
                                    blog.content || ""
                                )}

                            </span>

                        </div>


                        <h3>

                            ${escapeBlogHTML(
                                blog.title
                            )}

                        </h3>


                        <p>

                            ${escapeBlogHTML(
                                blog.excerpt
                            )}

                        </p>


                        <a
                            href="blog-details.html?id=${blog._id}">

                            Read More

                            <i class="fa-solid fa-arrow-right"></i>

                        </a>

                    </div>

                `;


                blogGrid.appendChild(
                    article
                );

            }
        );

    }



    /* =========================================
       DATE FORMAT
    ========================================= */

    function formatWebsiteBlogDate(
        dateString
    ) {

        const date =
            new Date(dateString);


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }



    /* =========================================
       READ TIME
    ========================================= */

    function calculateReadTime(
        content
    ) {

        const words =
            content
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .length;


        const minutes =
            Math.max(
                1,
                Math.ceil(
                    words / 200
                )
            );


        return `${minutes} min read`;

    }



    /* =========================================
       ESCAPE HTML
    ========================================= */

    function escapeBlogHTML(
        text
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            text || "";


        return div.innerHTML;

    }



    /* =========================================
       LOAD
    ========================================= */

    loadWebsiteBlogs();

}

/* =========================================================
   HOME PAGE - LOAD LATEST BLOGS
========================================================= */

const homeBlogGrid =
    document.getElementById("homeBlogGrid");


if (homeBlogGrid) {

    async function loadHomeBlogs() {

        try {

            /* Loading */

            homeBlogGrid.innerHTML = `

                <div class="blog-loading">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Loading latest blogs...

                </div>

            `;


            /* Get blogs */

            const response =
                await fetch(
                    "https://radhekrishnaclinic.onrender.com/api/blogs"
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to load blogs."
                );

            }


            /* No blogs */

            if (!data.length) {

                homeBlogGrid.innerHTML = `

                    <div class="blog-empty">

                        <i class="fa-regular fa-newspaper"></i>

                        <h3>
                            No blogs available
                        </h3>

                        <p>
                            New health articles will appear here soon.
                        </p>

                    </div>

                `;

                return;

            }


            /*
                Latest 3 blogs only
            */

            const latestBlogs =
                data.slice(0, 3);


            homeBlogGrid.innerHTML =
                "";


            latestBlogs.forEach(
                function (blog) {

                    const article =
                        document.createElement(
                            "article"
                        );


                    article.className =
                        "blog-card";


                    /* =================================
                       IMAGE
                    ================================= */

                    let imageHTML = `

                        <div class="blog-image">

                            <div class="blog-no-image">

                                <i class="fa-regular fa-image"></i>

                            </div>

                            <span class="blog-category">
                                ${escapeBlogHTML(
                                    blog.category
                                )}
                            </span>

                        </div>

                    `;


                    if (blog.image) {

                        imageHTML = `

                            <div class="blog-image">

                                <img
                                    src="${blog.image}"
                                    alt="${escapeBlogHTML(
                                        blog.title
                                    )}">

                                <span class="blog-category">

                                    ${escapeBlogHTML(
                                        blog.category
                                    )}

                                </span>

                            </div>

                        `;

                    }



                    /* =================================
                       DATE
                    ================================= */

                    const date =
                        blog.createdAt
                            ? formatHomeBlogDate(
                                blog.createdAt
                            )
                            : "";



                    /* =================================
                       ARTICLE
                    ================================= */

                    article.innerHTML = `

                        ${imageHTML}


                        <div class="blog-content">

                            <div class="blog-meta">

                                <span>

                                    <i class="fa-regular fa-calendar"></i>

                                    ${date}

                                </span>

                            </div>


                            <h3>

                                ${escapeBlogHTML(
                                    blog.title
                                )}

                            </h3>


                            <p>

                                ${escapeBlogHTML(
                                    blog.excerpt
                                )}

                            </p>


                            <a
                                href="blog-details.html?id=${blog._id}">

                                Read More

                                <i class="fa-solid fa-arrow-right"></i>

                            </a>

                        </div>

                    `;


                    homeBlogGrid.appendChild(
                        article
                    );

                }
            );


        } catch (error) {

            console.error(
                "Home blogs error:",
                error
            );


            homeBlogGrid.innerHTML = `

                <div class="blog-error">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <h3>
                        Unable to load blogs
                    </h3>

                    <p>
                        Please try again later.
                    </p>

                </div>

            `;

        }

    }



    /* =========================================
       DATE FORMAT
    ========================================= */

    function formatHomeBlogDate(
        dateString
    ) {

        const date =
            new Date(dateString);


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }



    /* =========================================
       ESCAPE HTML
    ========================================= */

    function escapeBlogHTML(
        text
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            text || "";


        return div.innerHTML;

    }



    /* =========================================
       LOAD
    ========================================= */

    loadHomeBlogs();

}
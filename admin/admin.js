/* =========================================================
   RADHE KRISHNA CLINIC - ADMIN PANEL JAVASCRIPT
========================================================= */

const API_URL = "https://radhekrishnaclinic.onrender.com/api";


/* =========================================================
   HELPER - GET TOKEN
========================================================= */

function getToken() {
    return localStorage.getItem("adminToken");
}


/* =========================================================
   HELPER - LOGOUT
========================================================= */

function logoutAdmin() {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoggedIn");

    window.location.href = "login.html";
}


/* =========================================================
   LOGIN PAGE
========================================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    const loginMessage =
        document.getElementById("loginMessage");

    const passwordInput =
        document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");


    /* =========================================
       SHOW / HIDE PASSWORD
    ========================================= */

    if (togglePassword && passwordInput) {

        togglePassword.addEventListener("click", function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.innerHTML =
                    '<i class="fa-regular fa-eye-slash"></i>';

            } else {

                passwordInput.type = "password";

                togglePassword.innerHTML =
                    '<i class="fa-regular fa-eye"></i>';
            }

        });
    }


    /* =========================================
       LOGIN
    ========================================= */

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            passwordInput.value;


        loginMessage.textContent = "";


        if (!email || !password) {

            loginMessage.textContent =
                "Please enter email and password.";

            loginMessage.style.color = "red";

            return;
        }


        const loginButton =
            loginForm.querySelector(
                'button[type="submit"]'
            );


        if (loginButton) {

            loginButton.disabled = true;

            loginButton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';
        }


        try {

            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Invalid email or password."
                );
            }


            /* =================================
               SAVE LOGIN
            ================================= */

            if (!data.token) {

                throw new Error(
                    "Login successful but token was not received from server."
                );
            }


            localStorage.setItem(
                "adminToken",
                data.token
            );

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            loginMessage.textContent =
                "Login successful!";

            loginMessage.style.color =
                "green";


            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 500);


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            loginMessage.textContent =
                error.message ||
                "Unable to connect to server.";

            loginMessage.style.color =
                "red";


            if (loginButton) {

                loginButton.disabled = false;

                loginButton.innerHTML =
                    '<i class="fa-solid fa-right-to-bracket"></i> Login';
            }
        }

    });
}


/* =========================================================
   ADMIN PAGE PROTECTION
========================================================= */

const adminPage =
    document.querySelector(".admin-page");


if (adminPage && !loginForm) {

    const token =
        localStorage.getItem("adminToken");

    const loggedIn =
        localStorage.getItem("adminLoggedIn");


    if (!token || loggedIn !== "true") {

        window.location.href =
            "login.html";
    }
}


/* =========================================================
   LOGOUT BUTTON
========================================================= */

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            logoutAdmin();

        }
    );
}


/* =========================================================
   SIDEBAR TOGGLE
========================================================= */

const sidebarToggle =
    document.getElementById("sidebarToggle");

const sidebar =
    document.getElementById("sidebar");


if (sidebarToggle && sidebar) {

    sidebarToggle.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle("open");

        }
    );
}


/* =========================================================
   IMAGE PREVIEW - ADD BLOG
========================================================= */

const blogImage =
    document.getElementById("blogImage");

const imagePreview =
    document.getElementById("imagePreview");


if (blogImage && imagePreview) {

    blogImage.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {

                imagePreview.innerHTML = "";

                return;
            }


            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select a valid image."
                );

                this.value = "";

                imagePreview.innerHTML = "";

                return;
            }


            const maxSize =
                5 * 1024 * 1024;


            if (file.size > maxSize) {

                alert(
                    "Image size should be less than 5 MB."
                );

                this.value = "";

                imagePreview.innerHTML = "";

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    imagePreview.innerHTML = `
                        <img
                            src="${event.target.result}"
                            alt="Blog Image Preview">
                    `;
                };


            reader.readAsDataURL(file);

        }
    );
}


/* =========================================================
   CONVERT IMAGE TO BASE64
========================================================= */

function convertImageToBase64(file) {

    return new Promise(
        function (resolve, reject) {

            const reader =
                new FileReader();


            reader.onload =
                function () {

                    resolve(
                        reader.result
                    );
                };


            reader.onerror =
                function () {

                    reject(
                        new Error(
                            "Unable to read image."
                        )
                    );
                };


            reader.readAsDataURL(file);

        }
    );
}


/* =========================================================
   ADD BLOG
========================================================= */

const blogForm =
    document.getElementById("blogForm");


if (blogForm) {

    const blogMessage =
        document.getElementById("blogMessage");


    blogForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const token =
                getToken();


            if (!token) {

                alert(
                    "Your session has expired. Please login again."
                );

                logoutAdmin();

                return;
            }


            const title =
                document
                    .getElementById("blogTitle")
                    .value
                    .trim();


            const category =
                document
                    .getElementById("blogCategory")
                    .value;


            const author =
                document
                    .getElementById("blogAuthor")
                    .value
                    .trim();


            const excerpt =
                document
                    .getElementById("blogExcerpt")
                    .value
                    .trim();


            const content =
                document
                    .getElementById("blogContent")
                    .value
                    .trim();


            if (
                !title ||
                !category ||
                !excerpt ||
                !content
            ) {

                blogMessage.textContent =
                    "Please fill all required fields.";

                blogMessage.style.color =
                    "red";

                return;
            }


            const publishButton =
                blogForm.querySelector(
                    'button[type="submit"]'
                );


            if (publishButton) {

                publishButton.disabled = true;

                publishButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Publishing...';
            }


            try {

                let imageData = "";


                if (
                    blogImage &&
                    blogImage.files.length > 0
                ) {

                    imageData =
                        await convertImageToBase64(
                            blogImage.files[0]
                        );
                }


                const response =
                    await fetch(
                        `${API_URL}/blogs`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`
                            },

                            body: JSON.stringify({

                                title: title,

                                category: category,

                                author:
                                    author ||
                                    "Radhe Krishna Clinic",

                                excerpt: excerpt,

                                content: content,

                                image: imageData
                            })
                        }
                    );


                const data =
                    await response.json();


                if (response.status === 401) {

                    alert(
                        "Session expired. Please login again."
                    );

                    logoutAdmin();

                    return;
                }


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to publish blog."
                    );
                }


                blogMessage.textContent =
                    "Blog published successfully!";

                blogMessage.style.color =
                    "green";


                blogForm.reset();


                if (imagePreview) {

                    imagePreview.innerHTML = "";
                }


                const authorInput =
                    document.getElementById(
                        "blogAuthor"
                    );


                if (authorInput) {

                    authorInput.value =
                        "Radhe Krishna Clinic";
                }


                setTimeout(
                    function () {

                        window.location.href =
                            "blogs.html";

                    },
                    1000
                );


            } catch (error) {

                console.error(
                    "Add blog error:",
                    error
                );


                blogMessage.textContent =
                    error.message ||
                    "Unable to connect to server.";

                blogMessage.style.color =
                    "red";


                if (publishButton) {

                    publishButton.disabled =
                        false;

                    publishButton.innerHTML =
                        '<i class="fa-solid fa-paper-plane"></i> Publish Blog';
                }
            }

        }
    );
}


/* =========================================================
   MANAGE BLOGS
========================================================= */

const blogsTableBody =
    document.getElementById(
        "blogsTableBody"
    );


if (blogsTableBody) {

    const blogsLoading =
        document.getElementById(
            "blogsLoading"
        );

    const blogsError =
        document.getElementById(
            "blogsError"
        );

    const blogsEmpty =
        document.getElementById(
            "blogsEmpty"
        );

    const blogsTableWrapper =
        document.getElementById(
            "blogsTableWrapper"
        );

    const blogSearch =
        document.getElementById(
            "blogSearch"
        );


    let allBlogs = [];


    /* =========================================
       LOAD BLOGS
    ========================================= */

    async function loadBlogs() {

        try {

            if (blogsLoading) {

                blogsLoading.style.display =
                    "block";
            }


            const response =
                await fetch(
                    `${API_URL}/blogs`
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to load blogs."
                );
            }


            allBlogs =
                Array.isArray(data)
                    ? data
                    : data.blogs || [];


            if (blogsLoading) {

                blogsLoading.style.display =
                    "none";
            }


            if (!allBlogs.length) {

                if (blogsEmpty) {

                    blogsEmpty.style.display =
                        "block";
                }

                if (blogsTableWrapper) {

                    blogsTableWrapper.style.display =
                        "none";
                }

                return;
            }


            if (blogsEmpty) {

                blogsEmpty.style.display =
                    "none";
            }


            if (blogsTableWrapper) {

                blogsTableWrapper.style.display =
                    "block";
            }


            renderBlogs(allBlogs);


        } catch (error) {

            console.error(
                "Load blogs error:",
                error
            );


            if (blogsLoading) {

                blogsLoading.style.display =
                    "none";
            }


            if (blogsError) {

                blogsError.textContent =
                    error.message ||
                    "Unable to load blogs.";

                blogsError.style.display =
                    "block";
            }
        }
    }


    /* =========================================
       RENDER BLOGS
    ========================================= */

    function renderBlogs(blogs) {

        blogsTableBody.innerHTML = "";


        if (!blogs.length) {

            blogsTableBody.innerHTML = `
                <tr>
                    <td
                        colspan="5"
                        style="text-align:center; padding:30px;">
                        No blogs found.
                    </td>
                </tr>
            `;

            return;
        }


        blogs.forEach(
            function (blog) {

                const row =
                    document.createElement("tr");


                let imageHTML = `
                    <div class="no-blog-image">
                        <i class="fa-regular fa-image"></i>
                    </div>
                `;


                if (blog.image) {

                    imageHTML = `
                        <img
                            src="${escapeHTML(blog.image)}"
                            alt="${escapeHTML(blog.title)}"
                            class="admin-table-blog-image">
                    `;
                }


                const blogDate =
                    blog.createdAt
                        ? formatBlogDate(
                            blog.createdAt
                        )
                        : "-";


                const categoryClass =
                    (blog.category || "general")
                        .toLowerCase()
                        .replace(/\s+/g, "-");


                row.innerHTML = `

                    <td>

                        <div class="admin-blog-info">

                            ${imageHTML}

                            <div>

                                <strong>
                                    ${escapeHTML(
                                        blog.title
                                    )}
                                </strong>

                                <span>
                                    ${escapeHTML(
                                        blog.author ||
                                        "Radhe Krishna Clinic"
                                    )}
                                </span>

                            </div>

                        </div>

                    </td>


                    <td>

                        <span
                            class="category-badge ${categoryClass}">

                            ${escapeHTML(
                                blog.category ||
                                "General Health"
                            )}

                        </span>

                    </td>


                    <td>
                        ${blogDate}
                    </td>


                    <td>

                        <span
                            class="status-badge published">

                            Published

                        </span>

                    </td>


                    <td>

                        <div class="table-actions">

                            <a
                                href="edit-blog.html?id=${encodeURIComponent(blog._id)}"
                                class="edit-btn"
                                title="Edit">

                                <i class="fa-solid fa-pen"></i>

                            </a>


                            <button
                                class="delete-btn"
                                data-id="${escapeHTML(blog._id)}"
                                title="Delete">

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </td>

                `;


                blogsTableBody.appendChild(row);

            }
        );


        attachDeleteEvents();
    }


    /* =========================================
       SEARCH
    ========================================= */

    if (blogSearch) {

        blogSearch.addEventListener(
            "input",
            function () {

                const searchText =
                    this.value
                        .toLowerCase()
                        .trim();


                const filteredBlogs =
                    allBlogs.filter(
                        function (blog) {

                            const title =
                                (
                                    blog.title ||
                                    ""
                                )
                                    .toLowerCase();


                            const category =
                                (
                                    blog.category ||
                                    ""
                                )
                                    .toLowerCase();


                            const author =
                                (
                                    blog.author ||
                                    ""
                                )
                                    .toLowerCase();


                            return (
                                title.includes(searchText) ||
                                category.includes(searchText) ||
                                author.includes(searchText)
                            );
                        }
                    );


                renderBlogs(
                    filteredBlogs
                );
            }
        );
    }


    /* =========================================
       DELETE BLOG
    ========================================= */

    function attachDeleteEvents() {

        const deleteButtons =
            document.querySelectorAll(
                ".delete-btn"
            );


        deleteButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    async function () {

                        const blogId =
                            this.dataset.id;


                        if (!blogId) {

                            alert(
                                "Blog ID is missing."
                            );

                            return;
                        }


                        const confirmed =
                            confirm(
                                "Are you sure you want to delete this blog?"
                            );


                        if (!confirmed) {

                            return;
                        }


                        const token =
                            getToken();


                        if (!token) {

                            alert(
                                "Session expired. Please login again."
                            );

                            logoutAdmin();

                            return;
                        }


                        button.disabled = true;

                        button.innerHTML =
                            '<i class="fa-solid fa-spinner fa-spin"></i>';


                        try {

                            const response =
                                await fetch(
                                    `${API_URL}/blogs/${encodeURIComponent(blogId)}`,
                                    {
                                        method: "DELETE",

                                        headers: {
                                            "Authorization":
                                                `Bearer ${token}`
                                        }
                                    }
                                );


                            const data =
                                await response.json();


                            if (
                                response.status === 401
                            ) {

                                logoutAdmin();

                                return;
                            }


                            if (!response.ok) {

                                throw new Error(
                                    data.message ||
                                    "Unable to delete blog."
                                );
                            }


                            alert(
                                "Blog deleted successfully."
                            );


                            loadBlogs();


                        } catch (error) {

                            console.error(
                                "Delete blog error:",
                                error
                            );


                            alert(
                                error.message ||
                                "Unable to delete blog."
                            );


                            button.disabled =
                                false;

                            button.innerHTML =
                                '<i class="fa-solid fa-trash"></i>';
                        }

                    }
                );
            }
        );
    }


    loadBlogs();
}


/* =========================================================
   EDIT BLOG
========================================================= */

const editBlogForm =
    document.getElementById(
        "editBlogForm"
    );


if (editBlogForm) {

    const editBlogTitle =
        document.getElementById(
            "editBlogTitle"
        );

    const editBlogCategory =
        document.getElementById(
            "editBlogCategory"
        );

    const editBlogAuthor =
        document.getElementById(
            "editBlogAuthor"
        );

    const editBlogExcerpt =
        document.getElementById(
            "editBlogExcerpt"
        );

    const editBlogContent =
        document.getElementById(
            "editBlogContent"
        );

    const currentBlogImage =
        document.getElementById(
            "currentBlogImage"
        );

    const currentImageBox =
        document.getElementById(
            "currentImageBox"
        );

    const removeCurrentImage =
        document.getElementById(
            "removeCurrentImage"
        );

    const imageRemovedMessage =
        document.getElementById(
            "imageRemovedMessage"
        );

    const editBlogImage =
        document.getElementById(
            "editBlogImage"
        );

    const editImagePreview =
        document.getElementById(
            "editImagePreview"
        );

    const editBlogMessage =
        document.getElementById(
            "editBlogMessage"
        );


    let currentImageRemoved =
        false;

    let originalImage =
        "";


    /* =========================================
       GET BLOG ID
    ========================================= */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const blogId =
        urlParams.get("id");


    if (!blogId) {

        editBlogMessage.textContent =
            "Blog ID is missing.";

        editBlogMessage.style.color =
            "red";

    } else {

        loadBlogForEditing(blogId);
    }


    /* =========================================
       LOAD BLOG
    ========================================= */

    async function loadBlogForEditing(id) {

        try {

            editBlogMessage.textContent =
                "Loading blog...";

            editBlogMessage.style.color =
                "#246b9c";


            const response =
                await fetch(
                    `${API_URL}/blogs/${encodeURIComponent(id)}`
                );


            const blog =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    blog.message ||
                    "Unable to load blog."
                );
            }


            /* =================================
               FILL FORM
            ================================= */

            editBlogTitle.value =
                blog.title || "";


            editBlogCategory.value =
                blog.category || "";


            editBlogAuthor.value =
                blog.author ||
                "Radhe Krishna Clinic";


            editBlogExcerpt.value =
                blog.excerpt || "";


            editBlogContent.value =
                blog.content || "";


            /* =================================
               CURRENT IMAGE
            ================================= */

            originalImage =
                blog.image || "";


            currentImageRemoved =
                false;


            if (originalImage) {

                currentBlogImage.src =
                    originalImage;

                currentBlogImage.alt =
                    blog.title ||
                    "Blog Image";


                currentImageBox.style.display =
                    "block";


                imageRemovedMessage.style.display =
                    "none";

            } else {

                currentImageBox.style.display =
                    "none";


                imageRemovedMessage.style.display =
                    "block";
            }


            editBlogMessage.textContent =
                "";


        } catch (error) {

            console.error(
                "Load blog error:",
                error
            );


            editBlogMessage.textContent =
                error.message ||
                "Unable to load blog.";

            editBlogMessage.style.color =
                "red";
        }
    }


    /* =========================================
       REMOVE CURRENT IMAGE
    ========================================= */

    if (removeCurrentImage) {

        removeCurrentImage.addEventListener(
            "click",
            function () {

                const confirmRemove =
                    confirm(
                        "Are you sure you want to remove the current image?"
                    );


                if (!confirmRemove) {

                    return;
                }


                currentImageRemoved =
                    true;


                originalImage =
                    "";


                currentImageBox.style.display =
                    "none";


                imageRemovedMessage.style.display =
                    "block";


                if (editBlogImage) {

                    editBlogImage.value =
                        "";
                }


                if (editImagePreview) {

                    editImagePreview.innerHTML =
                        "";
                }


                editBlogMessage.textContent =
                    "Current image will be removed when you click Update Blog.";

                editBlogMessage.style.color =
                    "#8a6d1d";

            }
        );
    }


    /* =========================================
       NEW IMAGE PREVIEW
    ========================================= */

    if (editBlogImage) {

        editBlogImage.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];


                if (!file) {

                    editImagePreview.innerHTML =
                        "";

                    return;
                }


                if (!file.type.startsWith("image/")) {

                    alert(
                        "Please select a valid image file."
                    );

                    this.value = "";

                    editImagePreview.innerHTML =
                        "";

                    return;
                }


                const maxSize =
                    5 * 1024 * 1024;


                if (file.size > maxSize) {

                    alert(
                        "Image size should be less than 5 MB."
                    );

                    this.value = "";

                    editImagePreview.innerHTML =
                        "";

                    return;
                }


                /* New image replaces old image */

                currentImageRemoved =
                    false;


                currentImageBox.style.display =
                    originalImage
                        ? "block"
                        : "none";


                imageRemovedMessage.style.display =
                    "none";


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        editImagePreview.innerHTML = `
                            <img
                                src="${event.target.result}"
                                alt="New Blog Image Preview">
                        `;
                    };


                reader.readAsDataURL(file);

            }
        );
    }


    /* =========================================
       UPDATE BLOG
    ========================================= */

    editBlogForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const token =
                getToken();


            if (!token) {

                alert(
                    "Session expired. Please login again."
                );

                logoutAdmin();

                return;
            }


            const title =
                editBlogTitle.value.trim();


            const category =
                editBlogCategory.value;


            const author =
                editBlogAuthor.value.trim();


            const excerpt =
                editBlogExcerpt.value.trim();


            const content =
                editBlogContent.value.trim();


            if (
                !title ||
                !category ||
                !excerpt ||
                !content
            ) {

                editBlogMessage.textContent =
                    "Please fill all required fields.";

                editBlogMessage.style.color =
                    "red";

                return;
            }


            const updateButton =
                editBlogForm.querySelector(
                    'button[type="submit"]'
                );


            if (updateButton) {

                updateButton.disabled =
                    true;

                updateButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Updating...';
            }


            try {

                let imageData =
                    originalImage;


                /* =================================
                   REMOVE IMAGE
                ================================= */

                if (currentImageRemoved) {

                    imageData = "";
                }


                /* =================================
                   NEW IMAGE
                ================================= */

                if (
                    editBlogImage &&
                    editBlogImage.files.length > 0
                ) {

                    imageData =
                        await convertImageToBase64(
                            editBlogImage.files[0]
                        );
                }


                /* =================================
                   SEND UPDATE
                ================================= */

                const response =
                    await fetch(
                        `${API_URL}/blogs/${encodeURIComponent(blogId)}`,
                        {
                            method: "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`
                            },

                            body: JSON.stringify({

                                title: title,

                                category: category,

                                author:
                                    author ||
                                    "Radhe Krishna Clinic",

                                excerpt: excerpt,

                                content: content,

                                image: imageData,

                                removeImage:
                                    currentImageRemoved
                            })
                        }
                    );


                const data =
                    await response.json();


                if (response.status === 401) {

                    alert(
                        "Session expired. Please login again."
                    );

                    logoutAdmin();

                    return;
                }


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to update blog."
                    );
                }


                editBlogMessage.textContent =
                    "Blog updated successfully!";

                editBlogMessage.style.color =
                    "green";


                setTimeout(
                    function () {

                        window.location.href =
                            "blogs.html";

                    },
                    1000
                );


            } catch (error) {

                console.error(
                    "Update blog error:",
                    error
                );


                editBlogMessage.textContent =
                    error.message ||
                    "Unable to update blog.";

                editBlogMessage.style.color =
                    "red";


                if (updateButton) {

                    updateButton.disabled =
                        false;

                    updateButton.innerHTML =
                        '<i class="fa-solid fa-rotate"></i> Update Blog';
                }
            }

        }
    );
}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatBlogDate(dateString) {

    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {

        return "-";
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text || "";


    return div.innerHTML;
}

/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

const totalBlogsElement =
    document.getElementById("totalBlogs");

const publishedBlogsElement =
    document.getElementById("publishedBlogs");

const todayBlogsElement =
    document.getElementById("todayBlogs");


if (
    totalBlogsElement &&
    publishedBlogsElement &&
    todayBlogsElement
) {


    /* =========================================
       LOAD DASHBOARD STATS
    ========================================= */

    async function loadDashboardStats() {

        try {

            /* Loading state */

            totalBlogsElement.textContent =
                "...";

            publishedBlogsElement.textContent =
                "...";

            todayBlogsElement.textContent =
                "...";


            /* =================================
               GET BLOGS FROM API
            ================================= */

            const response =
                await fetch(
                    `${API_URL}/blogs`
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to load dashboard statistics."
                );
            }


            /* =================================
               HANDLE API RESPONSE
            ================================= */

            const blogs =
                Array.isArray(data)
                    ? data
                    : data.blogs || [];


            /* =================================
               TOTAL BLOGS
            ================================= */

            const totalBlogs =
                blogs.length;


            totalBlogsElement.textContent =
                totalBlogs;


            /* =================================
               PUBLISHED BLOGS
               
               Currently all blogs created by
               our admin are published.
            ================================= */

            const publishedBlogs =
                blogs.filter(
                    function (blog) {

                        /*
                           If backend has status,
                           check it.

                           Otherwise consider
                           the blog published.
                        */

                        return (
                            !blog.status ||
                            blog.status === "published" ||
                            blog.status === "Published"
                        );

                    }
                ).length;


            publishedBlogsElement.textContent =
                publishedBlogs;


            /* =================================
               TODAY'S BLOGS
            ================================= */

            const today =
                new Date();


            const todayBlogs =
                blogs.filter(
                    function (blog) {

                        if (!blog.createdAt) {

                            return false;

                        }


                        const blogDate =
                            new Date(
                                blog.createdAt
                            );


                        return (

                            blogDate.getDate() ===
                            today.getDate()

                            &&

                            blogDate.getMonth() ===
                            today.getMonth()

                            &&

                            blogDate.getFullYear() ===
                            today.getFullYear()

                        );

                    }
                ).length;


            todayBlogsElement.textContent =
                todayBlogs;


        } catch (error) {

            console.error(
                "Dashboard stats error:",
                error
            );


            totalBlogsElement.textContent =
                "0";

            publishedBlogsElement.textContent =
                "0";

            todayBlogsElement.textContent =
                "0";

        }

    }


    /* =========================================
       LOAD STATS
    ========================================= */

    loadDashboardStats();

}
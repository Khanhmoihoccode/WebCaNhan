const body = document.body;

const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const avatar = document.getElementById("avatar");
const changeAvatar = document.getElementById("changeAvatar");
const avatarInput = document.getElementById("avatarInput");

const progress = document.getElementById("progress");
const topBtn = document.getElementById("topBtn");

const contactForm = document.getElementById("contactForm");

const typing = document.getElementById("typing");



/* DARK MODE */

themeBtn.addEventListener("click", function () {

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


if (localStorage.getItem("theme") === "dark") {

    body.classList.add("dark");

    themeBtn.textContent = "☀️";

}



/* MOBILE MENU */

menuBtn.addEventListener("click", function () {

    nav.classList.toggle("active");

});


const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("active");

    });

});



/* TYPING EFFECT */

const words = [
    "Sinh viên Sư phạm Tin học",
    "Lập trình viên",
    "Web Developer",
    "Người yêu công nghệ"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typing.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typing.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );

}

typeEffect();



/* SCROLL */

window.addEventListener("scroll", function () {

    const scrollTop =
        window.scrollY;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent =
        (scrollTop / height) * 100;

    progress.style.width =
        percent + "%";


    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});



/* BACK TO TOP */

topBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});



/* SKILL ANIMATION */

const skillProgress =
    document.querySelectorAll(
        ".skill-progress"
    );


const skillObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.width =
                            entry.target.dataset.width;

                    }

                }
            );

        },
        {
            threshold: 0.5
        }
    );


skillProgress.forEach(
    function (skill) {

        skillObserver.observe(skill);

    }
);



/* CHANGE AVATAR */

changeAvatar.addEventListener(
    "click",
    function () {

        avatarInput.click();

    }
);


avatarInput.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];

        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            showToast(
                "Vui lòng chọn file ảnh!"
            );

            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                avatar.src =
                    event.target.result;

                localStorage.setItem(
                    "avatar",
                    event.target.result
                );

                showToast(
                    "Đã thay đổi ảnh đại diện!"
                );

            };


        reader.readAsDataURL(file);

    }
);



const savedAvatar =
    localStorage.getItem("avatar");


if (savedAvatar) {

    avatar.src =
        savedAvatar;

}



/* CONTACT FORM */

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const message =
            document.getElementById(
                "message"
            ).value.trim();


        if (name === "") {

            showToast(
                "Vui lòng nhập họ tên!"
            );

            return;
        }


        if (
            email === "" ||
            !email.includes("@")
        ) {

            showToast(
                "Email không hợp lệ!"
            );

            return;
        }


        if (message === "") {

            showToast(
                "Vui lòng nhập nội dung!"
            );

            return;
        }


        showToast(
            "Gửi tin nhắn thành công!"
        );


        contactForm.reset();

    }
);



/* TOAST */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}
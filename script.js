const cursor = document.querySelector(".cursor");
const blur = document.querySelector(".cursor-blur");


window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

window.addEventListener("mousemove", e => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    blur.style.left = e.clientX + "px";
    blur.style.top = e.clientY + "px";

});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        navbar.style.background = "rgba(15,23,36,.82)";
        navbar.style.padding = "15px 32px";
    } else {
        navbar.style.background = "rgba(255,255,255,.05)";
        navbar.style.padding = "18px 32px";
    }
});

//========= MOBILE NAV =========//
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="ri-close-line"></i>'
        : '<i class="ri-menu-3-line"></i>';
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.innerHTML = '<i class="ri-menu-3-line"></i>';
    });
});

//========= PORTFOLIO FILTER =========//

const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".portfolio-card");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach(card => {

            if (filter === "all" || card.dataset.category === filter) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});

//========= COUNTERS =========//

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 80);

        const update = () => {
            count += step;
            if (count >= target) {
                counter.innerText = target + (target === 98 ? "%" : "+");
            } else {
                counter.innerText = count;
                requestAnimationFrame(update);
            }
        };

        update();
        counterObserver.unobserve(counter);
    });
}, { threshold: .5 });

counters.forEach(counterObserver.observe.bind(counterObserver));

//========= PROGRESS BAR =========//

const progress = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    progress.style.width = (current / total) * 100 + "%";
});

//========= BACK TO TOP =========//

const topBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const reveals = document.querySelectorAll("section");
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: .2 });
reveals.forEach(section => {
    section.classList.add("reveal");
    revealObserver.observe(section);
});

const modal = document.querySelector(".video-modal");
const video = modal.querySelector("video");
const close = document.querySelector(".close-modal");

cards.forEach(card => {
    card.addEventListener("click", () => {
        video.src = card.dataset.video;
        modal.classList.add("active");
        video.play();
    });
});

close.addEventListener("click", () => {
    modal.classList.remove("active");
    video.pause();
    video.currentTime = 0;
});

modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.classList.remove("active");
        video.pause();
        video.currentTime = 0;
    }
});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * .18}px,${y * .18}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});

cards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = (x - rect.width / 2) / 18;
        const rotateX = (rect.height / 2 - y) / 18;
        card.style.transform =
            `perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)`;

    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", e => {
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const rect = btn.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left + "px";
        ripple.style.top = e.clientY - rect.top + "px";
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});
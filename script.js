document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const allNavLinks = document.querySelectorAll(".nav-link");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const yearSpan = document.getElementById("currentYear");

    // 1. Dynamic Footer Year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Dark / Light Mode Toggle with localStorage Persistence
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
        html.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        html.setAttribute("data-theme", "dark");
    }

    themeToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        localStorage.setItem("portfolio-theme", next);
    });

    // 3. Mobile Navigation Drawer
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    allNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // 4. Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll("section[id]");
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    allNavLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`
                        );
                    });
                }
            });
        },
        { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));

    // 5. Project Category Filter
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selected = btn.dataset.filter;

            filterButtons.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            projectCards.forEach((card) => {
                const categories = (card.dataset.category || "").split(" ");
                const match = selected === "all" || categories.includes(selected);
                card.classList.toggle("hidden", !match);
            });
        });
    });

    // 6. Scroll Reveal Animations
    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
});
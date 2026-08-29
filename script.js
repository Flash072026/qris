document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("q");
    const cards = Array.from(document.querySelectorAll(".guide-card"));
    const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
    const emptyState = document.getElementById("empty");
    
    let activeFilter = "all";

    function filterAndSearch() {
        if (!cards.length) return;
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
        let visibleCount = 0;

        cards.forEach(card => {
            const group = card.dataset.group;
            const searchKeywords = card.dataset.search ? card.dataset.search.toLowerCase() : "";
            const cardText = card.innerText.toLowerCase();

            const matchesCategory = (activeFilter === "all" || group === activeFilter);
            const matchesSearch = (!searchTerm || searchKeywords.includes(searchTerm) || cardText.includes(searchTerm));

            if (matchesCategory && matchesSearch) {
                card.classList.remove("hidden");
                visibleCount++;
            } else {
                card.classList.add("hidden");
            }
        });

        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.dataset.filter;
            filterAndSearch();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", filterAndSearch);
    }

    // Subtle scroll-reveal for cards
    if ("IntersectionObserver" in window && cards.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${(i % 6) * 40}ms`;
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        cards.forEach(card => {
            card.classList.add("reveal");
            revealObserver.observe(card);
        });
    }

    // Accordion: doc-card topics on panduan.html & kebijakan.html
    const docCards = Array.from(document.querySelectorAll(".doc-card"));
    if (docCards.length) {
        function closeCard(card) {
            card.classList.remove("open");
            const toggle = card.querySelector(".doc-toggle");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
        }

        function openCard(card, { scroll = false } = {}) {
            docCards.forEach(c => { if (c !== card) closeCard(c); });
            card.classList.add("open");
            const toggle = card.querySelector(".doc-toggle");
            if (toggle) toggle.setAttribute("aria-expanded", "true");
            if (scroll) {
                requestAnimationFrame(() => {
                    card.scrollIntoView({ behavior: "smooth", block: "start" });
                });
            }
        }

        docCards.forEach(card => {
            const toggle = card.querySelector(".doc-toggle");
            if (!toggle) return;
            toggle.addEventListener("click", () => {
                if (card.classList.contains("open")) {
                    closeCard(card);
                } else {
                    openCard(card, { scroll: false });
                }
            });
        });

        // Open the topic referenced by the URL hash (e.g. from index.html links)
        function openFromHash() {
            const hash = window.location.hash.replace("#", "");
            if (!hash) return;
            const target = document.getElementById(hash);
            if (target && target.classList.contains("doc-card")) {
                openCard(target, { scroll: true });
            }
        }

        openFromHash();
        window.addEventListener("hashchange", openFromHash);
    }
});
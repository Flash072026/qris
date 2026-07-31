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
});
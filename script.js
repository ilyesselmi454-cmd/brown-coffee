
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

// Current year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Mobile navigation
function closeMenu() {
  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  document.body.classList.toggle("menu-open", isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close menu with Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Filter menu products
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Update selected filter
    filterButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    // Show matching products
    productCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow =
        selectedFilter === "all" || category === selectedFilter;

      card.hidden = !shouldShow;
    });
  });
});

// Keep navigation usable when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    closeMenu();
  }
});

const menuSearch = document.getElementById("menuSearch");
const menuCount = document.getElementById("menuCount");

function updateMenuSearch() {
  const searchTerm = menuSearch.value.trim().toLowerCase();
  const selectedButton = document.querySelector(".filter-btn.active");
  const selectedFilter = selectedButton
    ? selectedButton.dataset.filter
    : "all";

  let visibleCount = 0;

  document.querySelectorAll(".product-card").forEach((card) => {
    const category = (card.dataset.category || "").toLowerCase();
    const text = card.textContent.toLowerCase();

    const matchesCategory =
      selectedFilter === "all" || category === selectedFilter;
    const matchesSearch = text.includes(searchTerm);
    const showCard = matchesCategory && matchesSearch;

    card.hidden = !showCard;
    if (showCard) visibleCount++;
  });

  if (menuCount) {
    menuCount.textContent =
      `${visibleCount} ${visibleCount === 1 ? "item" : "items"}`;
  }
}

if (menuSearch) {
  menuSearch.addEventListener("input", updateMenuSearch);
}

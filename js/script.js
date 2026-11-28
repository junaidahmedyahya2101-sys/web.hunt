
/* =========================================
   WEBHUNT — WEBSITE DISCOVERY SYSTEM
   Discover. Explore. Connect.
========================================= */


/* WEBSITE DATABASE */

const websites = [

    {
        name: "PhET",
        description: "Explore interactive, research-based simulations for physics, chemistry, biology, earth science and mathematics.",
        url: "https://phet.colorado.edu/",
        category: "Education",
        access: "Free",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: true
    },

    {
        name: "Mathigon",
        description: "Learn mathematics through interactive courses, virtual manipulatives, puzzles and visual activities.",
        url: "https://mathigon.org/",
        category: "Education",
        access: "Free",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: true
    },

    {
        name: "NRICH",
        description: "Build mathematical problem-solving skills with free activities, puzzles and teacher resources from the University of Cambridge.",
        url: "https://nrich.maths.org/",
        category: "Education",
        access: "Free",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: false
    },

    {
        name: "Learn.Genetics",
        description: "Explore genetics, cell biology, evolution and human health through interactive science learning resources from the University of Utah.",
        url: "https://learn.genetics.utah.edu/",
        category: "Education",
        access: "Free Educational Resources",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: false
    },

    {
        name: "ChemCollective",
        description: "Practice chemistry concepts with virtual labs, simulations, tutorials and scenario-based activities.",
        url: "https://chemcollective.org/",
        category: "Education",
        access: "Free",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: false
    },

    {
        name: "OpenLearn",
        description: "Study free Open University courses, articles, videos and interactive learning resources across many subjects.",
        url: "https://www.open.edu/openlearn/",
        category: "Education",
        access: "Free Courses",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: true
    },

    {
        name: "Class Central",
        description: "Discover and compare online courses from universities and learning providers, including free and paid options.",
        url: "https://www.classcentral.com/",
        category: "Education",
        access: "Free & Paid Courses",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: false
    },

    {
        name: "Zooniverse",
        description: "Take part in real research by helping scientists classify data in projects across science, history, nature and more.",
        url: "https://www.zooniverse.org/",
        category: "Education",
        access: "Free Participation",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: true
    },

    {
        name: "GCFGlobal",
        description: "Build practical digital, work and everyday skills with free, self-paced lessons.",
        url: "https://edu.gcfglobal.org/",
        category: "Education",
        access: "Free Learning Resources",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: false
    },

    {
        name: "BetterExplained",
        description: "Understand mathematics through intuitive, visual explanations, articles and guided lessons.",
        url: "https://betterexplained.com/",
        category: "Education",
        access: "Free Articles; Paid Products",
        recommendation: "Free Recommendation",
        affiliate: false,
        featured: false
    }

];


/* WEBSITE CATEGORIES */

const categories = [
    "AI Tools",
    "Gaming",
    "Education",
    "Online Earning",
    "Entertainment",
    "Productivity"
];


/* WEBSITE ICONS */

const categoryIcons = {
    "AI Tools": "fa-brain",
    "Gaming": "fa-gamepad",
    "Education": "fa-graduation-cap",
    "Online Earning": "fa-coins",
    "Entertainment": "fa-clapperboard",
    "Productivity": "fa-bolt"
};


/* GET HTML ELEMENTS */

const websiteGrid = document.getElementById("website-grid");
const featuredGrid = document.getElementById("featured-grid");
const searchInput = document.getElementById("website-search");
const emptyMessage = document.getElementById("empty-message");

const filterButtons = document.querySelectorAll(".filter-btn");
const categoryCards = document.querySelectorAll(".category-card");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


/* CURRENT FILTER */

let activeCategory = "All";
let searchQuery = "";


/* CREATE WEBSITE CARD */

function createWebsiteCard(website) {

    const card = document.createElement("article");
    card.className = "website-card";

    const icon = categoryIcons[website.category] || "fa-globe";

    card.innerHTML = `
        <div class="website-icon">
            <i class="fa-solid ${icon}"></i>
        </div>

        <h3></h3>

        <p></p>

        <span class="website-category"></span>

        <div class="website-labels">
            <span class="access-label"></span>
            <span class="recommendation-label"></span>
        </div>

        ${website.affiliate
            ? '<span class="affiliate-label">Affiliate</span>'
            : ''
        }

        ${website.url
            ? `<a class="visit-button"
                  target="_blank"
                  rel="noopener noreferrer">
                  Visit Website
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
               </a>`
            : `<span class="visit-button" aria-disabled="true">
                  Link Coming Soon
               </span>`
        }
    `;

    card.querySelector("h3").textContent = website.name;

    card.querySelector("p").textContent = website.description;

    card.querySelector(".website-category").textContent =
        website.category;

    card.querySelector(".access-label").textContent =
        website.access;

    card.querySelector(".recommendation-label").textContent =
        website.recommendation;

    const visitButton = card.querySelector(".visit-button");

    if (website.url && visitButton.tagName === "A") {
        visitButton.href = website.url;
    }

    return card;
}


/* DISPLAY WEBSITE CARDS */

function renderWebsites() {

    if (!websiteGrid) return;

    websiteGrid.innerHTML = "";

    const filteredWebsites = websites.filter(website => {

        const matchesCategory =
            activeCategory === "All" ||
            website.category === activeCategory;

        const matchesSearch =
            website.name.toLowerCase().includes(searchQuery) ||
            website.description.toLowerCase().includes(searchQuery) ||
            website.category.toLowerCase().includes(searchQuery) ||
            website.access.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesSearch;
    });

    filteredWebsites.forEach(website => {
        websiteGrid.appendChild(createWebsiteCard(website));
    });

    if (emptyMessage) {
        emptyMessage.hidden = filteredWebsites.length !== 0;
    }
}


/* DISPLAY FEATURED WEBSITES */

function renderFeaturedWebsites() {

    if (!featuredGrid) return;

    featuredGrid.innerHTML = "";

    const featuredWebsites = websites.filter(
        website => website.featured === true
    );

    featuredWebsites.forEach(website => {

        const card = createWebsiteCard(website);

        card.classList.remove("website-card");
        card.classList.add("featured-card");

        featuredGrid.appendChild(card);

    });
}


/* SEARCH FUNCTIONALITY */

if (searchInput) {

    searchInput.addEventListener("input", function () {

        searchQuery = this.value.trim().toLowerCase();

        renderWebsites();

    });

}


/* CATEGORY FILTER FUNCTIONALITY */

function setCategory(category) {

    activeCategory = category;

    filterButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.filter === category
        );

    });

    renderWebsites();

}


/* FILTER BUTTON EVENTS */

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        setCategory(this.dataset.filter);

    });

});


/* CATEGORY CARD EVENTS */

categoryCards.forEach(card => {

    card.addEventListener("click", function () {

        const category = this.dataset.category;

        setCategory(category);

        document.getElementById("websites")?.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* MOBILE NAVIGATION */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    /* CLOSE MENU AFTER CLICKING A LINK */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

}


/* DYNAMIC COPYRIGHT YEAR */

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* INITIALIZE WEBHUNT */

renderWebsites();

renderFeaturedWebsites(); 

console.log("WEBHUNT JavaScript initialized successfully.");

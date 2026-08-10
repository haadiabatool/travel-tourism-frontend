import { destinations } from "./destination.js";

// Take Destination ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const destination = destinations[id];  



// ==========================================
// TRACK VIEWED DESTINATION
// ==========================================

let viewedDestinations =
    JSON.parse(
        localStorage.getItem("viewedDestinations")
    ) || [];

// Remove duplicate if destination was already viewed
viewedDestinations =
    viewedDestinations.filter(
        item => String(item) !== String(id)
    );

// Add current destination at the beginning
viewedDestinations.unshift(id);

// Keep only latest 6 viewed destinations
viewedDestinations =
    viewedDestinations.slice(0, 6);

// Save to localStorage
localStorage.setItem(
    "viewedDestinations",
    JSON.stringify(viewedDestinations)
);

// --------------------
// Image
// --------------------

if(!destination){
  console.error("Destination not found:",id);
  console.log("Available destination IDs:",Object.keys(destinations));

  throw new Error(
    `DEstination "${id}" does not exist in destination.js`
  );
}
document.getElementById("destinationImage").src = destination.image;

document.getElementById("destinationImage").alt = destination.title;

document.getElementById("imageTitle").textContent =
  destination.title;

// --------------------
// Main Information
// --------------------
document.getElementById("destinationName").textContent =
  destination.title;

document.getElementById("destinationLocation").textContent =
  destination.location;

document.getElementById("destinationCategory").textContent =
  destination.category;

document.getElementById("destinationDescription").textContent =
  destination.description;

// --------------------
// Highlights
// --------------------
const highlightList = document.getElementById("highlights");

highlightList.innerHTML = "";

destination.highlights.forEach((item) => {

  const li = document.createElement("li");

  li.className =
    "flex items-center gap-3";

  li.innerHTML = `
    <span class="w-2 h-2 bg-emerald-600 rounded-full"></span>
    <span>${item}</span>
  `;

  highlightList.appendChild(li);

});

// --------------------
// Travel Information
// --------------------
document.getElementById("bestTime").textContent =
  destination.travelInfo.bestTime;

document.getElementById("entryFee").textContent =
  destination.travelInfo.entry;

document.getElementById("duration").textContent =
  destination.travelInfo.duration;

// Agar weather nahi diya to timing show kare
document.getElementById("weather").textContent =
  destination.travelInfo.weather ??
  destination.travelInfo.timing;



  // ==========================================
// DYNAMIC DESTINATION ACTIONS
// ==========================================

const favoriteBtn = document.getElementById("favoriteBtn");
const planBtn = document.getElementById("planBtn");
const saveBtn = document.getElementById("saveBtn");


// ------------------------------------------
// FAVORITE
// ------------------------------------------

if (favoriteBtn) {

    favoriteBtn.addEventListener("click", () => {

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        const alreadyFavorite = favorites.includes(id);

        if (alreadyFavorite) {

            favorites = favorites.filter(item => item !== id);

            favoriteBtn.classList.remove(
                "bg-rose-500",
                "text-white"
            );

            favoriteBtn.classList.add(
                "bg-white/90",
                "text-rose-500"
            );

            favoriteBtn.title = "Add to Favorites";

        } else {

            favorites.push(id);

            favoriteBtn.classList.remove(
                "bg-white/90",
                "text-rose-500"
            );

            favoriteBtn.classList.add(
                "bg-rose-500",
                "text-white"
            );

            favoriteBtn.title = "Remove from Favorites";
        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

    });
}


// ------------------------------------------
// PLAN TRIP
// ------------------------------------------

if (planBtn) {

    planBtn.addEventListener("click", () => {

        let plannedTrips =
            JSON.parse(localStorage.getItem("plannedTrips")) || [];

        const alreadyPlanned =
            plannedTrips.includes(id);

        if (alreadyPlanned) {

            plannedTrips =
                plannedTrips.filter(item => item !== id);

            planBtn.classList.remove(
                "bg-emerald-600",
                "text-white"
            );

            planBtn.classList.add(
                "bg-white/90",
                "text-emerald-600"
            );

            planBtn.title = "Plan this Trip";

        } else {

            plannedTrips.push(id);

            planBtn.classList.remove(
                "bg-white/90",
                "text-emerald-600"
            );

            planBtn.classList.add(
                "bg-emerald-600",
                "text-white"
            );

            planBtn.title = "Remove from Planned Trips";
        }

        localStorage.setItem(
            "plannedTrips",
            JSON.stringify(plannedTrips)
        );

    });
}


// ------------------------------------------
// SAVE DESTINATION
// ------------------------------------------

if (saveBtn) {

    saveBtn.addEventListener("click", () => {

        let savedDestinations =
            JSON.parse(localStorage.getItem("savedDestinations")) || [];

        const alreadySaved =
            savedDestinations.includes(id);

        if (alreadySaved) {

            savedDestinations =
                savedDestinations.filter(item => item !== id);

            saveBtn.classList.remove(
                "bg-blue-600",
                "text-white"
            );

            saveBtn.classList.add(
                "bg-white/90",
                "text-blue-600"
            );

            saveBtn.title = "Save Destination";

        } else {

            savedDestinations.push(id);

            saveBtn.classList.remove(
                "bg-white/90",
                "text-blue-600"
            );

            saveBtn.classList.add(
                "bg-blue-600",
                "text-white"
            );

            saveBtn.title = "Remove Saved Destination";
        }

        localStorage.setItem(
            "savedDestinations",
            JSON.stringify(savedDestinations)
        );

    });
}



// ==========================================
// RESTORE SAVED STATES
// ==========================================

const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

const plannedTrips =
    JSON.parse(localStorage.getItem("plannedTrips")) || [];

const savedDestinations =
    JSON.parse(localStorage.getItem("savedDestinations")) || [];


// Restore Favorite
if (favoriteBtn && favorites.includes(id)) {

    favoriteBtn.classList.remove(
        "bg-white/90",
        "text-rose-500"
    );

    favoriteBtn.classList.add(
        "bg-rose-500",
        "text-white"
    );

    favoriteBtn.title = "Remove from Favorites";
}


// Restore Planned Trip
if (planBtn && plannedTrips.includes(id)) {

    planBtn.classList.remove(
        "bg-white/90",
        "text-emerald-600"
    );

    planBtn.classList.add(
        "bg-emerald-600",
        "text-white"
    );

    planBtn.title = "Remove from Planned Trips";
}


// Restore Saved Destination
if (saveBtn && savedDestinations.includes(id)) {

    saveBtn.classList.remove(
        "bg-white/90",
        "text-blue-600"
    );

    saveBtn.classList.add(
        "bg-blue-600",
        "text-white"
    );

    saveBtn.title = "Remove Saved Destination";
}
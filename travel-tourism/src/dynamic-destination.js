import { destinations } from "./destination.js";

// Take Destination ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const destination = destinations[id];  


// --------------------
// Image
// --------------------
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
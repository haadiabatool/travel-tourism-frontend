import { destinations } from "./destination.js";

// Container
const container = document.getElementById("destinationCards");

// Generate Cards
Object.entries(destinations).forEach(([id, place]) => {

    const card = `

    <div
    class="destination-card group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-500 flex flex-col"

    data-search="${place.title.toLowerCase()} ${place.location.toLowerCase()} ${place.category.toLowerCase()} ${place.description.toLowerCase()}">

        <!-- Image -->
        <div class="relative overflow-hidden aspect-[4/3]">

            <img
            src="${place.image}"
            alt="${place.title}"
            class="w-full h-full object-cover transition duration-700 group-hover:scale-110">

            <div
            class="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs uppercase tracking-wider">

                ${place.category}

            </div>

        </div>

        <!-- Content -->
        <div class="p-5 flex flex-col flex-1">

            <h2 class="text-xl font-bold text-neutral-800 mb-2">
                ${place.title}
            </h2>

            <p class="text-sm text-emerald-700 font-semibold">
                📍 ${place.location}
            </p>

            <p class="mt-4 text-sm text-neutral-600 line-clamp-3 flex-1">
                ${place.description}
            </p>

            <button
            onclick="window.location.href='explore-destination.html?id=${id}'"

            class="mt-6 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-full py-3 transition font-semibold">

                Explore Destination →

            </button>

        </div>

    </div>

    `;

    container.innerHTML += card;

});

// ----------------------
// SEARCH
// ----------------------

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const value = searchInput.value.toLowerCase().trim();

        const cards = document.querySelectorAll(".destination-card");

        cards.forEach(card => {

            const searchText = card.dataset.search;

            if (searchText.includes(value)) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

}
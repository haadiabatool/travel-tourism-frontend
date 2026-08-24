import "./style.css";

import { services } from "./services-data.js";

// ==========================================
// GET SELECTED DESTINATION FROM PLANNED TRIP
// ==========================================

const urlParams = new URLSearchParams(window.location.search);

const selectedDestination = urlParams.get("destination");

// ==================================================
// DOM ELEMENTS
// ==================================================

const servicesGrid =
    document.getElementById("servicesGrid");

const serviceCount =
    document.getElementById("serviceCount");

const noServices =
    document.getElementById("noServices");

const searchInput =
    document.getElementById("serviceSearch");

const destinationFilter =
    document.getElementById("destinationFilter");

const categoryButtons =
    document.querySelectorAll(".category-btn");


// ==================================================
// CURRENT FILTER
// ==================================================

let currentCategory = "all";


// ==================================================
// POPULATE DESTINATION FILTER
// ==================================================

function populateDestinations() {

    if (!destinationFilter) {
        return;
    }


    const destinations =
        [...new Set(
            services.map(
                service => service.destination
            )
        )];


    destinations
        .sort()
        .forEach(destination => {

            const option =
                document.createElement("option");

            option.value =
                destination;

            option.textContent =
                destination;

            destinationFilter.appendChild(
                option
            );

        });

}


// ==================================================
// CREATE SERVICE CARD
// ==================================================

function createServiceCard(service) {

    return `

        <article
            class="
                bg-white
                rounded-2xl
                overflow-hidden
                border
                border-gray-100
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
            "
        >

            <!-- IMAGE -->

            <div
                class="
                    relative
                    h-52
                    overflow-hidden
                    bg-gray-100
                "
            >

                <img
                    src="${service.image}"
                    alt="${service.name}"
                    class="
                        w-full
                        h-full
                        object-cover
                        hover:scale-105
                        transition-transform
                        duration-500
                    "
                >


                <!-- CATEGORY -->

                <span
                    class="
                        absolute
                        top-4
                        left-4
                        bg-white/90
                        backdrop-blur-sm
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-bold
                        text-emerald-700
                    "
                >
                    ${getCategoryIcon(service.category)}
                    ${service.category}
                </span>


                <!-- RATING -->

                <span
                    class="
                        absolute
                        top-4
                        right-4
                        bg-black/60
                        text-white
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-semibold
                    "
                >
                    ⭐ ${service.rating}
                </span>

            </div>


            <!-- CONTENT -->

            <div class="p-5">


                <!-- NAME -->

                <h3
                    class="
                        text-xl
                        font-bold
                        text-gray-800
                        mb-2
                    "
                >
                    ${service.name}
                </h3>


                <!-- LOCATION -->

                <p
                    class="
                        text-sm
                        text-gray-500
                        mb-4
                    "
                >
                    📍 ${service.location}
                </p>


                <!-- DESCRIPTION -->

                <p
                    class="
                        text-sm
                        text-gray-600
                        leading-relaxed
                        mb-5
                    "
                >
                    ${service.description}
                </p>


                <!-- PRICE -->

                <div
                    class="
                        flex
                        items-end
                        justify-between
                        mb-5
                    "
                >

                    <div>

                        <p
                            class="
                                text-xs
                                text-gray-400
                                font-semibold
                            "
                        >
                            Starting from
                        </p>

                        <p
                            class="
                                text-2xl
                                font-bold
                                text-emerald-600
                            "
                        >
                            $${service.price}
                        </p>

                    </div>

                    <p
                        class="
                            text-xs
                            text-gray-400
                        "
                    >
                        ${service.priceUnit}
                    </p>

                </div>


                <!-- BUTTONS -->

                <div
                    class="
                        flex
                        gap-3
                    "
                >

                    <button
                        type="button"
                        onclick="viewService('${service.id}')"
                        class="
                            flex-1
                            border
                            border-emerald-600
                            text-emerald-600
                            hover:bg-emerald-50
                            py-2.5
                            rounded-xl
                            font-semibold
                            text-sm
                            transition
                        "
                    >
                        View Details
                    </button>


                    <button
                        type="button"
                        onclick="bookService('${service.id}')"
                        class="
                            flex-1
                            bg-emerald-600
                            hover:bg-emerald-700
                            text-white
                            py-2.5
                            rounded-xl
                            font-semibold
                            text-sm
                            transition
                        "
                    >
                        Book Now
                    </button>

                </div>

            </div>

        </article>

    `;

}


// ==================================================
// CATEGORY ICON
// ==================================================

function getCategoryIcon(category) {

    const icons = {

        "Hotel": "🏨",

        "Transportation": "🚐",

        "Tour Package": "🗺️",

        "Activity": "🏔️",

        "Restaurant": "🍽️"

    };


    return icons[category] || "✨";

}


// ==================================================
// FILTER SERVICES
// ==================================================

function filterServices() {

    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const destinationValue =
        destinationFilter
            ? destinationFilter.value
            : "all";


    const filteredServices =
        services.filter(service => {


            // CATEGORY

            const categoryMatch =
                currentCategory === "all" ||
                service.category ===
                    currentCategory;


            // DESTINATION

            const destinationMatch =
                destinationValue === "all" ||
                service.destination ===
                    destinationValue;


            // SEARCH

            const searchMatch =
                !searchValue ||

                service.name
                    .toLowerCase()
                    .includes(searchValue) ||

                service.location
                    .toLowerCase()
                    .includes(searchValue) ||

                service.destination
                    .toLowerCase()
                    .includes(searchValue) ||

                service.category
                    .toLowerCase()
                    .includes(searchValue);


            return (
                categoryMatch &&
                destinationMatch &&
                searchMatch
            );

        });


    renderServices(filteredServices);

}


// ==================================================
// RENDER SERVICES
// ==================================================

function renderServices(serviceList) {

    if (!servicesGrid) {
        return;
    }


    servicesGrid.innerHTML = "";


    if (serviceCount) {

        serviceCount.textContent =
            `${serviceList.length} ${
                serviceList.length === 1
                    ? "service"
                    : "services"
            }`;

    }


    // NO RESULTS

    if (serviceList.length === 0) {

        if (noServices) {

            noServices.classList.remove(
                "hidden"
            );

        }

        return;
    }


    if (noServices) {

        noServices.classList.add(
            "hidden"
        );

    }


    serviceList.forEach(service => {

        servicesGrid.innerHTML +=
            createServiceCard(service);

    });

}


// ==================================================
// CATEGORY BUTTONS
// ==================================================

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentCategory =
                button.dataset.category;


            // Remove active style

            categoryButtons.forEach(
                btn => {

                    btn.classList.remove(
                        "active-category"
                    );

                }
            );


            // Add active style

            button.classList.add(
                "active-category"
            );


            filterServices();

        }
    );

});


// ==================================================
// SEARCH
// ==================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterServices
    );

}


// ==================================================
// DESTINATION FILTER
// ==================================================

if (destinationFilter) {

    destinationFilter.addEventListener(
        "change",
        filterServices
    );

}


// ==================================================
// VIEW SERVICE
// ==================================================

window.viewService = function(serviceId) {

    const service =
        services.find(
            item =>
                item.id === serviceId
        );


    if (!service) {
        return;
    }


    localStorage.setItem(
        "selectedService",
        JSON.stringify(service)
    );


    window.location.href =
        "service-details.html";

};


// ==================================================
// BOOK SERVICE
// ==================================================

window.bookService = function(serviceId) {

    const service =
        services.find(
            item =>
                item.id === serviceId
        );

    if (!service) {
        return;
    }

    localStorage.setItem(
        "selectedService",
        JSON.stringify(service)
    );


    // URL se current trip ID lo
    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const tripId =
        urlParams.get("tripId");


    // Booking page par tripId bhi bhejo
    window.location.href =
        tripId
            ? `booking.html?tripId=${tripId}`
            : "booking.html";

};


// ==================================================
// INITIALIZE
// ==================================================

populateDestinations();

// ==========================================
// AUTO FILTER DESTINATION FROM PLANNED TRIP
// ==========================================

if (selectedDestination && destinationFilter) {

    // Check karega ke URL wali destination dropdown mein موجود hai
    const destinationExists =
        [...destinationFilter.options]
            .some(
                option =>
                    option.value === selectedDestination
            );


    // Agar destination exists karti hai to automatically select karo
    if (destinationExists) {

        destinationFilter.value =
            selectedDestination;

    }

}


// Render services according to selected destination
filterServices();

import './style.css'
import { destinations } from "./destination.js";


// ==================================================
// GET DATA FROM LOCAL STORAGE
// ==================================================

let profile =
    JSON.parse(
        localStorage.getItem("natureNestProfile")
    ) || null;


let favorites =
    JSON.parse(
        localStorage.getItem("favorites")
    ) || [];


let plannedTrips =
    JSON.parse(
        localStorage.getItem("plannedTrips")
    ) || [];


let savedDestinations =
    JSON.parse(
        localStorage.getItem("savedDestinations")
    ) || [];


let viewedDestinations =
    JSON.parse(
        localStorage.getItem("viewedDestinations")
    ) || [];


// ==================================================
// DOM - PROFILE
// ==================================================

const dashboardUserName =
    document.getElementById(
        "dashboardUserName"
    );


// ==================================================
// DOM - COUNTS
// ==================================================

const dashboardFavoriteCount =
    document.getElementById(
        "dashboardFavoriteCount"
    );


const dashboardPlannedCount =
    document.getElementById(
        "dashboardPlannedCount"
    );


const dashboardSavedCount =
    document.getElementById(
        "dashboardSavedCount"
    );


// ==================================================
// DOM - DESTINATION GRIDS
// ==================================================

const viewedGrid =
    document.getElementById(
        "viewedDestinationsGrid"
    );


const favoriteGrid =
    document.getElementById(
        "favoriteDestinationsGrid"
    );


const popularGrid =
    document.getElementById(
        "popularDestinationsGrid"
    );


// ==================================================
// DOM - EMPTY STATES
// ==================================================

const noViewed =
    document.getElementById(
        "noViewedDestinations"
    );


const noFavorites =
    document.getElementById(
        "noFavoriteDestinations"
    );


// ==================================================
// REFRESH DATA FROM LOCAL STORAGE
// ==================================================

function refreshDashboardData() {

    // ------------------------------------------
    // PROFILE
    // ------------------------------------------

    profile =
        JSON.parse(
            localStorage.getItem(
                "natureNestProfile"
            )
        ) || null;


    // ------------------------------------------
    // FAVORITES
    // ------------------------------------------

    favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites"
            )
        ) || [];


    // ------------------------------------------
    // PLANNED TRIPS
    // ------------------------------------------

    plannedTrips =
    JSON.parse(
        localStorage.getItem(
            "natureNestTrips"
        )
    ) || [];


    // ------------------------------------------
    // SAVED DESTINATIONS
    // ------------------------------------------

    savedDestinations =
        JSON.parse(
            localStorage.getItem(
                "savedDestinations"
            )
        ) || [];


    // ------------------------------------------
    // VIEWED DESTINATIONS
    // ------------------------------------------

    viewedDestinations =
        JSON.parse(
            localStorage.getItem(
                "viewedDestinations"
            )
        ) || [];

}


// ==================================================
// GET DESTINATION
// ==================================================

function getDestination(id) {

    return destinations[id];

}


// ==================================================
// PROFILE
// ==================================================

function renderProfile() {

    if (!dashboardUserName) {
        return;
    }


    if (profile?.name) {

        dashboardUserName.textContent =
            profile.name;

    } else {

        dashboardUserName.textContent =
            "Nature Explorer";

    }

}


// ==================================================
// COUNTS
// ==================================================

function renderCounts() {

    // ------------------------------------------
    // FAVORITES
    // ------------------------------------------

    if (dashboardFavoriteCount) {

        dashboardFavoriteCount.textContent =
            favorites.length;

    }


    // ------------------------------------------
    // PLANNED TRIPS
    // ------------------------------------------

    if (dashboardPlannedCount) {

        dashboardPlannedCount.textContent =
            plannedTrips.length;

    }


    // ------------------------------------------
    // SAVED DESTINATIONS
    // ------------------------------------------

    if (dashboardSavedCount) {

        dashboardSavedCount.textContent =
            savedDestinations.length;

    }

}


// ==================================================
// CREATE DESTINATION CARD
// ==================================================

function createDestinationCard(
    destination,
    id,
    badge = ""
) {

    if (!destination) {

        return "";

    }


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
                hover:-translate-y-1
                transition-all
                duration-300
                flex
                flex-col
            "
        >

            <!-- ================================= -->
            <!-- IMAGE -->
            <!-- ================================= -->

            <div
                class="
                    relative
                    h-56
                    overflow-hidden
                "
            >

                <img
                    src="${destination.image || ""}"
                    alt="${
                        destination.title ||
                        "Destination"
                    }"
                    class="
                        w-full
                        h-full
                        object-cover
                        hover:scale-105
                        transition-transform
                        duration-500
                    "
                >


                ${
                    badge
                        ?
                        `
                        <span
                            class="
                                absolute
                                top-3
                                left-3
                                px-3
                                py-1
                                rounded-full
                                bg-white/90
                                backdrop-blur
                                text-xs
                                font-semibold
                                text-gray-700
                            "
                        >
                            ${badge}
                        </span>
                        `
                        :
                        ""
                }

            </div>


            <!-- ================================= -->
            <!-- CONTENT -->
            <!-- ================================= -->

            <div
                class="
                    p-5
                    flex
                    flex-col
                    flex-1
                "
            >

                <!-- LOCATION -->

                <p
                    class="
                        text-xs
                        font-semibold
                        text-emerald-600
                        uppercase
                        tracking-wide
                        mb-1
                    "
                >
                    ${
                        destination.location ||
                        "Nature Destination"
                    }
                </p>


                <!-- TITLE -->

                <h3
                    class="
                        text-xl
                        font-bold
                        text-gray-800
                        mb-2
                    "
                >
                    ${
                        destination.title ||
                        "Untitled Destination"
                    }
                </h3>


                <!-- CATEGORY -->

                ${
                    destination.category
                        ?
                        `
                        <span
                            class="
                                w-fit
                                bg-gray-100
                                text-gray-600
                                text-xs
                                font-semibold
                                px-3
                                py-1
                                rounded-full
                                mb-3
                            "
                        >
                            ${destination.category}
                        </span>
                        `
                        :
                        ""
                }


                <!-- DESCRIPTION -->

                <p
                    class="
                        text-sm
                        text-gray-500
                        leading-relaxed
                        line-clamp-2
                        mb-5
                    "
                >
                    ${
                        destination.description ||
                        "Discover this beautiful destination."
                    }
                </p>


                <!-- BUTTON -->

                <button
                    type="button"
                    onclick="
                        window.location.href=
                        'dynamic-destination.html?id=${encodeURIComponent(id)}'
                    "
                    class="
                        mt-auto
                        w-full
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
                    Explore Destination
                </button>

            </div>

        </article>

    `;

}


// ==================================================
// VIEWED DESTINATIONS
// ==================================================

function renderViewedDestinations() {

    if (!viewedGrid) {

        return;

    }


    viewedGrid.innerHTML = "";


    // ------------------------------------------
    // EMPTY STATE
    // ------------------------------------------

    if (
        !Array.isArray(viewedDestinations) ||
        viewedDestinations.length === 0
    ) {

        if (noViewed) {

            noViewed.classList.remove(
                "hidden"
            );

        }

        return;

    }


    // ------------------------------------------
    // HIDE EMPTY STATE
    // ------------------------------------------

    if (noViewed) {

        noViewed.classList.add(
            "hidden"
        );

    }


    // ------------------------------------------
    // LATEST 3
    // ------------------------------------------

    const latestViewed =
        viewedDestinations
            .slice(0, 3);


    latestViewed.forEach(
        (id) => {

            const destination =
                getDestination(id);


            if (!destination) {

                return;

            }


            viewedGrid.innerHTML +=
                createDestinationCard(
                    destination,
                    id,
                    "Recently Viewed"
                );

        }
    );

}


// ==================================================
// FAVORITE DESTINATIONS
// ==================================================

function renderFavoriteDestinations() {

    if (!favoriteGrid) {

        return;

    }


    favoriteGrid.innerHTML = "";


    // ------------------------------------------
    // EMPTY STATE
    // ------------------------------------------

    if (
        !Array.isArray(favorites) ||
        favorites.length === 0
    ) {

        if (noFavorites) {

            noFavorites.classList.remove(
                "hidden"
            );

        }

        return;

    }


    // ------------------------------------------
    // HIDE EMPTY STATE
    // ------------------------------------------

    if (noFavorites) {

        noFavorites.classList.add(
            "hidden"
        );

    }


    // ------------------------------------------
    // LATEST 3 FAVORITES
    // ------------------------------------------

    favorites
        .slice()
        .reverse()
        .slice(0, 3)
        .forEach(
            (id) => {

                const destination =
                    getDestination(id);


                if (!destination) {

                    return;

                }


                favoriteGrid.innerHTML +=
                    createDestinationCard(
                        destination,
                        id,
                        "❤️ Favorite"
                    );

            }
        );

}


// ==================================================
// POPULAR DESTINATIONS
// ==================================================

function getPopularDestinations() {

    /*
        Popularity Score

        Planned Trip  = +4
        Favorite      = +3
        Saved         = +2
        Viewed        = +1
    */


    const popularity = {};


    // ------------------------------------------
    // INITIALIZE ALL DESTINATIONS
    // ------------------------------------------

    Object.keys(destinations)
        .forEach(
            (id) => {

                popularity[id] = 0;

            }
        );


    // ------------------------------------------
    // FAVORITES
    // ------------------------------------------

    favorites.forEach(
        (id) => {

            if (
                popularity[id] !== undefined
            ) {

                popularity[id] += 3;

            }

        }
    );


    // ------------------------------------------
    // PLANNED TRIPS
    // ------------------------------------------

    plannedTrips.forEach(
        (id) => {

            if (
                popularity[id] !== undefined
            ) {

                popularity[id] += 4;

            }

        }
    );


    // ------------------------------------------
    // SAVED DESTINATIONS
    // ------------------------------------------

    savedDestinations.forEach(
        (id) => {

            if (
                popularity[id] !== undefined
            ) {

                popularity[id] += 2;

            }

        }
    );


    // ------------------------------------------
    // VIEWED DESTINATIONS
    // ------------------------------------------

    viewedDestinations.forEach(
        (id) => {

            if (
                popularity[id] !== undefined
            ) {

                popularity[id] += 1;

            }

        }
    );


    // ------------------------------------------
    // SORT
    // ------------------------------------------

    return Object.keys(popularity)
        .sort(
            (a, b) =>
                popularity[b] -
                popularity[a]
        );

}


// ==================================================
// RENDER POPULAR DESTINATIONS
// ==================================================

function renderPopularDestinations() {

    if (!popularGrid) {

        return;

    }


    popularGrid.innerHTML = "";


    // ------------------------------------------
    // GET TOP 6
    // ------------------------------------------

    const popular =
        getPopularDestinations()
            .slice(0, 6);


    // ------------------------------------------
    // RENDER
    // ------------------------------------------

    popular.forEach(
        (id) => {

            const destination =
                getDestination(id);


            if (!destination) {

                return;

            }


            popularGrid.innerHTML +=
                createDestinationCard(
                    destination,
                    id,
                    "🔥 Popular"
                );

        }
    );

}


// ==================================================
// OPTIONAL: REFRESH WHEN USER RETURNS TO TAB
// ==================================================

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            initializeDashboard();

        }

    }
);


// ==================================================
// INITIALIZE DASHBOARD
// ==================================================

function initializeDashboard() {

    // ------------------------------------------
    // GET LATEST LOCAL STORAGE DATA
    // ------------------------------------------

    refreshDashboardData();


    // ------------------------------------------
    // PROFILE
    // ------------------------------------------

    renderProfile();


    // ------------------------------------------
    // COUNTS
    // ------------------------------------------

    renderCounts();


    // ------------------------------------------
    // VIEWED
    // ------------------------------------------

    renderViewedDestinations();


    // ------------------------------------------
    // FAVORITES
    // ------------------------------------------

    renderFavoriteDestinations();


    // ------------------------------------------
    // POPULAR
    // ------------------------------------------

    renderPopularDestinations();

}


// ==================================================
// START DASHBOARD
// ==================================================

initializeDashboard();
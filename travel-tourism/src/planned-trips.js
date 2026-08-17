import "./style.css";

// ==========================================
// GET COMPLETE TRIPS
// ==========================================

let trips =
JSON.parse(
localStorage.getItem("natureNestTrips")
) || [];

// ==========================================
// DOM
// ==========================================

const grid =
document.getElementById(
"plannedTripsGrid"
);

const empty =
document.getElementById(
"emptyPlannedTrips"
);

// ==========================================
// CREATE COMPLETE TRIP CARD
// ==========================================

function createTripCard(trip) {

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

        <!-- HEADER -->

        <div
            class="
                bg-emerald-600
                text-white
                p-5
            "
        >

            <div
                class="
                    flex
                    items-start
                    justify-between
                    gap-3
                "
            >

                <div>

                    <p
                        class="
                            text-sm
                            text-emerald-100
                            mb-1
                        "
                    >
                        ✈️ Planned Trip
                    </p>

                    <h2
                        class="
                            text-2xl
                            font-bold
                        "
                    >
                        ${trip.tripName || "My Trip"}
                    </h2>

                </div>


                <span
                    class="
                        bg-white/20
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        whitespace-nowrap
                    "
                >
                    ${trip.travelers || 1}
                    Traveler${trip.travelers == 1 ? "" : "s"}
                </span>

            </div>

        </div>


        <!-- TRIP INFORMATION -->

        <div class="p-5">

            <!-- DESTINATION -->

            <div class="mb-5">

                <p
                    class="
                        text-xs
                        uppercase
                        tracking-wide
                        font-semibold
                        text-gray-400
                        mb-1
                    "
                >
                    Destination
                </p>

                <p
                    class="
                        text-lg
                        font-bold
                        text-gray-800
                    "
                >
                    📍
                    ${trip.destination || "Destination"}
                </p>

            </div>


            <!-- DATES -->

            <div
                class="
                    grid
                    grid-cols-2
                    gap-4
                    mb-5
                "
            >

                <div
                    class="
                        bg-gray-50
                        rounded-xl
                        p-3
                    "
                >

                    <p
                        class="
                            text-xs
                            text-gray-400
                            font-semibold
                            mb-1
                        "
                    >
                        Starting Date
                    </p>

                    <p
                        class="
                            text-sm
                            font-bold
                            text-gray-700
                        "
                    >
                        📅
                        ${trip.startDate || "Not set"}
                    </p>

                </div>


                <div
                    class="
                        bg-gray-50
                        rounded-xl
                        p-3
                    "
                >

                    <p
                        class="
                            text-xs
                            text-gray-400
                            font-semibold
                            mb-1
                        "
                    >
                        Ending Date
                    </p>

                    <p
                        class="
                            text-sm
                            font-bold
                            text-gray-700
                        "
                    >
                        📅
                        ${trip.endDate || "Not set"}
                    </p>

                </div>

            </div>


            <!-- TRAVELERS -->

            <div
                class="
                    flex
                    items-center
                    gap-3
                    mb-5
                    p-3
                    bg-emerald-50
                    rounded-xl
                "
            >

                <span class="text-xl">
                    👥
                </span>

                <div>

                    <p
                        class="
                            text-xs
                            text-gray-500
                        "
                    >
                        Number of Travelers
                    </p>

                    <p
                        class="
                            font-bold
                            text-emerald-700
                        "
                    >
                        ${trip.travelers || 1}
                    </p>

                </div>

            </div>


            <!-- DESCRIPTION -->

            <div class="mb-5">

                <p
                    class="
                        text-xs
                        uppercase
                        tracking-wide
                        font-semibold
                        text-gray-400
                        mb-2
                    "
                >
                    Trip Description
                </p>

                <p
                    class="
                        text-sm
                        text-gray-600
                        leading-relaxed
                    "
                >
                    ${
                        trip.description ||
                        "No trip description added."
                    }
                </p>

            </div>


            <!-- ACTIVITIES -->

            <div
                class="
                    mb-5
                    bg-blue-50
                    rounded-xl
                    p-4
                "
            >

                <div
                    class="
                        flex
                        items-center
                        justify-between
                        mb-2
                    "
                >

                    <p
                        class="
                            text-sm
                            font-bold
                            text-gray-800
                        "
                    >
                        🗓️ Itinerary
                    </p>

                    <span
                        class="
                            text-xs
                            text-blue-600
                            font-semibold
                        "
                    >
                        ${
                            trip.activities?.length || 0
                        }
                        Activities
                    </span>

                </div>


                ${
                    trip.activities &&
                    trip.activities.length > 0

                    ?

                    `
                        <p
                            class="
                                text-sm
                                text-gray-600
                            "
                        >
                            Your planned activities
                            are ready to view.
                        </p>
                    `

                    :

                    `
                        <p
                            class="
                                text-sm
                                text-gray-500
                            "
                        >
                            No activities added yet.
                        </p>
                    `
                }

            </div>


            <!-- ACTIONS -->

            <div
                class="
                    flex
                    gap-3
                "
            >

                <!-- VIEW TRIP -->

                <button
                    type="button"
                    onclick="
                        viewTrip('${trip.id}')
                    "
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
                    View Trip
                </button>


                <!-- REMOVE -->

                <button
                    type="button"
                    onclick="
                        removeTrip('${trip.id}')
                    "
                    class="
                        px-4
                        py-2.5
                        rounded-xl
                        bg-gray-100
                        hover:bg-red-100
                        text-gray-600
                        hover:text-red-600
                        font-semibold
                        text-sm
                        transition
                    "
                >
                    Remove
                </button>

            </div>

        </div>

    </article>

    `;

}

// ==========================================
// RENDER TRIPS
// ==========================================

function renderTrips() {

    if (!grid || !empty) {
        return;
    }


    grid.innerHTML = "";


    // No trips

    if (trips.length === 0) {

        empty.classList.remove(
            "hidden"
        );

        return;
    }


    empty.classList.add(
        "hidden"
    );


    // Render latest trips first

    trips
        .slice()
        .reverse()
        .forEach((trip) => {

            grid.innerHTML +=
                createTripCard(trip);

        });

}

// ==========================================
// VIEW TRIP
// ==========================================

window.viewTrip = function (tripId) {

    const trip =
        trips.find(
            item =>
                String(item.id) ===
                String(tripId)
        );

    if (!trip) {

        console.error(
            "Trip not found:",
            tripId
        );

        return;
    }

    // Save selected trip
    localStorage.setItem(
        "selectedTrip",
        JSON.stringify(trip)
    );

    // Open Trip Details page
    window.location.href =
        "trip-details.html";
};

// ==========================================
// VIEW ITINERARY
// ==========================================

window.viewItinerary = function (tripId) {

    const trip =
        trips.find(
            item =>
                String(item.id) ===
                String(tripId)
        );


    if (!trip) {

        console.error(
            "Trip not found:",
            tripId
        );

        return;
    }


    // Save selected trip

    localStorage.setItem(
        "selectedTrip",
        JSON.stringify(trip)
    );


    // Open itinerary page

    window.location.href =
        "itinerary.html";

};

// ==========================================
// REMOVE TRIP
// ==========================================

window.removeTrip = function (tripId) {

    const confirmRemove =
        confirm(
            "Are you sure you want to remove this trip?"
        );


    if (!confirmRemove) {
        return;
    }


    trips =
        trips.filter(
            trip =>
                String(trip.id) !==
                String(tripId)
        );


    localStorage.setItem(
        "natureNestTrips",
        JSON.stringify(trips)
    );


    renderTrips();

};

// ==========================================
// INITIALIZE
// ==========================================

renderTrips();
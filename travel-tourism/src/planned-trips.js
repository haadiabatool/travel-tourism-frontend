import "./style.css";

import { destinations } from "./destination.js";


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
// ADD TRIP ELEMENTS
// ==========================================

const addTripBtn =
    document.getElementById(
        "addTripBtn"
    );

const addTripModal =
    document.getElementById(
        "addTripModal"
    );

const closeModalBtn =
    document.getElementById(
        "closeModalBtn"
    );

const cancelAddTripBtn =
    document.getElementById(
        "cancelAddTripBtn"
    );

const addTripForm =
    document.getElementById(
        "addTripForm"
    );

const newTripName =
    document.getElementById(
        "newTripName"
    );

const newTripDestination =
    document.getElementById(
        "newTripDestination"
    );

const newStartDate =
    document.getElementById(
        "newStartDate"
    );

const newEndDate =
    document.getElementById(
        "newEndDate"
    );

const newTravelers =
    document.getElementById(
        "newTravelers"
    );

const newTripDescription =
    document.getElementById(
        "newTripDescription"
    );


// ==========================================
// ERROR ELEMENTS
// ==========================================

const newTripNameError =
    document.getElementById(
        "newTripNameError"
    );

const newDestinationError =
    document.getElementById(
        "newDestinationError"
    );

const newStartDateError =
    document.getElementById(
        "newStartDateError"
    );

const newEndDateError =
    document.getElementById(
        "newEndDateError"
    );

const newTravelersError =
    document.getElementById(
        "newTravelersError"
    );

const newDescriptionError =
    document.getElementById(
        "newDescriptionError"
    );


// ==========================================
// LOAD ALL 30 DESTINATIONS
// ==========================================

function loadDestinations() {

    if (!newTripDestination) {
        return;
    }


    newTripDestination.innerHTML = `
        <option value="">
            Select a destination
        </option>
    `;


    Object.entries(destinations).forEach(
        ([id, destination]) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value = id;


            option.textContent =
                destination.title;


            newTripDestination.appendChild(
                option
            );

        }
    );

}


loadDestinations();


// ==========================================
// OPEN ADD TRIP MODAL
// ==========================================

function openAddTripModal() {

    if (!addTripModal) {
        return;
    }


    addTripModal.classList.remove(
        "hidden"
    );

    addTripModal.classList.add(
        "flex"
    );


    document.body.classList.add(
        "overflow-hidden"
    );

}


// ==========================================
// CLOSE ADD TRIP MODAL
// ==========================================

function closeAddTripModal() {

    if (!addTripModal) {
        return;
    }


    addTripModal.classList.add(
        "hidden"
    );

    addTripModal.classList.remove(
        "flex"
    );


    document.body.classList.remove(
        "overflow-hidden"
    );

}


// ==========================================
// OPEN BUTTON
// ==========================================

if (addTripBtn) {

    addTripBtn.addEventListener(
        "click",
        openAddTripModal
    );

}


// ==========================================
// CLOSE BUTTON
// ==========================================

if (closeModalBtn) {

    closeModalBtn.addEventListener(
        "click",
        closeAddTripModal
    );

}


// ==========================================
// CANCEL BUTTON
// ==========================================

if (cancelAddTripBtn) {

    cancelAddTripBtn.addEventListener(
        "click",
        closeAddTripModal
    );

}


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

if (addTripModal) {

    addTripModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                addTripModal
            ) {

                closeAddTripModal();

            }

        }
    );

}


// ==========================================
// DATE SETTINGS
// ==========================================

const today =
    new Date()
        .toISOString()
        .split("T")[0];


if (newStartDate) {

    newStartDate.min =
        today;

}


if (newEndDate) {

    newEndDate.min =
        today;

}


if (
    newStartDate &&
    newEndDate
) {

    newStartDate.addEventListener(
        "change",
        () => {

            if (
                newStartDate.value
            ) {

                newEndDate.min =
                    newStartDate.value;

            }

        }
    );

}


// ==========================================
// ERROR FUNCTIONS
// ==========================================

function showError(
    element,
    message
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.classList.remove(
        "hidden"
    );

}


function clearError(
    element
) {

    if (!element) {
        return;
    }


    element.textContent =
        "";


    element.classList.add(
        "hidden"
    );

}


// ==========================================
// CLEAR ERRORS
// ==========================================

function clearAddTripErrors() {

    clearError(
        newTripNameError
    );

    clearError(
        newDestinationError
    );

    clearError(
        newStartDateError
    );

    clearError(
        newEndDateError
    );

    clearError(
        newTravelersError
    );

    clearError(
        newDescriptionError
    );

}


// ==========================================
// VALIDATE ADD TRIP FORM
// ==========================================

function validateAddTripForm() {

    clearAddTripErrors();


    let isValid = true;


    // ======================================
    // TRIP NAME
    // ======================================

    const name =
        newTripName.value.trim();


    if (!name) {

        showError(
            newTripNameError,
            "Please enter a trip name."
        );

        isValid = false;

    }
    else if (
        name.length < 3
    ) {

        showError(
            newTripNameError,
            "Trip name must be at least 3 characters."
        );

        isValid = false;

    }


    // ======================================
    // DESTINATION
    // ======================================

    const destinationId =
        newTripDestination.value;


    if (!destinationId) {

        showError(
            newDestinationError,
            "Please select a destination."
        );

        isValid = false;

    }


    // ======================================
    // START DATE
    // ======================================

    if (
        !newStartDate.value
    ) {

        showError(
            newStartDateError,
            "Please select a starting date."
        );

        isValid = false;

    }


    // ======================================
    // END DATE
    // ======================================

    if (
        !newEndDate.value
    ) {

        showError(
            newEndDateError,
            "Please select an ending date."
        );

        isValid = false;

    }


    // ======================================
    // DATE COMPARISON
    // ======================================

    if (
        newStartDate.value &&
        newEndDate.value
    ) {

        const start =
            new Date(
                newStartDate.value
            );


        const end =
            new Date(
                newEndDate.value
            );


        if (end < start) {

            showError(
                newEndDateError,
                "Ending date cannot be before starting date."
            );

            isValid = false;

        }

    }


    // ======================================
    // TRAVELERS
    // ======================================

    const travelerCount =
        Number(
            newTravelers.value
        );


    if (
        !newTravelers.value
    ) {

        showError(
            newTravelersError,
            "Please enter number of travelers."
        );

        isValid = false;

    }
    else if (
        travelerCount < 1 ||
        travelerCount > 50
    ) {

        showError(
            newTravelersError,
            "Travelers must be between 1 and 50."
        );

        isValid = false;

    }


    // ======================================
    // DESCRIPTION
    // ======================================

    const description =
        newTripDescription.value.trim();


    if (!description) {

        showError(
            newDescriptionError,
            "Please enter a trip description."
        );

        isValid = false;

    }
    else if (
        description.length < 10
    ) {

        showError(
            newDescriptionError,
            "Description must be at least 10 characters."
        );

        isValid = false;

    }


    return isValid;

}


// ==========================================
// CREATE NEW TRIP FROM PLANNED TRIPS
// ==========================================

if (addTripForm) {

    addTripForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            // ==================================
            // VALIDATE
            // ==================================

            if (
                !validateAddTripForm()
            ) {

                return;

            }


            // ==================================
            // SELECTED DESTINATION
            // ==================================

            const destinationId =
                newTripDestination.value;


            const selectedDestination =
                destinations[
                    destinationId
                ];


            if (!selectedDestination) {

                showError(
                    newDestinationError,
                    "Selected destination was not found."
                );

                return;

            }


            // ==================================
            // CREATE TRIP OBJECT
            // ==================================

            const trip = {

                id:
                    Date.now().toString(),

                tripName:
                    newTripName
                        .value
                        .trim(),

                destination:
                    selectedDestination.title,

                destinationId:
                    destinationId,

                startDate:
                    newStartDate.value,

                endDate:
                    newEndDate.value,

                travelers:
                    Number(
                        newTravelers.value
                    ),

                description:
                    newTripDescription
                        .value
                        .trim(),

                activities: [],

                createdAt:
                    new Date()
                        .toISOString()

            };


            // ==================================
            // ADD TO ARRAY
            // ==================================

            trips.push(
                trip
            );


            // ==================================
            // SAVE TO LOCAL STORAGE
            // ==================================

            localStorage.setItem(
                "natureNestTrips",
                JSON.stringify(
                    trips
                )
            );


            // ==================================
            // SAVE DESTINATION
            // ==================================

            let plannedDestinations =
                JSON.parse(
                    localStorage.getItem(
                        "plannedTrips"
                    )
                ) || [];


            if (
                !plannedDestinations.includes(
                    destinationId
                )
            ) {

                plannedDestinations.push(
                    destinationId
                );

            }


            localStorage.setItem(
                "plannedTrips",
                JSON.stringify(
                    plannedDestinations
                )
            );


            // ==================================
            // RESET FORM
            // ==================================

            addTripForm.reset();


            // ==================================
            // CLOSE MODAL
            // ==================================

            closeAddTripModal();


            // ==================================
            // RENDER AGAIN
            // ==================================

            renderTrips();


            // ==================================
            // SUCCESS
            // ==================================

            alert(
                "Trip created successfully!"
            );

        }
    );

}


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


    // ======================================
    // NO TRIPS
    // ======================================

    if (trips.length === 0) {

        empty.classList.remove(
            "hidden"
        );

        return;

    }


    empty.classList.add(
        "hidden"
    );


    // ======================================
    // LATEST TRIPS FIRST
    // ======================================

    trips
        .slice()
        .reverse()
        .forEach(
            (trip) => {

                grid.innerHTML +=
                    createTripCard(
                        trip
                    );

            }
        );

}


// ==========================================
// VIEW TRIP
// ==========================================

window.viewTrip =
    function (tripId) {

        const trip =
            trips.find(
                item =>
                    String(
                        item.id
                    ) ===
                    String(
                        tripId
                    )
            );


        if (!trip) {

            console.error(
                "Trip not found:",
                tripId
            );

            return;

        }


        localStorage.setItem(
            "selectedTrip",
            JSON.stringify(
                trip
            )
        );


        window.location.href =
            "trip-details.html";

    };


// ==========================================
// VIEW ITINERARY
// ==========================================

window.viewItinerary =
    function (tripId) {

        const trip =
            trips.find(
                item =>
                    String(
                        item.id
                    ) ===
                    String(
                        tripId
                    )
            );


        if (!trip) {

            console.error(
                "Trip not found:",
                tripId
            );

            return;

        }


        localStorage.setItem(
            "selectedTrip",
            JSON.stringify(
                trip
            )
        );


        window.location.href =
            "itinerary.html";

    };


// ==========================================
// REMOVE TRIP
// ==========================================

window.removeTrip =
    function (tripId) {

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
                    String(
                        trip.id
                    ) !==
                    String(
                        tripId
                    )
            );


        localStorage.setItem(
            "natureNestTrips",
            JSON.stringify(
                trips
            )
        );


        renderTrips();

    };


// ==========================================
// INITIALIZE
// ==========================================

renderTrips();
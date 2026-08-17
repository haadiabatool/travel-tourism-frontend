import { destinations } from "./destination.js";

// ==========================================
// GET DESTINATION FROM URL
// ==========================================

const params = new URLSearchParams(window.location.search);

const destinationId = params.get("id");

const currentDestination =
    destinations[destinationId] || null;


// ==========================================
// GET ELEMENTS
// ==========================================

const bookTripBtn =
    document.getElementById("bookTripBtn");

const tripModal =
    document.getElementById("tripModal");

const closeTripModal =
    document.getElementById("closeTripModal");

const cancelTripBtn =
    document.getElementById("cancelTripBtn");

const tripForm =
    document.getElementById("tripForm");


// ==========================================
// ITINERARY ELEMENTS
// ==========================================

const itinerarySection =
    document.getElementById("itinerarySection");

const itineraryDays =
    document.getElementById("itineraryDays");

const itineraryTitle =
    document.getElementById("itineraryTitle");

const closeItinerary =
    document.getElementById("closeItinerary");

const saveItineraryBtn =
    document.getElementById("saveItineraryBtn");


// ==========================================
// FORM ELEMENTS
// ==========================================

const tripName =
    document.getElementById("tripName");

const tripDestination =
    document.getElementById("tripDestination");

const startDate =
    document.getElementById("startDate");

const endDate =
    document.getElementById("endDate");

const travelers =
    document.getElementById("travelers");

const tripDescription =
    document.getElementById("tripDescription");


// ==========================================
// ERROR ELEMENTS
// ==========================================

const tripNameError =
    document.getElementById("tripNameError");

const destinationError =
    document.getElementById("destinationError");

const startDateError =
    document.getElementById("startDateError");

const endDateError =
    document.getElementById("endDateError");

const travelersError =
    document.getElementById("travelersError");

const descriptionError =
    document.getElementById("descriptionError");


// ==========================================
// SET CURRENT DESTINATION
// ==========================================

if (currentDestination && tripDestination) {

    tripDestination.value =
        currentDestination.title;

}


// ==========================================
// OPEN TRIP MODAL
// ==========================================

if (bookTripBtn && tripModal) {

    bookTripBtn.addEventListener("click", () => {

        tripModal.classList.remove("hidden");

        tripModal.classList.add("flex");

        document.body.classList.add("overflow-hidden");

    });

}


// ==========================================
// CLOSE TRIP MODAL
// ==========================================

function closeTripForm() {

    if (!tripModal) {
        return;
    }

    tripModal.classList.add("hidden");

    tripModal.classList.remove("flex");

    document.body.classList.remove("overflow-hidden");

}


// ==========================================
// CLOSE BUTTON
// ==========================================

if (closeTripModal) {

    closeTripModal.addEventListener(
        "click",
        closeTripForm
    );

}


// ==========================================
// CANCEL BUTTON
// ==========================================

if (cancelTripBtn) {

    cancelTripBtn.addEventListener(
        "click",
        closeTripForm
    );

}


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

if (tripModal) {

    tripModal.addEventListener(
        "click",
        (event) => {

            if (event.target === tripModal) {

                closeTripForm();

            }

        }
    );

}


// ==========================================
// DATE MINIMUM
// ==========================================

const today =
    new Date().toISOString().split("T")[0];

if (startDate) {

    startDate.min = today;

}

if (endDate) {

    endDate.min = today;

}


// ==========================================
// UPDATE END DATE MINIMUM
// ==========================================

if (startDate && endDate) {

    startDate.addEventListener(
        "change",
        () => {

            if (startDate.value) {

                endDate.min =
                    startDate.value;

            }

        }
    );

}


// ==========================================
// ERROR FUNCTIONS
// ==========================================

function showError(element, message) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.classList.remove("hidden");

}


function clearError(element) {

    if (!element) {
        return;
    }

    element.textContent = "";

    element.classList.add("hidden");

}


// ==========================================
// CLEAR ALL ERRORS
// ==========================================

function clearAllErrors() {

    clearError(tripNameError);

    clearError(destinationError);

    clearError(startDateError);

    clearError(endDateError);

    clearError(travelersError);

    clearError(descriptionError);

}


// ==========================================
// CALCULATE TRIP DAYS
// ==========================================

function calculateTripDays(start, end) {

    const startDateObj =
        new Date(start);

    const endDateObj =
        new Date(end);

    const difference =
        endDateObj - startDateObj;

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1;

    return days;

}


// ==========================================
// GENERATE DAY-BY-DAY ITINERARY
// ==========================================

function generateItinerary(trip) {

    if (!itineraryDays) {
        return;
    }

    itineraryDays.innerHTML = "";

    const totalDays =
        calculateTripDays(
            trip.startDate,
            trip.endDate
        );

    if (itineraryTitle) {

        itineraryTitle.textContent =
            `${trip.tripName} - Day by Day Plan`;

    }


    // ======================================
    // CREATE DAY CARDS
    // ======================================

    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const dayCard =
            document.createElement("div");


        dayCard.className =
            "border border-gray-200 rounded-2xl p-5 bg-gray-50";


        dayCard.innerHTML = `

            <!-- DAY HEADER -->

            <div
                class="flex items-center justify-between mb-5"
            >

                <h3
                    class="
                        text-xl
                        font-bold
                        text-gray-800
                    "
                >
                    Day ${day}
                </h3>


                <span
                    class="
                        text-sm
                        bg-emerald-100
                        text-emerald-700
                        px-3
                        py-1
                        rounded-full
                    "
                >
                    Day ${day}
                </span>

            </div>


            <!-- ACTIVITY NAME -->

            <div class="mb-4">

                <label
                    class="
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        mb-2
                    "
                >
                    Activity Name
                </label>

                <input
                    type="text"
                    placeholder="e.g. Visit Altit Fort"
                    class="
                        itinerary-activity
                        w-full
                        border
                        border-gray-300
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-emerald-500
                    "
                    data-day="${day}"
                >

            </div>


            <!-- LOCATION -->

            <div class="mb-4">

                <label
                    class="
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        mb-2
                    "
                >
                    Location
                </label>

                <input
                    type="text"
                    placeholder="e.g. Altit, Hunza"
                    class="
                        itinerary-location
                        w-full
                        border
                        border-gray-300
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-emerald-500
                    "
                    data-day="${day}"
                >

            </div>


            <!-- TIME -->

            <div class="mb-4">

                <label
                    class="
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        mb-2
                    "
                >
                    Time
                </label>

                <input
                    type="time"
                    class="
                        itinerary-time
                        w-full
                        border
                        border-gray-300
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-emerald-500
                    "
                    data-day="${day}"
                >

            </div>


            <!-- SHORT DESCRIPTION -->

            <div class="mb-4">

                <label
                    class="
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        mb-2
                    "
                >
                    Short Description
                </label>

                <textarea
                    rows="3"
                    placeholder="Describe your activity..."
                    class="
                        itinerary-description
                        w-full
                        border
                        border-gray-300
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        resize-none
                        focus:ring-2
                        focus:ring-emerald-500
                    "
                    data-day="${day}"
                ></textarea>

            </div>


            <!-- CATEGORY -->

            <div>

                <label
                    class="
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        mb-2
                    "
                >
                    Category
                </label>

                <select
                    class="
                        itinerary-category
                        w-full
                        border
                        border-gray-300
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-emerald-500
                    "
                    data-day="${day}"
                >

                    <option value="">
                        Select Category
                    </option>

                    <option value="Sightseeing">
                        Sightseeing
                    </option>

                    <option value="Food">
                        Food
                    </option>

                    <option value="Adventure">
                        Adventure
                    </option>

                    <option value="Shopping">
                        Shopping
                    </option>

                    <option value="Culture">
                        Culture
                    </option>

                    <option value="Entertainment">
                        Entertainment
                    </option>

                </select>

            </div>

        `;


        itineraryDays.appendChild(
            dayCard
        );

    }


    // ======================================
    // SHOW ITINERARY SECTION
    // ======================================

    if (itinerarySection) {

        itinerarySection.classList.remove(
            "hidden"
        );

        itinerarySection.classList.add(
            "flex"
        );

    }

    document.body.classList.add(
        "overflow-hidden"
    );

}


// ==========================================
// CLOSE ITINERARY
// ==========================================

function closeItinerarySection() {

    if (!itinerarySection) {
        return;
    }

    itinerarySection.classList.add("hidden");

    itinerarySection.classList.remove("flex");

    document.body.classList.remove(
        "overflow-hidden"
    );

}


// ==========================================
// CLOSE ITINERARY BUTTON
// ==========================================

if (closeItinerary) {

    closeItinerary.addEventListener(
        "click",
        closeItinerarySection
    );

}


// ==========================================
// FORM VALIDATION
// ==========================================

function validateTripForm() {

    clearAllErrors();

    let isValid = true;


    // --------------------------------------
    // Trip Name
    // --------------------------------------

    const name =
        tripName.value.trim();


    if (!name) {

        showError(
            tripNameError,
            "Please enter a trip name."
        );

        isValid = false;

    }
    else if (name.length < 3) {

        showError(
            tripNameError,
            "Trip name must be at least 3 characters."
        );

        isValid = false;

    }


    // --------------------------------------
    // Destination
    // --------------------------------------

    const destination =
        tripDestination.value.trim();


    if (!destination) {

        showError(
            destinationError,
            "Destination is required."
        );

        isValid = false;

    }


    // --------------------------------------
    // Starting Date
    // --------------------------------------

    if (!startDate.value) {

        showError(
            startDateError,
            "Please select a starting date."
        );

        isValid = false;

    }


    // --------------------------------------
    // Ending Date
    // --------------------------------------

    if (!endDate.value) {

        showError(
            endDateError,
            "Please select an ending date."
        );

        isValid = false;

    }


    // --------------------------------------
    // Date Comparison
    // --------------------------------------

    if (
        startDate.value &&
        endDate.value
    ) {

        const start =
            new Date(startDate.value);

        const end =
            new Date(endDate.value);


        if (end < start) {

            showError(
                endDateError,
                "Ending date cannot be before the starting date."
            );

            isValid = false;

        }

    }


    // --------------------------------------
    // Travelers
    // --------------------------------------

    const travelerCount =
        Number(travelers.value);


    if (!travelers.value) {

        showError(
            travelersError,
            "Please enter the number of travelers."
        );

        isValid = false;

    }
    else if (
        travelerCount < 1 ||
        travelerCount > 50
    ) {

        showError(
            travelersError,
            "Travelers must be between 1 and 50."
        );

        isValid = false;

    }


    // --------------------------------------
    // Description
    // --------------------------------------

    const description =
        tripDescription.value.trim();


    if (!description) {

        showError(
            descriptionError,
            "Please enter a trip description."
        );

        isValid = false;

    }
    else if (description.length < 10) {

        showError(
            descriptionError,
            "Description must be at least 10 characters."
        );

        isValid = false;

    }


    return isValid;

}


// ==========================================
// CREATE TRIP
// ==========================================

let currentTrip = null;


if (tripForm) {

    tripForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            // ==================================
            // VALIDATE FORM
            // ==================================

            if (!validateTripForm()) {

                return;

            }


            // ==================================
            // CREATE TRIP OBJECT
            // ==================================

            const newTrip = {

                id:
                    Date.now().toString(),

                tripName:
                    tripName.value.trim(),

                destination:
                    tripDestination.value.trim(),

                destinationId:
                    destinationId,

                startDate:
                    startDate.value,

                endDate:
                    endDate.value,

                travelers:
                    Number(travelers.value),

                description:
                    tripDescription.value.trim(),

                activities: [],

                createdAt:
                    new Date().toISOString()

            };


            // ==================================
            // STORE CURRENT TRIP
            // ==================================

            currentTrip = newTrip;


            // ==================================
            // GET EXISTING TRIPS
            // ==================================

            const trips =
                JSON.parse(
                    localStorage.getItem(
                        "natureNestTrips"
                    )
                ) || [];


            trips.push(newTrip);

            localStorage.setItem(
                "natureNestTrips",
                JSON.stringify(
                trips )
            );


            // ==================================
            // ADD DESTINATION TO PLANNED TRIPS
            // ==================================

            let plannedTrips =
                JSON.parse(
                    localStorage.getItem(
                        "plannedTrips"
                    )
                ) || [];


            // Avoid duplicate destination

            if (
                destinationId &&
                !plannedTrips.includes(
                    destinationId
                )
            ) {

                plannedTrips.push(
                    destinationId
                );

            }


            localStorage.setItem(
                "plannedTrips",
                JSON.stringify(
                    plannedTrips
                )
            );


            // ==================================
            // SUCCESS
            // ==================================

            alert(
                "Trip created successfully!"
            );


            // ==================================
            // GENERATE ITINERARY
            // ==================================

            generateItinerary(
                newTrip
            );


            // ==================================
            // RESET FORM
            // ==================================

            tripForm.reset();


            // Restore destination

            if (
                currentDestination &&
                tripDestination
            ) {

                tripDestination.value =
                    currentDestination.title;

            }


            // ==================================
            // CLOSE TRIP FORM
            // ==================================

            closeTripForm();


            console.log(
                "Created Trip:",
                newTrip
            );

        }
    );

}


if (saveItineraryBtn) {

    saveItineraryBtn.addEventListener(
        "click",
        () => {

            if (!currentTrip) {
                return;
            }


            const activities = [];


            // ==================================
            // GET ALL ITINERARY FIELDS
            // ==================================

            const activityInputs =
                document.querySelectorAll(
                    ".itinerary-activity"
                );

            const locationInputs =
                document.querySelectorAll(
                    ".itinerary-location"
                );

            const timeInputs =
                document.querySelectorAll(
                    ".itinerary-time"
                );

            const descriptionInputs =
                document.querySelectorAll(
                    ".itinerary-description"
                );

            const categoryInputs =
                document.querySelectorAll(
                    ".itinerary-category"
                );


            // ==================================
            // SAVE EACH DAY
            // ==================================

            activityInputs.forEach(
                (input, index) => {

                    const day =
                        Number(
                            input.dataset.day
                        );


                    const location =
                        locationInputs[index]
                            ? locationInputs[index]
                                .value
                                .trim()
                            : "";


                    const time =
                        timeInputs[index]
                            ? timeInputs[index]
                                .value
                            : "";


                    const description =
                        descriptionInputs[index]
                            ? descriptionInputs[index]
                                .value
                                .trim()
                            : "";


                    const category =
                        categoryInputs[index]
                            ? categoryInputs[index]
                                .value
                            : "";


                    activities.push({

                        day: day,

                        activity:
                            input.value.trim(),

                        location:
                            location,

                        time:
                            time,

                        description:
                            description,

                        category:
                            category

                    });

                }
            );


            // ==================================
            // UPDATE CURRENT TRIP
            // ==================================

            currentTrip.activities =
                activities;


            // ==================================
            // GET SAVED TRIPS
            // ==================================

            const trips =
                JSON.parse(
                    localStorage.getItem(
                        "natureNestTrips"
                    )
                ) || [];


            // ==================================
            // FIND CURRENT TRIP
            // ==================================

            const tripIndex =
                trips.findIndex(
                    trip =>
                        String(trip.id) ===
                        String(currentTrip.id)
                );


            // ==================================
            // UPDATE TRIP
            // ==================================

            if (tripIndex !== -1) {

                trips[tripIndex] =
                    currentTrip;

            }


            // ==================================
            // SAVE UPDATED TRIPS
            // ==================================

            localStorage.setItem(
                "natureNestTrips",
                JSON.stringify(
                    trips
                )
            );


            // ==================================
            // SUCCESS
            // ==================================

            alert(
                "Itinerary saved successfully!"
            );


            // ==================================
            // CLOSE ITINERARY
            // ==================================

            closeItinerarySection();


            console.log(
                "Saved itinerary:",
                currentTrip
            );

        }
    );

}
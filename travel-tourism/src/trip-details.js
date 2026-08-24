
import "./style.css";


// ==========================================
// GET SELECTED TRIP
// ==========================================

const trip =
    JSON.parse(
        localStorage.getItem(
            "selectedTrip"
        )
    );

    // ==========================================
// GET ALL BOOKINGS
// ==========================================

const bookings =
    JSON.parse(
        localStorage.getItem(
            "natureNestBookings"
        )
    ) || [];


// ==========================================
// CHECK TRIP
// ==========================================

if (!trip) {

    window.location.href =
        "planned-trips.html";

}



const selectedTripId =
    String(trip.id);

// ==========================================
// DOM ELEMENTS
// ==========================================

const tripTitle =
    document.getElementById(
        "tripTitle"
    );

const summaryTripName =
    document.getElementById(
        "summaryTripName"
    );

const summaryDescription =
    document.getElementById(
        "summaryDescription"
    );

const summaryDestination =
    document.getElementById(
        "summaryDestination"
    );

const summaryDays =
    document.getElementById(
        "summaryDays"
    );

const summaryActivities =
    document.getElementById(
        "summaryActivities"
    );

const summaryTravelers =
    document.getElementById(
        "summaryTravelers"
    );

const summaryStartDate =
    document.getElementById(
        "summaryStartDate"
    );

const summaryEndDate =
    document.getElementById(
        "summaryEndDate"
    );

const completeItinerary =
    document.getElementById(
        "completeItinerary"
    );

const editTripBtn =
    document.getElementById(
        "editTripBtn"
    );

const viewTravelServicesBtn =
    document.getElementById(
        "viewTravelServicesBtn"
    );


// ==========================================
// EDIT TRIP DOM ELEMENTS
// ==========================================

const editTripSection =
    document.getElementById(
        "editTripSection"
    );

const editTripForm =
    document.getElementById(
        "editTripForm"
    );

const cancelEditBtn =
    document.getElementById(
        "cancelEditBtn"
    );

const editTripName =
    document.getElementById(
        "editTripName"
    );

const editTripDestination =
    document.getElementById(
        "editTripDestination"
    );

const editStartDate =
    document.getElementById(
        "editStartDate"
    );

const editEndDate =
    document.getElementById(
        "editEndDate"
    );

const editTravelers =
    document.getElementById(
        "editTravelers"
    );

const editTripDescription =
    document.getElementById(
        "editTripDescription"
    );

const editItineraryContainer =
    document.getElementById(
        "editItineraryContainer"
    );


// ==========================================
// CALCULATE TOTAL DAYS
// ==========================================

function calculateTripDays(
    start,
    end
) {

    if (!start || !end) {
        return 0;
    }

    const startDate =
        new Date(start);

    const endDate =
        new Date(end);

    const difference =
        endDate - startDate;

    return (
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1
    );

}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(date) {

    if (!date) {
        return "Not set";
    }

    const dateObject =
        new Date(date);

    return dateObject.toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// ==========================================
// SHOW TRIP SUMMARY
// ==========================================

function showTripSummary() {

    const totalDays =
        calculateTripDays(
            trip.startDate,
            trip.endDate
        );

    const activities =
        trip.activities || [];


    tripTitle.textContent =
        trip.tripName ||
        "Trip Details";


    summaryTripName.textContent =
        trip.tripName ||
        "My Trip";


    summaryDescription.textContent =
        trip.description ||
        "No trip description added.";


    summaryDestination.textContent =
        trip.destination ||
        "Destination";


    summaryDays.textContent =
        `${totalDays} Day${totalDays === 1 ? "" : "s"}`;


    summaryActivities.textContent =
        `${activities.length} Activit${activities.length === 1 ? "y" : "ies"}`;


    summaryTravelers.textContent =
        `${trip.travelers || 1} Traveler${trip.travelers == 1 ? "" : "s"}`;


    summaryStartDate.textContent =
        formatDate(
            trip.startDate
        );


    summaryEndDate.textContent =
        formatDate(
            trip.endDate
        );

}


// ==========================================
// COMPLETE ITINERARY
// ==========================================

function showCompleteItinerary() {

    if (!completeItinerary) {
        return;
    }


    completeItinerary.innerHTML = "";


    const activities =
        trip.activities || [];


    // ======================================
    // NO ACTIVITIES
    // ======================================

    if (
        activities.length === 0
    ) {

        completeItinerary.innerHTML = `

            <div
                class="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    p-8
                    text-center
                    shadow-sm
                "
            >

                <div
                    class="text-5xl mb-4"
                >
                    🗓️
                </div>

                <h3
                    class="
                        text-xl
                        font-bold
                        text-gray-800
                        mb-2
                    "
                >
                    No Activities Yet
                </h3>

                <p
                    class="
                        text-gray-500
                    "
                >
                    Edit your trip and add
                    activities to create
                    your itinerary.
                </p>

            </div>

        `;

        return;
    }


    // ======================================
    // GROUP ACTIVITIES BY DAY
    // ======================================

    const groupedActivities = {};


    activities.forEach(
        (activity) => {

            const day =
                activity.day || 1;


            if (
                !groupedActivities[day]
            ) {

                groupedActivities[day] =
                    [];

            }


            groupedActivities[day]
                .push(activity);

        }
    );


    // =====================================================
// RENDER TRIP BOOKINGS
// =====================================================



    // ======================================
    // CREATE DAY SECTIONS
    // ======================================

    Object.keys(
        groupedActivities
    )
        .sort(
            (a, b) =>
                Number(a) -
                Number(b)
        )
        .forEach(
            (day) => {

                const dayActivities =
                    groupedActivities[day];


                const daySection =
                    document.createElement(
                        "div"
                    );


                daySection.className =
                    `
                    bg-white
                    rounded-3xl
                    border
                    border-gray-100
                    shadow-sm
                    overflow-hidden
                `;


                daySection.innerHTML = `

                    <div
                        class="
                            bg-emerald-600
                            text-white
                            px-6
                            py-4
                        "
                    >

                        <h3
                            class="
                                text-xl
                                font-bold
                            "
                        >
                            Day ${day}
                        </h3>

                        <p
                            class="
                                text-sm
                                text-emerald-100
                            "
                        >
                            ${dayActivities.length}
                            Activit${dayActivities.length === 1 ? "y" : "ies"}
                        </p>

                    </div>


                    <div
                        class="
                            p-5
                            space-y-4
                        "
                    >

                        ${dayActivities
                            .map(
                                (activity) => {

                                    return `

                                        <article
                                            class="
                                                border
                                                border-gray-200
                                                rounded-2xl
                                                p-5
                                                hover:shadow-md
                                                transition
                                            "
                                        >

                                            <div
                                                class="
                                                    flex
                                                    flex-col
                                                    md:flex-row
                                                    md:items-start
                                                    md:justify-between
                                                    gap-3
                                                "
                                            >

                                                <div>

                                                    <h4
                                                        class="
                                                            text-xl
                                                            font-bold
                                                            text-gray-800
                                                        "
                                                    >
                                                        ${activity.name ||
                                                        activity.title ||
                                                        "Untitled Activity"}
                                                    </h4>


                                                    <p
                                                        class="
                                                            text-sm
                                                            text-gray-500
                                                            mt-1
                                                        "
                                                    >
                                                        📍
                                                        ${activity.location ||
                                                        "Location not specified"}
                                                    </p>

                                                </div>


                                                <span
                                                    class="
                                                        w-fit
                                                        bg-emerald-100
                                                        text-emerald-700
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-semibold
                                                    "
                                                >
                                                    ${activity.category ||
                                                    "Activity"}
                                                </span>

                                            </div>


                                            <div
                                                class="
                                                    mt-4
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    text-gray-600
                                                "
                                            >
                                                🕐
                                                ${activity.time ||
                                                "Time not specified"}
                                            </div>


                                            <p
                                                class="
                                                    mt-3
                                                    text-gray-600
                                                    leading-relaxed
                                                "
                                            >
                                                ${activity.description ||
                                                "No description added."}
                                            </p>

                                        </article>

                                    `;

                                }
                            )
                            .join("")}

                    </div>

                `;


                completeItinerary.appendChild(
                    daySection
                );

            }
        );

}

function renderTripBookings() {

    const tripBookingsContainer =
        document.getElementById(
            "tripBookings"
        );

    const noTripBookings =
        document.getElementById(
            "noTripBookings"
        );

    const tripBookings =
    bookings.filter(
        booking =>
            String(booking.tripId) ===
            String(trip.id)
    );


    if (!tripBookingsContainer) {
        return;
    }


    // Get all bookings
    const allBookings =
        JSON.parse(
            localStorage.getItem(
                "natureNestBookings"
            )
        ) || [];



    // Clear previous content
    tripBookingsContainer.innerHTML = "";


    // =============================================
    // NO BOOKINGS
    // =============================================

    if (tripBookings.length === 0) {

        noTripBookings?.classList.remove(
            "hidden"
        );

        return;
    }


    noTripBookings?.classList.add(
        "hidden"
    );


    // =============================================
    // RENDER BOOKINGS
    // =============================================

    tripBookings.forEach(
        booking => {

            tripBookingsContainer.innerHTML += `

                <article
                    class="
                        bg-white
                        border
                        border-gray-100
                        rounded-2xl
                        p-6
                        shadow-sm
                    "
                >

                    <div
                        class="
                            flex
                            items-start
                            justify-between
                            gap-4
                            mb-5
                        "
                    >

                        <div>

                            <p
                                class="
                                    text-sm
                                    font-semibold
                                    text-emerald-600
                                "
                            >
                                ${booking.category}
                                ${booking.category}
                            </p>

                            <h3
                                class="
                                    text-xl
                                    font-bold
                                    text-gray-800
                                    mt-1
                                "
                            >
                                ${booking.service}
                            </h3>

                            <p
                                class="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                "
                            >
                                📍 ${booking.location}
                            </p>

                        </div>


                        <span
                            class="
                                bg-yellow-100
                                text-yellow-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-semibold
                            "
                        >
                            ${booking.status}
                        </span>

                    </div>


                    <div
                        class="
                            grid
                            grid-cols-2
                            gap-4
                            text-sm
                        "
                    >

                        <div>

                            <p class="text-gray-400">
                                Booking Date
                            </p>

                            <p
                                class="
                                    text-gray-700
                                    font-semibold
                                    mt-1
                                "
                            >
                                ${booking.date}
                            </p>

                        </div>


                        <div>

                            <p class="text-gray-400">
                                Travelers
                            </p>

                            <p
                                class="
                                    text-gray-700
                                    font-semibold
                                    mt-1
                                "
                            >
                                👥 ${booking.people}
                            </p>

                        </div>

                    </div>


                    <div
                        class="
                            mt-5
                            pt-5
                            border-t
                            border-gray-100
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p class="text-xs text-gray-400">
                                Booking ID
                            </p>

                            <p
                                class="
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                "
                            >
                                ${booking.bookingId}
                            </p>

                        </div>


                        <div class="text-right">

                            <p class="text-xs text-gray-400">
                                Total
                            </p>

                            <p
                                class="
                                    text-xl
                                    font-bold
                                    text-emerald-600
                                "
                            >
                                PKR ${Number(
                                    booking.total
                                ).toLocaleString()}
                            </p>

                        </div>

                    </div>

                </article>

            `;

        }
    );

}





    // ======================================
    // FILL MAIN TRIP INFORMATION
    // ======================================

    if (editTripName) {

        editTripName.value =
            trip.tripName || "";

    }


    if (editTripDestination) {

        editTripDestination.value =
            trip.destination || "";

    }


    if (editStartDate) {

        editStartDate.value =
            trip.startDate || "";

    }


    if (editEndDate) {

        editEndDate.value =
            trip.endDate || "";

    }


    if (editTravelers) {

        editTravelers.value =
            trip.travelers || 1;

    }


    if (editTripDescription) {

        editTripDescription.value =
            trip.description || "";

    }


    // ======================================
    // SHOW EDIT SECTION
    // ======================================

    editTripSection.classList.remove(
        "hidden"
    );


    // ======================================
    // RENDER ITINERARY
    // ======================================

    renderEditItinerary();


    // ======================================
    // SCROLL TO EDIT FORM
    // ======================================

    editTripSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });



// ==========================================
// EDIT DAY-BY-DAY ITINERARY
// ==========================================

function renderEditItinerary() {

    if (!editItineraryContainer) {
        return;
    }


    editItineraryContainer.innerHTML =
        "";


    const totalDays =
        calculateTripDays(
            editStartDate?.value,
            editEndDate?.value
        );


    if (totalDays <= 0) {

        editItineraryContainer.innerHTML = `

            <p class="text-gray-500">

                Please select valid start
                and end dates.

            </p>

        `;

        return;
    }


    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const activity =
            (trip.activities || []).find(
                item =>
                    Number(item.day) ===
                    Number(day)
            );


        const dayCard =
            document.createElement(
                "div"
            );


        dayCard.className =
            "bg-gray-50 border border-gray-200 rounded-2xl p-5";


        dayCard.innerHTML = `

            <div
                class="
                    flex
                    items-center
                    justify-between
                    mb-5
                "
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
                        bg-emerald-100
                        text-emerald-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                    "
                >
                    Day ${day}
                </span>

            </div>


            <div
                class="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                "
            >

                <!-- ACTIVITY NAME -->

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
                        Activity Name
                    </label>


                    <input
                        type="text"
                        class="
                            edit-itinerary-name
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
                        value="${activity?.name || activity?.activity || ""}"
                        placeholder="e.g. Visit Altit Fort"
                    >

                </div>


                <!-- LOCATION -->

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
                        Location
                    </label>


                    <input
                        type="text"
                        class="
                            edit-itinerary-location
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
                        value="${activity?.location || ""}"
                        placeholder="e.g. Altit, Hunza"
                    >

                </div>


                <!-- TIME -->

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
                        Time
                    </label>


                    <input
                        type="time"
                        class="
                            edit-itinerary-time
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
                        value="${activity?.time || ""}"
                    >

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
                            edit-itinerary-category
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


                        <option
                            value="Sightseeing"
                            ${activity?.category === "Sightseeing" ? "selected" : ""}
                        >
                            Sightseeing
                        </option>


                        <option
                            value="Food"
                            ${activity?.category === "Food" ? "selected" : ""}
                        >
                            Food
                        </option>


                        <option
                            value="Adventure"
                            ${activity?.category === "Adventure" ? "selected" : ""}
                        >
                            Adventure
                        </option>


                        <option
                            value="Shopping"
                            ${activity?.category === "Shopping" ? "selected" : ""}
                        >
                            Shopping
                        </option>


                        <option
                            value="Culture"
                            ${activity?.category === "Culture" ? "selected" : ""}
                        >
                            Culture
                        </option>


                        <option
                            value="Entertainment"
                            ${activity?.category === "Entertainment" ? "selected" : ""}
                        >
                            Entertainment
                        </option>

                    </select>

                </div>

            </div>


            <!-- DESCRIPTION -->

            <div class="mt-4">

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
                    class="
                        edit-itinerary-description
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
                    placeholder="Describe your activity..."
                >${activity?.description || ""}</textarea>

            </div>

        `;


        editItineraryContainer.appendChild(
            dayCard
        );

    }

}


// ==========================================
// UPDATE ITINERARY WHEN DATES CHANGE
// ==========================================

if (editStartDate) {

    editStartDate.addEventListener(
        "change",
        () => {

            renderEditItinerary();

        }
    );

}


if (editEndDate) {

    editEndDate.addEventListener(
        "change",
        () => {

            renderEditItinerary();

        }
    );

}

// ==========================================
// VIEW TRAVEL SERVICES
// ==========================================

if (viewTravelServicesBtn) {

    viewTravelServicesBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                `travel-services.html?destination=${encodeURIComponent(
                    trip.destination
                )}&tripId=${encodeURIComponent(
                    trip.id
                )}`;

        }
    );

}

// ==========================================
// EDIT TRIP BUTTON
// ==========================================

if (editTripBtn) {

    editTripBtn.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "selectedTrip",
                JSON.stringify(trip)
            );

            window.location.href =
                `itinerary.html?tripId=${trip.id}&edit=true`;

        }
    );

}



// ==========================================
// BACK
// ==========================================

window.goBack = function () {

    window.location.href =
        "planned-trips.html";

};


// ==========================================
// INITIALIZE
// ==========================================

showTripSummary();

showCompleteItinerary();

renderTripBookings();


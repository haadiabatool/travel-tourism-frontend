import "./style.css";


// GET SELECTED TRIP

const trip =
    JSON.parse(localStorage.getItem("selectedTrip"));


// DOM ELEMENTS

const tripTitle =
    document.getElementById("tripTitle");

const tripInfo =
    document.getElementById("tripInfo");

const itineraryContainer =
    document.getElementById("itineraryContainer");

const itineraryForm =
    document.getElementById("itineraryForm");


// CHECK TRIP

if (!trip) {

    window.location.href =
        "planned-trips.html";

}


// CALCULATE DAYS

function calculateTripDays(start,end) {

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
        Math.floor(difference /(1000 * 60 * 60 * 24)) + 1
    );

}



// SHOW TRIP INFORMATION

function showTripInfo() {

    if (!trip) {
        return;
    }


    tripTitle.textContent =
        trip.tripName ||"Trip Itinerary";


    tripInfo.textContent =
        `${trip.destination || "Destination"} • ${trip.startDate || "No Start Date"} → ${trip.endDate || "No End Date"} • ${trip.travelers || 1} Traveler(s)`;

}


// CREATE ACTIVITY CARD

function createActivityCard(day,activity = {}) {

    const activityCard =
        document.createElement("div");


    activityCard.className =
        `activity-card bg-white border border-gray-200 rounded-2xl p-5 shadow-sm relative `;


    activityCard.innerHTML = `

        <!-- ACTIVITY HEADER -->

        <div class="flex items-center justify-between gap-3 mb-5 ">

            <h4 class="text-lg font-bold text-gray-800 ">
                Activity
            </h4>


            <button type="button" class=" remove-activity text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-semibold">
                🗑 Remove
            </button>

        </div>


        <!-- INPUT GRID -->

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" >

            <!-- ACTIVITY NAME -->

            <div>

                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Activity Name
                </label>

                <input type="text" class="activity-name w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 "
                 value="${activity.name || ""}" placeholder="e.g. Visit Altit Fort">

            </div>

            <!-- LOCATION -->

            <div>

                <label class=" block text-sm font-semibold text-gray-700 mb-2">
                    Location
                </label>

                <input type="text" class="activity-location w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    value="${activity.location || ""}" placeholder="e.g. Altit, Hunza">

            </div>

            <!-- TIME -->

            <div>

                <label class="block text-sm font-semibold text-gray-700 mb-2 ">
                    Time
                </label>


                <input type="time" class="activity-time w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    value="${activity.time || ""}">

            </div>



            <!-- CATEGORY -->

            <div>

                <label class="block text-sm font-semibold text-gray-700 mb-2 ">
                    Category
                </label>


                <select class="activity-category w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500">

                    <option value="">
                        Select Category
                    </option>

                    <option value="Sightseeing"
                        ${activity.category === "Sightseeing" ? "selected" : ""}>
                        Sightseeing
                    </option>

                    <option value="Food"
                        ${activity.category === "Food" ? "selected" : ""}>
                        Food
                    </option>

                    <option value="Adventure"
                        ${activity.category === "Adventure" ? "selected" : ""}>
                        Adventure
                    </option>

                    <option value="Shopping"
                        ${activity.category === "Shopping" ? "selected" : ""}>
                        Shopping
                    </option>

                    <option value="Culture"
                        ${activity.category === "Culture" ? "selected" : ""}>
                        Culture
                    </option>

                    <option value="Entertainment"
                        ${activity.category === "Entertainment" ? "selected" : ""}>
                        Entertainment
                    </option>

                </select>

            </div>

        </div>


        <!-- DESCRIPTION -->

        <div class="mt-4">

            <label class=" block text-sm font-semibold text-gray-700 mb-2">
                Short Description
            </label>


            <textarea rows="3" class="activity-description w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-emerald-500 "
                placeholder="Describe your activity...">${activity.description || ""}</textarea>

        </div>

    `;


    // REMOVE BUTTON

    const removeButton =
        activityCard.querySelector(".remove-activity");


    removeButton.addEventListener("click",() => {

            activityCard.remove();

        }
    );


    return activityCard;

}


// CREATE DAY CARD

function createDayCard(day,activities) {

    const dayCard =
        document.createElement("section");


    dayCard.className =
        `day-card bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden `;


    dayCard.dataset.day =
        day;


    dayCard.innerHTML = `

        <!-- DAY HEADER -->

        <div class=" bg-emerald-600 text-white px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>

                <h3 class="text-2xl font-bold ">
                    Day ${day}
                </h3>

                <p class="text-emerald-100 text-sm mt-1 ">
                    Add activities for Day ${day}
                </p>

            </div>

            <button type="button" class=" add-activity bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2.5 rounded-xl font-semibold transition">
                + Add Activity
            </button>

        </div>

        <!-- ACTIVITIES -->

        <div class=" activities-container p-5 space-y-5 ">
        </div>

    `;


    const activitiesContainer =
        dayCard.querySelector(".activities-container");


    const addActivityButton =   
        dayCard.querySelector( ".add-activity");


    // ADD EXISTING ACTIVITIES
    

    if (activities &&activities.length > 0) {

        activities.forEach((activity) => {

                const card =
                    createActivityCard(day,activity);

                activitiesContainer.appendChild(card);

            }
        );

    }


    // IF NO ACTIVITY

    else {

        addEmptyActivityMessage(activitiesContainer);

    }


    // ADD ACTIVITY BUTTON

    addActivityButton.addEventListener("click",() => {

            const emptyMessage =
                activitiesContainer.querySelector(".empty-activity-message");


            if (emptyMessage) {
                emptyMessage.remove();
            }

            const activityCard =
                createActivityCard(day);

            activitiesContainer.appendChild(activityCard);

        }
    );


    return dayCard;

}


// EMPTY ACTIVITY MESSAGE

function addEmptyActivityMessage(container) {

    const message =
        document.createElement("div");


    message.className =
        `empty-activity-message border border-dashed border-gray-300 rounded-2xl p-6 text-center`;

    message.innerHTML = `

        <div class="text-4xl mb-2">
            🗓️
        </div>

        <p class="text-gray-500">
            No activities added for this day.
        </p>

        <p class="text-sm text-gray-400 mt-1">
            Click "+ Add Activity" to add one.
        </p>

    `;


    container.appendChild(message);

}


// RENDER ITINERARY

function renderItinerary() {

    if (!trip) {
        return;
    }


    itineraryContainer.innerHTML =
        "";


    const totalDays =
        calculateTripDays(trip.startDate,trip.endDate);


    if (totalDays <= 0) {

        itineraryContainer.innerHTML = `

            <div class="bg-white rounded-2xl p-8 text-center shadow-sm">

                <h2 class="text-xl font-bold text-gray-800">
                    Invalid Trip Dates
                </h2>

                <p class="text-gray-500 mt-2">
                    Please update the trip dates first.
                </p>

            </div>

        `;

        return;

    }


    // CREATE EACH DAY

    for (let day = 1;day <= totalDays;day++) {

        const dayActivities =
            (trip.activities || []).filter(activity =>Number(activity.day) ===Number(day));

        const dayCard =
            createDayCard(day,dayActivities);

        itineraryContainer.appendChild(dayCard);

    }

}


// COLLECT ALL ACTIVITIES

function collectActivities() {

    const activities = [];


    const dayCards =
        document.querySelectorAll(".day-card");


    dayCards.forEach((dayCard) => {

            const day =
                Number(dayCard.dataset.day);


            const activityCards =
                dayCard.querySelectorAll(".activity-card");

            activityCards.forEach((card) => {

                    const nameInput =
                        card.querySelector(".activity-name");

                    const locationInput =
                        card.querySelector(".activity-location");

                    const timeInput =
                        card.querySelector(".activity-time");

                    const categoryInput =
                        card.querySelector(".activity-category");

                    const descriptionInput =
                        card.querySelector(".activity-description");

                    const name =
                        nameInput?.value.trim() ||"";

                    const location =
                        locationInput?.value.trim() ||"";

                    const time =
                        timeInput?.value ||"";

                    const category =
                        categoryInput?.value ||"";


                    const description =
                        descriptionInput?.value.trim() ||"";


                    // IGNORE COMPLETELY EMPTY CARD

                    if ( !name && !location && !time && !category && !description) {

                        return;

                    }

                    // VALIDATION

                    if (!name) {

                        alert(`Please enter an activity name for Day ${day}.`);

                        throw new Error("Activity name missing");

                    }


                    if (!location) {

                        alert(`Please enter a location for Day ${day}.`);

                        throw new Error("Activity location missing");

                    }


                    if (!time) {

                        alert(`Please select a time for Day ${day}.`);

                        throw new Error("Activity time missing");

                    }


                    if (!category) {

                        alert(`Please select a category for Day ${day}.`);

                        throw new Error("Activity category missing");

                    }


                    if (!description) {

                        alert(`Please enter a description for Day ${day}.`);

                        throw new Error("Activity description missing");

                    }


                    // ADD ACTIVITY

                    activities.push({

                        day: day,

                        name: name,

                        location: location,

                        time: time,

                        category: category,

                        description: description

                    });

                }
            );

        }
    );


    return activities;

}


// SAVE ITINERARY

if (itineraryForm) {

    itineraryForm.addEventListener("submit",(event) => {

            event.preventDefault();

            let activities;

            try {

                activities =
                    collectActivities();

            }
            catch (error) {

                return;

            }


            // UPDATE TRIP

            trip.activities =
                activities;


            // UPDATE natureNestTrips

            const trips =
                JSON.parse(localStorage.getItem("natureNestTrips")) || [];


            const tripIndex =
                trips.findIndex(item =>String(item.id) ===String(trip.id));


            if (tripIndex !== -1) {

                trips[tripIndex] =
                    trip;

            }
            else {

                trips.push(trip);

            }

            localStorage.setItem("natureNestTrips",JSON.stringify(trips));


            // UPDATE selectedTrip

            localStorage.setItem("selectedTrip",JSON.stringify(trip));


            // SUCCESS

            alert("Itinerary updated successfully!");


            // GO TO TRIP DETAILS

            window.location.href =
                "trip-details.html";

        }
    );

}


// BACK

window.goBack =function () {

        window.location.href =
            "trip-details.html";

    };


// INITIALIZE

showTripInfo();

renderItinerary();
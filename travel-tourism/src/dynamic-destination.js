import { destinations } from "./destination.js";

// Take Destination ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const destination = destinations[id];  



// destination DOM ELEMENTS
const serviceAverageRating =
    document.getElementById("destinationAverageRating");

const serviceTotalReviews =
    document.getElementById("destinationTotalReviews");

const serviceFiveStarCount =
    document.getElementById("destinationFiveStarCount");

const serviceFiveStarBar =
    document.getElementById("destinationFiveStarBar");

const serviceFourStarCount =
    document.getElementById("destinationFourStarCount");

const serviceThreeStarCount =
    document.getElementById("destinationThreeStarCount");

const serviceFourStarBar =
    document.getElementById("destinationFourStarBar");

const serviceThreeStarBar =
    document.getElementById("destinationThreeStarBar");

const serviceTwoStarCount =
    document.getElementById("destinationTwoStarCount");

const serviceTwoStarBar =
    document.getElementById("destinationTwoStarBar");

const serviceOneStarCount =
    document.getElementById("destinationOneStarCount");

const serviceOneStarBar =
    document.getElementById("destinationOneStarBar");

const serviceReviewsList =
    document.getElementById("destinationReviewsList");

const noServiceReviews =
    document.getElementById("nodestinationReviews");

const serviceReviewForm =
    document.getElementById("destinationReviewForm");

const serviceReviewerName =
    document.getElementById("destinationReviewerName");

const serviceStarRating =
    document.getElementById("destinationStarRating");

const serviceRatingText =
    document.getElementById("destinationRatingText");

const serviceReviewText =
    document.getElementById("destinationReviewText");

const serviceNotFound =
    document.getElementById("destinationNotFound");

const notFoundBackBtn =
    document.getElementById("notFoundBackBtn");


// TRACK VIEWED DESTINATION

let viewedDestinations =
    JSON.parse(localStorage.getItem("viewedDestinations")) || [];

// Remove duplicate if destination was already viewed
viewedDestinations =
    viewedDestinations.filter(item => String(item) !== String(id));

// Add current destination at the beginning
viewedDestinations.unshift(id);

// Keep only latest 6 viewed destinations
viewedDestinations =
    viewedDestinations.slice(0, 6);

// Save to localStorage
localStorage.setItem("viewedDestinations",JSON.stringify(viewedDestinations));


// Image

if(!destination){
  console.error("Destination not found:",id);
  console.log("Available destination IDs:",Object.keys(destinations));

  throw new Error(`DEstination "${id}" does not exist in destination.js`);
}

document.getElementById("destinationImage").src =
        destination.image;

document.getElementById("destinationImage").alt =
         destination.title;

document.getElementById("imageTitle").textContent =
        destination.title;

// Main Information
document.getElementById("destinationName").textContent =
  destination.title;

document.getElementById("destinationLocation").textContent =
  destination.location;

document.getElementById("destinationCategory").textContent =
  destination.category;

document.getElementById("destinationDescription").textContent =
  destination.description;


// Highlights

const highlightList =
         document.getElementById("highlights");

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


// Travel Information
document.getElementById("bestTime").textContent =
  destination.travelInfo.bestTime;

document.getElementById("entryFee").textContent =
  destination.travelInfo.entry;

document.getElementById("duration").textContent =
  destination.travelInfo.duration;

// Agar weather nahi diya to timing show kare
document.getElementById("weather").textContent =
  destination.travelInfo.weather ?? destination.travelInfo.timing;



// DYNAMIC DESTINATION ACTIONS

const favoriteBtn =
     document.getElementById("favoriteBtn");
const planBtn =     
    document.getElementById("planBtn");
const saveBtn =
     document.getElementById("saveBtn");


// FAVORITE

if (favoriteBtn) {

    favoriteBtn.addEventListener("click", () => {

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        const alreadyFavorite = favorites.includes(id);

        if (alreadyFavorite) {

            favorites = favorites.filter(item => item !== id);

            favoriteBtn.classList.remove("bg-rose-500","text-white");

            favoriteBtn.classList.add("bg-white/90","text-rose-500");

            favoriteBtn.title = "Add to Favorites";

        } else {

            favorites.push(id);

            favoriteBtn.classList.remove("bg-white/90","text-rose-500");

            favoriteBtn.classList.add("bg-rose-500","text-white");

            favoriteBtn.title = "Remove from Favorites";
        }

        localStorage.setItem("favorites",JSON.stringify(favorites));

    });
}


// PLAN TRIP

if (planBtn) {

    planBtn.addEventListener("click", () => {

        let plannedTrips =
            JSON.parse(localStorage.getItem("plannedTrips")) || [];

        const alreadyPlanned =
            plannedTrips.includes(id);

        if (alreadyPlanned) {

            plannedTrips =
                plannedTrips.filter(item => item !== id);

            planBtn.classList.remove("bg-emerald-600","text-white");

            planBtn.classList.add("bg-white/90","text-emerald-600");

            planBtn.title = "Plan this Trip";

        } else {

            plannedTrips.push(id);

            planBtn.classList.remove("bg-white/90","text-emerald-600");

            planBtn.classList.add("bg-emerald-600","text-white");

            planBtn.title = "Remove from Planned Trips";
        }

        localStorage.setItem("plannedTrips",JSON.stringify(plannedTrips));

    });
}


// SAVE DESTINATION

if (saveBtn) {

    saveBtn.addEventListener("click", () => {

        let savedDestinations =
            JSON.parse(localStorage.getItem("savedDestinations")) || [];

        const alreadySaved =
            savedDestinations.includes(id);

        if (alreadySaved) {

            savedDestinations =
                savedDestinations.filter(item => item !== id);

            saveBtn.classList.remove("bg-blue-600","text-white");

            saveBtn.classList.add("bg-white/90","text-blue-600");

            saveBtn.title = "Save Destination";

        } else {

            savedDestinations.push(id);

            saveBtn.classList.remove("bg-white/90","text-blue-600");

            saveBtn.classList.add("bg-blue-600","text-white");

            saveBtn.title = "Remove Saved Destination";
        }

        localStorage.setItem("savedDestinations",JSON.stringify(savedDestinations));

    });
}

// DESTINATION REVIEWS

let selectedDestinationRating = 0;
let currentReviewFilter = "all";


// GET ALL REVIEWS
function getAllDestinationReviews() {

    return JSON.parse(localStorage.getItem("natureNestReviews")) || [];

}


// GET CURRENT DESTINATION REVIEWS
function getDestinationReviews() {

    const allReviews =
        getAllDestinationReviews();

    return allReviews.filter(
        review =>
            review.type === "destination" && String(review.itemId) === String(id)
    );

}


// SAVE DESTINATION REVIEWS
function saveDestinationReviews(reviews) {

    const allReviews =
        getAllDestinationReviews();

    const otherReviews =
        allReviews.filter(
            review =>
                !(review.type === "destination" && String(review.itemId) === String(id) )
        );

    localStorage.setItem(
        "natureNestReviews",JSON.stringify([...otherReviews,...reviews])
    );

}


// STAR SELECTION

function setupDestinationStarRating() {

    if (!serviceStarRating) {
        return;
    }

    const stars =
        serviceStarRating.querySelectorAll("[data-rating]");

    stars.forEach(star => {

        star.addEventListener("click", () => {

            selectedDestinationRating =
                Number(star.dataset.rating);

            stars.forEach(item => {

                const rating =
                    Number(item.dataset.rating);

                item.textContent =
                    rating <= selectedDestinationRating
                        ? "★"
                        : "☆";

                item.classList.toggle("text-yellow-400",rating <= selectedDestinationRating);

            });

            const ratingLabels = {
                1: "Poor",
                2: "Needs Improvement",
                3: "Average",
                4: "Good",
                5: "Excellent"
            };

            if (serviceRatingText) {

                serviceRatingText.textContent =
                    ratingLabels[selectedDestinationRating];

            }

        });

    });

}


// CALCULATE RATING

function calculateDestinationRating(reviews) {

    if (reviews.length === 0) {
        return 0;
    }

    const total =
        reviews.reduce((sum, review) =>sum + Number(review.rating),0);

    return (total / reviews.length).toFixed(1);

}


// RATING STATISTICS

function updateDestinationRatingStats(reviews) {

    const total = reviews.length;

    const five =
        reviews.filter(review => Number(review.rating) === 5).length;

    const four =
        reviews.filter(review => Number(review.rating) === 4).length;

    const three =
        reviews.filter(review => Number(review.rating) === 3).length;

    const two =
        reviews.filter(review => Number(review.rating) === 2).length;

    const one =
        reviews.filter(review => Number(review.rating) === 1).length;


    if (serviceAverageRating) {

        serviceAverageRating.textContent =
            calculateDestinationRating(reviews);

    }


    if (serviceTotalReviews) {

        serviceTotalReviews.textContent =
            `${total} review${total === 1 ? "" : "s"}`;

    }


    if (serviceFiveStarCount) {
        serviceFiveStarCount.textContent =
             five;
    }

    if (serviceFourStarCount) {
        serviceFourStarCount.textContent = 
            four;
    }

    if (serviceThreeStarCount) {
        serviceThreeStarCount.textContent =
             three;
    }

    if (serviceTwoStarCount) {
        serviceTwoStarCount.textContent =
             two;
    }

    if (serviceOneStarCount) {
        serviceOneStarCount.textContent =
             one;
    }


    if (serviceFiveStarBar) {

        serviceFiveStarBar.style.width =
            total
                ? `${(five / total) * 100}%`
                : "0%";

    }


    if (serviceFourStarBar) {

        serviceFourStarBar.style.width =
            total
                ? `${(four / total) * 100}%`
                : "0%";

    }


    if (serviceThreeStarBar) {

        serviceThreeStarBar.style.width =
            total
                ? `${(three / total) * 100}%`
                : "0%";

    }

    if (serviceTwoStarBar) {

        serviceTwoStarBar.style.width =
            total
                ? `${(two / total) * 100}%`
                : "0%";

    }

    if (serviceOneStarBar) {

        serviceOneStarBar.style.width =
            total
                ? `${(one / total) * 100}%`
                : "0%";

    }

}


// RENDER REVIEWS

function renderDestinationReviews() {

    if (!serviceReviewsList) {
        return;
    }

    const reviews =
        getDestinationReviews();


    const filteredReviews =
        currentReviewFilter === "all"
            ? reviews
            : reviews.filter(
                review =>
                    Number(review.rating) ===Number(currentReviewFilter));


    serviceReviewsList.innerHTML = "";


    updateDestinationRatingStats(reviews);


    if (filteredReviews.length === 0) {

        noServiceReviews?.classList.remove("hidden");

        return;

    }


    noServiceReviews?.classList.add("hidden");


    filteredReviews.forEach(review => {

        const article =
            document.createElement("article");


        article.className =
            "bg-white border border-gray-100 rounded-2xl p-6 shadow-sm";


        const stars =
            "★".repeat(Number(review.rating)) +
            "☆".repeat(5 - Number(review.rating));


        article.innerHTML = `

            <div class="flex items-start justify-between gap-4">

                <div class="flex items-center gap-4">

                    <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                        ${review.name.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <h4 class="font-bold text-gray-800">
                            ${review.name}
                        </h4>

                        <p class="text-xs text-gray-400">
                            ${review.date}
                        </p>

                    </div>

                </div>


                <div class="text-yellow-400 text-lg">
                    ${stars}
                </div>

            </div>


            <p class="text-gray-600 leading-7 mt-5">
                ${review.text}
            </p>


            <div class="mt-5 flex items-center justify-between">

                <span class="text-xs text-gray-400">
                    ${destination.title}
                </span>


                <button type="button" class="helpful-service-review text-sm text-gray-500 hover:text-emerald-600 font-semibold " data-review-id="${review.id}" >
                    👍 Helpful

                    <span>
                        ${review.helpful || 0}
                    </span>

                </button>

            </div>

        `;


        serviceReviewsList.appendChild(article);

    });


    setupHelpfulButtons();

}


// HELPFUL BUTTON

function setupHelpfulButtons() {

    if (!serviceReviewsList) {
        return;
    }


    const buttons =
        serviceReviewsList.querySelectorAll(".helpful-service-review");


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const reviewId =
                button.dataset.reviewId;


            const allReviews =
                getAllDestinationReviews();


            const review =
                allReviews.find(
                    item =>
                        String(item.id) ===String(reviewId));


            if (!review) {
                return;
            }

            review.helpful =
                Number(review.helpful || 0) + 1;

            localStorage.setItem("natureNestReviews",JSON.stringify(allReviews));

            renderDestinationReviews();

        });

    });

}


// REVIEW FILTERS

function setupDestinationReviewFilters() {

    const filters =
        document.querySelectorAll(".service-review-filter");


    filters.forEach(button => {

        button.addEventListener("click", () => {

            currentReviewFilter =
                button.dataset.rating;


            filters.forEach(item => {

                item.classList.remove("bg-emerald-600","text-white");

                item.classList.add("bg-gray-100","text-gray-700");

            });


            button.classList.remove("bg-gray-100","text-gray-700");

            button.classList.add("bg-emerald-600","text-white");


            renderDestinationReviews();

        });

    });

}


// SUBMIT DESTINATION REVIEW
 
function setupDestinationReviewForm() {

    if (!serviceReviewForm) {
        return;
    }


    serviceReviewForm.addEventListener("submit",event => {

            event.preventDefault();

            const name =
                serviceReviewerName?.value.trim();


            const text =
                serviceReviewText?.value.trim();


            if (!name) {

                alert("Please enter your name.");
                return;

            }


            if (!text) {

                alert("Please write a review.");
                return;

            }


            if (selectedDestinationRating < 1) {

                alert("Please select a rating from 1 to 5 stars.");

                return;

            }


            const reviews =
                getDestinationReviews();


            const newReview = {

                id:
                    `destination-review-${Date.now()}`,

                type:
                    "destination",

                itemId:
                    id,

                name:
                    name,

                rating:
                    selectedDestinationRating,

                text:
                    text,

                date:
                    new Date().toLocaleDateString(
                        "en-US",
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }
                    ),

                helpful:
                    0

            };


            reviews.push(newReview);


            saveDestinationReviews(reviews);


            serviceReviewForm.reset();


            selectedDestinationRating = 0;


            if (serviceStarRating) {

                serviceStarRating.querySelectorAll("[data-rating]").forEach(star => {

                        star.textContent = "☆";

                        star.classList.remove("text-yellow-400");
                    });
            }

            if (serviceRatingText) {

                serviceRatingText.textContent =
                    "Select a rating";

            }

            renderDestinationReviews();
        }
    );
}





// RESTORE SAVED STATES

const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

const plannedTrips =
    JSON.parse(localStorage.getItem("plannedTrips")) || [];

const savedDestinations =
    JSON.parse(localStorage.getItem("savedDestinations")) || [];


// Restore Favorite
if (favoriteBtn && favorites.includes(id)) {

    favoriteBtn.classList.remove("bg-white/90","text-rose-500");

    favoriteBtn.classList.add("bg-rose-500","text-white");

    favoriteBtn.title = "Remove from Favorites";
}


// Restore Planned Trip
if (planBtn && plannedTrips.includes(id)) {

    planBtn.classList.remove("bg-white/90","text-emerald-600");

    planBtn.classList.add("bg-emerald-600","text-white");

    planBtn.title = "Remove from Planned Trips";
}


// Restore Saved Destination
if (saveBtn && savedDestinations.includes(id)) {

    saveBtn.classList.remove("bg-white/90","text-blue-600");

    saveBtn.classList.add("bg-blue-600","text-white");

    saveBtn.title = "Remove Saved Destination";
}


// INITIALIZE

setupDestinationStarRating();

setupDestinationReviewFilters();

setupDestinationReviewForm();

renderDestinationReviews();
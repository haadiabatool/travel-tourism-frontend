import "./style.css";


// GET SELECTED SERVICE

let selectedService =
    JSON.parse(localStorage.getItem("selectedService"));

// DOM ELEMENTS

const serviceDetails =
    document.getElementById("serviceDetails");

const serviceNotFound =
    document.getElementById("serviceNotFound");


// SERVICE ELEMENTS

const serviceImage =
    document.getElementById("serviceImage");

const serviceCategory =
    document.getElementById("serviceCategory");

const serviceName =
    document.getElementById("serviceName");

const serviceLocation =
    document.getElementById("serviceLocation");

const contentServiceName =
    document.getElementById("contentServiceName");

const contentLocation =
    document.getElementById("contentLocation");

const servicePrice =
    document.getElementById("servicePrice");

const serviceRating =
    document.getElementById("serviceRating");

const serviceReviews =
    document.getElementById("serviceReviews");

// SERVICE REVIEW DOM ELEMENTS
const serviceAverageRating =
    document.getElementById("serviceAverageRating");

const serviceTotalReviews =
    document.getElementById("serviceTotalReviews");

const serviceReviewsList =
    document.getElementById("serviceReviewsList");

const noServiceReviews =
    document.getElementById("noServiceReviews");

const serviceReviewForm =
    document.getElementById("serviceReviewForm");

const serviceReviewerName =
    document.getElementById("serviceReviewerName");

const serviceReviewText =
    document.getElementById("serviceReviewText");

const serviceStarRating =
    document.getElementById("serviceStarRating");

const serviceRatingText =
    document.getElementById("serviceRatingText");

const serviceFiveStarCount =
    document.getElementById("serviceFiveStarCount" );

const serviceFourStarCount =
    document.getElementById("serviceFourStarCount");

const serviceThreeStarCount =
    document.getElementById("serviceThreeStarCount");

const serviceTwoStarCount =
    document.getElementById("serviceTwoStarCount");

const serviceOneStarCount =
    document.getElementById("serviceOneStarCount");

const serviceFiveStarBar =
    document.getElementById("serviceFiveStarBar");

const serviceFourStarBar =
    document.getElementById("serviceFourStarBar");

const serviceThreeStarBar =
    document.getElementById("serviceThreeStarBar");

const serviceTwoStarBar =
    document.getElementById("serviceTwoStarBar");

const serviceOneStarBar =
    document.getElementById("serviceOneStarBar");

const serviceDescription =
    document.getElementById("serviceDescription");

const serviceFeatures =
    document.getElementById("serviceFeatures");

const serviceTerms =
    document.getElementById("serviceTerms");


// BUTTONS

const backBtn =
    document.getElementById("backBtn");

const bookNowBtn =
    document.getElementById("bookNowBtn");

const backToServicesBtn =
    document.getElementById("backToServicesBtn");

const notFoundBackBtn =
    document.getElementById("notFoundBackBtn");


// DEFAULT DATA


const defaultDescription =
    "Enjoy a comfortable and memorable travel experience with NatureNest. This service is designed to make your journey easier, more convenient and enjoyable.";

const defaultFeatures = [
    "Quality Service",
    "Professional Staff",
    "Customer Support",
    "Convenient Location",
    "Easy Booking"
];

const defaultTerms = [
    "Booking availability may vary.",
    "Prices may change depending on date and availability.",
    "Please confirm your booking information before submission.",
    "Cancellation and availability policies may apply."
];


// SHOW SERVICE NOT FOUND

function showServiceNotFound() {

    if (serviceDetails) {

        serviceDetails.classList.add("hidden");
    }

    if (serviceNotFound) {

        serviceNotFound.classList.remove("hidden");

    }
}


// FORMAT PRICE

function formatPrice(price) {

    if (price === undefined ||price === null ||price === "") {

        return "Price on request";
    }


    if (typeof price === "number") {

        return `PKR ${price.toLocaleString()}`;
    }

    return price;
}


// DISPLAY FEATURES

function renderFeatures(features) {

    if (!serviceFeatures) {

        return;

    }

    serviceFeatures.innerHTML = "";

    if (!Array.isArray(features) ||features.length === 0) {

        features =
            defaultFeatures;
    }

    features.forEach((feature) => {

            const featureCard =
                document.createElement("div");

            featureCard.className = `bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3`;

            featureCard.innerHTML = `

                <div class=" w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    ✓
                </div>

                <p class=" text-gray-700 font-medium">
                    ${feature}
                </p>
            `;

            serviceFeatures.appendChild(featureCard);

        }
    );
}


// DISPLAY TERMS

function renderTerms(terms) {

    if (!serviceTerms) {
        return;
    }

    serviceTerms.innerHTML = "";

    if (!Array.isArray(terms) ||terms.length === 0) {

        terms =
            defaultTerms;

    }

    terms.forEach((term) => {

            const li =
                document.createElement("li");

            li.className = `flex items-start gap-3`;

            li.innerHTML = `

                <span class=" text-orange-500 font-bold">
                    •
                </span>

                <span>
                    ${term}
                </span>

            `;

            serviceTerms.appendChild(li);
        }
    );
}

// SERVICE REVIEWS
let selectedServiceRating = 0;
let currentReviewFilter = "all";


// GET ALL REVIEWS

function getAllServiceReviews() {

    return JSON.parse(localStorage.getItem("natureNestReviews")) || [];

}


// GET CURRENT SERVICE REVIEWS

function getServiceReviews() {

    const allReviews =
        getAllServiceReviews();

    return allReviews.filter(review =>
            review.type === "service" &&String(review.itemId) ===String(selectedService.id));

}



// STAR SELECTION

function setupServiceStarRating() {

    if (!serviceStarRating) {
        return;
    }

    const stars =
        serviceStarRating.querySelectorAll("[data-rating]");

    stars.forEach(star => {

        star.addEventListener("click",() => {

                selectedServiceRating =
                    Number(star.dataset.rating);

                stars.forEach(item => {

                        const rating =
                            Number(item.dataset.rating);

                        item.textContent =
                            rating <=
                            selectedServiceRating
                                ? "★"
                                : "☆";

                        item.classList.toggle(
                            "text-yellow-400",
                            rating <=
                            selectedServiceRating
                        );

                    }
                );

                const ratingLabels = {
                    1: "Poor",
                    2: "Needs Improvement",
                    3: "Average",
                    4: "Good",
                    5: "Excellent"
                };

                if (serviceRatingText) {

                    serviceRatingText.textContent =
                        ratingLabels[selectedServiceRating];
                }
            }
        );
    });
}

// CALCULATE SERVICE RATING

function calculateServiceRating(reviews) {

    if (reviews.length === 0) {

        return 0;

    }

    const total =
        reviews.reduce(
            (sum, review) =>sum + Number(review.rating),0);

    return (total / reviews.length).toFixed(1);

}

// SERVICE RATING STATISTICS

function updateServiceRatingStats(reviews) {

    const total =
        reviews.length;

    const five =
        reviews.filter(
            review =>
                Number(review.rating) === 5).length;

    const four =
        reviews.filter(
            review =>
                Number(review.rating) === 4).length;

    const three =
        reviews.filter(
            review =>
                Number(review.rating) === 3).length;

    const two =
        reviews.filter(
            review =>
                Number(review.rating) === 2).length;

    const one =
        reviews.filter(
            review =>
                Number(review.rating) === 1).length;


    if (serviceAverageRating) {

        serviceAverageRating.textContent =
            calculateServiceRating(reviews);

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

        serviceThreeStarCount.textContent =
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

// RENDER SERVICE REVIEWS

function renderServiceReviews() {

    if (!serviceReviewsList) {
        return;
    }

    const reviews =
        getServiceReviews();

    const filteredReviews =
        currentReviewFilter === "all"
            ? reviews
            : reviews.filter(
                review =>
                    Number(review.rating) ===Number(currentReviewFilter));


    serviceReviewsList.innerHTML = "";


    updateServiceRatingStats(reviews);


    if (filteredReviews.length === 0) {

        noServiceReviews?.classList.remove("hidden");

        return;

    }

    noServiceReviews?.classList.add("hidden");


    filteredReviews.forEach(
        review => {

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

                        <div class=" w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                            ${review.name.charAt(0).toUpperCase()}
                        </div>

                        <div>

                            <h4 class="font-bold text-gray-800">
                                ${review.name}
                            </h4>

                            <p class=" text-xs text-gray-400">
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
                        ${selectedService.name ||selectedService.serviceName ||"Travel Service"}
                    </span>


                    <button type="button" class=" helpful-service-review text-sm text-gray-500 hover:text-emerald-600 font-semibold" data-review-id="${review.id}">
                        👍 Helpful
                        <span>
                            ${review.helpful || 0}
                        </span>
                    </button>

                </div>

            `;

            serviceReviewsList.appendChild(article);

        }
    );

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

        button.addEventListener("click",() => {

                const reviewId =
                    button.dataset.reviewId;


                const allReviews =
                    getAllServiceReviews();


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

                renderServiceReviews();

            }
        );
    });
}


// REVIEW FILTERS

function setupServiceReviewFilters() {

    const filters =
        document.querySelectorAll(".service-review-filter");


    filters.forEach(button => {

        button.addEventListener("click",() => {

                currentReviewFilter =
                    button.dataset.rating;


                filters.forEach(
                    item => {

                        item.classList.remove("bg-emerald-600","text-white");

                        item.classList.add("bg-gray-100","text-gray-700");

                    }
                );

                button.classList.remove("bg-gray-100","text-gray-700");

                button.classList.add("bg-emerald-600","text-white");

                renderServiceReviews();

            }
        );
    });
}

// SUBMIT SERVICE REVIEW

function setupServiceReviewForm() {

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

            if (selectedServiceRating < 1) {

                alert("Please select a rating from 1 to 5 stars.");

                return;

            }


            const reviews =
                getServiceReviews();


            const newReview = {

                id:
                    `service-review-${Date.now()}`,

                type:
                    "service",

                itemId:
                    selectedService.id,

                name:
                    name,

                rating:
                    selectedServiceRating,

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

            saveServiceReviews(reviews);

            serviceReviewForm.reset();


            selectedServiceRating =
                0;


            if (serviceStarRating) {

                serviceStarRating
                    .querySelectorAll("[data-rating]")
                    .forEach(star => {

                            star.textContent =
                                "☆";

                            star.classList.remove(
                                "text-yellow-400"
                            );
                        }
                    );
            }

            if (serviceRatingText) {

                serviceRatingText.textContent =
                    "Select a rating";

            }


            renderServiceReviews();

        }
    );
}


// RENDER SERVICE

function renderService() {

    if (!selectedService) {

        showServiceNotFound();

        return;

    }


    // IMAGE

    if (serviceImage) {

        serviceImage.src =
            selectedService.image ||"/src/assets/default-service.jpg";

        serviceImage.alt =
            selectedService.name ||"Travel Service";

    }


    // CATEGORY

    if (serviceCategory) {

        serviceCategory.textContent =
            selectedService.category ||"Travel Service";

    }


    // NAME

    const name =
        selectedService.name ||selectedService.serviceName ||"Travel Service";


    if (serviceName) {

        serviceName.textContent =
            name;

    }


    if (contentServiceName) {

        contentServiceName.textContent =
            name;

    }


    // LOCATION

    const location =
        selectedService.location ||selectedService.destination ||"Pakistan";


    if (serviceLocation) {

        serviceLocation.textContent =
            `📍 ${location}`;

    }


    if (contentLocation) {

        contentLocation.textContent =
            `📍 ${location}`;

    }


    // PRICE

    if (servicePrice) {

        servicePrice.textContent =
            formatPrice(selectedService.price);

    }


// DYNAMIC RATING & REVIEWS

const currentServiceReviews =
    getServiceReviews();


const currentAverageRating =
    calculateServiceRating(currentServiceReviews);


if (serviceRating) {

    serviceRating.textContent =
        currentServiceReviews.length > 0
            ? currentAverageRating
            : (selectedService.rating ||"4.5");

}


if (serviceReviews) {

    serviceReviews.textContent =
        currentServiceReviews.length > 0
            ? `${currentServiceReviews.length} reviews`
            : "Customer reviews";

}


    // DESCRIPTION

    if (serviceDescription) {

        serviceDescription.textContent =
            selectedService.description ||defaultDescription;

    }


    // FEATURES

    renderFeatures(selectedService.features);


    // TERMS

    renderTerms(selectedService.terms);

}


// BOOK NOW
if (bookNowBtn) {

    bookNowBtn.addEventListener("click",() => {


            localStorage.setItem("selectedService",JSON.stringify(selectedService));

            window.location.href =
                "booking.html";

        }
    );
}


// BACK TO SERVICES

if (backToServicesBtn) {

    backToServicesBtn.addEventListener("click",() => {

            window.location.href =
                "travel-services.html";

        }
    );
}


// HEADER BACK BUTTON

if (backBtn) {

    backBtn.addEventListener("click",() => {

            window.location.href =
                "travel-services.html";

        }
    );
}


// NOT FOUND BACK

if (notFoundBackBtn) {

    notFoundBackBtn.addEventListener("click",() => {

            window.location.href =
                "travel-services.html";

        }
    );
}


// INITIALIZE

renderService();

setupServiceStarRating();

setupServiceReviewFilters();

setupServiceReviewForm();

renderServiceReviews();
import "./style.css";


// =====================================================
// GET SELECTED SERVICE
// =====================================================

let selectedService =
    JSON.parse(
        localStorage.getItem("selectedService")
    );


// =====================================================
// DOM ELEMENTS
// =====================================================

const serviceDetails =
    document.getElementById(
        "serviceDetails"
    );

const serviceNotFound =
    document.getElementById(
        "serviceNotFound"
    );


// =====================================================
// SERVICE ELEMENTS
// =====================================================

const serviceImage =
    document.getElementById(
        "serviceImage"
    );

const serviceCategory =
    document.getElementById(
        "serviceCategory"
    );

const serviceName =
    document.getElementById(
        "serviceName"
    );

const serviceLocation =
    document.getElementById(
        "serviceLocation"
    );

const contentServiceName =
    document.getElementById(
        "contentServiceName"
    );

const contentLocation =
    document.getElementById(
        "contentLocation"
    );

const servicePrice =
    document.getElementById(
        "servicePrice"
    );

const serviceRating =
    document.getElementById(
        "serviceRating"
    );

const serviceReviews =
    document.getElementById(
        "serviceReviews"
    );

const serviceDescription =
    document.getElementById(
        "serviceDescription"
    );

const serviceFeatures =
    document.getElementById(
        "serviceFeatures"
    );

const serviceTerms =
    document.getElementById(
        "serviceTerms"
    );


// =====================================================
// BUTTONS
// =====================================================

const backBtn =
    document.getElementById(
        "backBtn"
    );

const bookNowBtn =
    document.getElementById(
        "bookNowBtn"
    );

const backToServicesBtn =
    document.getElementById(
        "backToServicesBtn"
    );

const notFoundBackBtn =
    document.getElementById(
        "notFoundBackBtn"
    );


// =====================================================
// DEFAULT DATA
// =====================================================

/*
    Agar kisi service mein description,
    features ya terms nahi honge,
    to yeh default values use hongi.
*/

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


// =====================================================
// SHOW SERVICE NOT FOUND
// =====================================================

function showServiceNotFound() {

    if (serviceDetails) {

        serviceDetails.classList.add(
            "hidden"
        );

    }

    if (serviceNotFound) {

        serviceNotFound.classList.remove(
            "hidden"
        );

    }

}


// =====================================================
// FORMAT PRICE
// =====================================================

function formatPrice(price) {

    if (
        price === undefined ||
        price === null ||
        price === ""
    ) {

        return "Price on request";

    }


    // Agar price number hai

    if (
        typeof price === "number"
    ) {

        return `PKR ${price.toLocaleString()}`;

    }


    return price;

}


// =====================================================
// DISPLAY FEATURES
// =====================================================

function renderFeatures(features) {

    if (!serviceFeatures) {

        return;

    }


    serviceFeatures.innerHTML = "";


    if (
        !Array.isArray(features) ||
        features.length === 0
    ) {

        features =
            defaultFeatures;

    }


    features.forEach(
        (feature) => {

            const featureCard =
                document.createElement(
                    "div"
                );


            featureCard.className = `
                bg-gray-50
                border
                border-gray-100
                rounded-2xl
                p-4
                flex
                items-center
                gap-3
            `;


            featureCard.innerHTML = `

                <div
                    class="
                        w-10
                        h-10
                        rounded-full
                        bg-emerald-100
                        text-emerald-700
                        flex
                        items-center
                        justify-center
                        font-bold
                    "
                >
                    ✓
                </div>

                <p
                    class="
                        text-gray-700
                        font-medium
                    "
                >
                    ${feature}
                </p>

            `;


            serviceFeatures.appendChild(
                featureCard
            );

        }
    );

}


// =====================================================
// DISPLAY TERMS
// =====================================================

function renderTerms(terms) {

    if (!serviceTerms) {

        return;

    }


    serviceTerms.innerHTML = "";


    if (
        !Array.isArray(terms) ||
        terms.length === 0
    ) {

        terms =
            defaultTerms;

    }


    terms.forEach(
        (term) => {

            const li =
                document.createElement(
                    "li"
                );


            li.className = `
                flex
                items-start
                gap-3
            `;


            li.innerHTML = `

                <span
                    class="
                        text-orange-500
                        font-bold
                    "
                >
                    •
                </span>

                <span>
                    ${term}
                </span>

            `;


            serviceTerms.appendChild(
                li
            );

        }
    );

}


// =====================================================
// RENDER SERVICE
// =====================================================

function renderService() {

    if (!selectedService) {

        showServiceNotFound();

        return;

    }


    // =============================================
    // IMAGE
    // =============================================

    if (serviceImage) {

        serviceImage.src =
            selectedService.image ||
            "/src/assets/default-service.jpg";

        serviceImage.alt =
            selectedService.name ||
            "Travel Service";

    }


    // =============================================
    // CATEGORY
    // =============================================

    if (serviceCategory) {

        serviceCategory.textContent =
            selectedService.category ||
            "Travel Service";

    }


    // =============================================
    // NAME
    // =============================================

    const name =
        selectedService.name ||
        selectedService.serviceName ||
        "Travel Service";


    if (serviceName) {

        serviceName.textContent =
            name;

    }


    if (contentServiceName) {

        contentServiceName.textContent =
            name;

    }


    // =============================================
    // LOCATION
    // =============================================

    const location =
        selectedService.location ||
        selectedService.destination ||
        "Pakistan";


    if (serviceLocation) {

        serviceLocation.textContent =
            `📍 ${location}`;

    }


    if (contentLocation) {

        contentLocation.textContent =
            `📍 ${location}`;

    }


    // =============================================
    // PRICE
    // =============================================

    if (servicePrice) {

        servicePrice.textContent =
            formatPrice(
                selectedService.price
            );

    }


    // =============================================
    // RATING
    // =============================================

    if (serviceRating) {

        serviceRating.textContent =
            selectedService.rating ||
            "4.5";

    }


    // =============================================
    // REVIEWS
    // =============================================

    if (serviceReviews) {

        const reviews =
            selectedService.reviews ||
            selectedService.reviewCount ||
            0;


        if (reviews > 0) {

            serviceReviews.textContent =
                `${reviews} reviews`;

        }
        else {

            serviceReviews.textContent =
                "Customer reviews";

        }

    }


    // =============================================
    // DESCRIPTION
    // =============================================

    if (serviceDescription) {

        serviceDescription.textContent =
            selectedService.description ||
            defaultDescription;

    }


    // =============================================
    // FEATURES
    // =============================================

    renderFeatures(
        selectedService.features
    );


    // =============================================
    // TERMS
    // =============================================

    renderTerms(
        selectedService.terms
    );

}


// =====================================================
// BOOK NOW
// =====================================================

if (bookNowBtn) {

    bookNowBtn.addEventListener(
        "click",
        () => {

            /*
                Selected service ko dobara save kar rahe hain
                taake booking page use kar sake.
            */

            localStorage.setItem(
                "selectedService",
                JSON.stringify(
                    selectedService
                )
            );


            /*
                Booking page par redirect
            */

            window.location.href =
                "booking.html";

        }
    );

}


// =====================================================
// BACK TO SERVICES
// =====================================================

if (backToServicesBtn) {

    backToServicesBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "travel-services.html";

        }
    );

}


// =====================================================
// HEADER BACK BUTTON
// =====================================================

if (backBtn) {

    backBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "travel-services.html";

        }
    );

}


// =====================================================
// NOT FOUND BACK
// =====================================================

if (notFoundBackBtn) {

    notFoundBackBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "travel-services.html";

        }
    );

}


// =====================================================
// INITIALIZE
// =====================================================

renderService();

import { destinations } from "./destination.js";
import { services } from "./services-data.js";


// DOM ELEMENTS

const reviewType =
    document.getElementById("reviewType");

const reviewItem =
    document.getElementById("reviewItem");

const stars =
    document.querySelectorAll("#starRating button");

const reviewerName =
    document.getElementById("reviewerName");

const reviewText =
    document.getElementById("reviewText");

const submitReview =
    document.getElementById("submitReview");

const reviewMessage =
    document.getElementById("reviewMessage");

const ratingText =
    document.getElementById("ratingText");


// SELECTED RATING

let selectedRating = 0;

// LOAD DESTINATIONS / SERVICES
function populateReviewItems() {

    const type =
        reviewType.value;

    // Clear dropdown

    reviewItem.innerHTML = "";

    if (!type) {

        reviewItem.disabled = true;

        reviewItem.innerHTML = `
            <option value="">
                First select type
            </option>
        `;

        return;
    }


    reviewItem.disabled = false;


    // DESTINATIONS

    if (type === "destination") {

        reviewItem.innerHTML = `
            <option value="">
                Select destination
            </option>
        `;


        Object.entries(destinations)
            .forEach(
                ([id, destination]) => {

                    const option =
                        document.createElement("option");

                    option.value = id;

                    option.textContent =
                        `${destination.title} - ${destination.location}`;

                    reviewItem.appendChild(option);

                }
            );
    }

    // SERVICES

    if (type === "service") {

        reviewItem.innerHTML = `
            <option value="">
                Select service
            </option>
        `;


        services.forEach(service => {

                const option =
                    document.createElement("option");

                option.value =
                    service.id;

                option.textContent =
                    `${service.name} - ${service.location}`;

                reviewItem.appendChild(option);
            }
        );
    }
}


// TYPE CHANGE

reviewType.addEventListener("change",populateReviewItems);


// STAR RATING

stars.forEach(star => {

    star.addEventListener("click",() => {

            selectedRating =
                Number(star.dataset.rating);

            updateStars();

        }
    );
});


// UPDATE STARS

function updateStars() {

    stars.forEach(star => {

        const rating =
            Number(star.dataset.rating);


        if (rating <=selectedRating) {

            star.textContent = "★";

            star.classList.add("text-yellow-400");

            star.classList.remove("text-gray-300");

        } else {

            star.textContent = "☆";

            star.classList.remove("text-yellow-400");

            star.classList.add("text-gray-300");
        }
    });


    if (selectedRating > 0) {

        ratingText.textContent =
            `${selectedRating} / 5`;

    } else {

        ratingText.textContent =
            "Select your rating";

    }
}


// GET REVIEWS

function getReviews() {

    return JSON.parse(localStorage.getItem("natureNestReviews")) || [];

}


// SAVE REVIEW

function saveReview(review) {

    const reviews =
        getReviews();

    reviews.push(review);

    localStorage.setItem("natureNestReviews",JSON.stringify(reviews)
    );
}


// SUBMIT REVIEW

submitReview.addEventListener("click",() => {

        const type =
            reviewType.value;

        const itemId =
            reviewItem.value;

        const name =
            reviewerName.value.trim();

        const text =
            reviewText.value.trim();


        // VALIDATION

        if (!type) {

            showMessage("Please select Destination or Service.","error");

            return;
        }


        if (!itemId) {

            showMessage("Please select a destination or service.","error");

            return;
        }

        if (!name) {

            showMessage("Please enter your name.","error");

            return;
        }


        if (selectedRating === 0) {

            showMessage("Please select a rating.","error");

            return;
        }


        if (!text) {

            showMessage("Please write your review.","error");

            return;
        }


        // GET ITEM NAME

        let itemName = "";


        if (type === "destination") {

            itemName =
                destinations[itemId]?.title|| itemId;

        }


        if (type === "service") {

            const service =
                services.find(item =>
                        String(item.id) ===String(itemId));

            itemName =
                service?.name|| itemId;
        }


        // CREATE REVIEW

        const newReview = {

            id:
                `review-${Date.now()}`,

            type:
                type,

            itemId:
                itemId,

            name:
                name,

            rating:
                selectedRating,

            text:
                text,

            date:
                new Date().toLocaleDateString("en-US",
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }
                ),

            helpful:
                0

        };


        // SAVE

        saveReview(newReview);

        // SUCCESS MESSAGE

        showMessage(`Your review for ${itemName} has been submitted successfully!`,"success");


        // RESET

        reviewType.value = "";

        reviewItem.innerHTML = `
            <option value="">
                First select type
            </option>
        `;

        reviewItem.disabled = true;

        reviewText.value = "";
        reviewerName.value = "";

        selectedRating = 0;

        updateStars();
    }
);


// SHOW MESSAGE

function showMessage(message,type) {

    reviewMessage.textContent =
        message;


    if (type === "success") {

        reviewMessage.className =
            "text-center mt-4 font-medium text-emerald-600";

    } else {

        reviewMessage.className =
            "text-center mt-4 font-medium text-red-500";
    }
}


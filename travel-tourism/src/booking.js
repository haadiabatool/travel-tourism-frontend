import "./style.css";


// GET SELECTED SERVICE

const selectedService =
    JSON.parse(localStorage.getItem("selectedService"));


// GET SELECTED TRIP ID FROM URL

const urlParams =
    new URLSearchParams(window.location.search);

const selectedTripId =
    urlParams.get("tripId");

// DOM ELEMENTS

const bookingForm =
    document.getElementById("bookingForm");

const bookingSummarySection =
    document.getElementById("bookingSummarySection");

const bookingSummary =
    document.getElementById("bookingSummary");

const confirmationSection =
    document.getElementById("confirmationSection");


// SELECTED SERVICE ELEMENTS

const selectedServiceImage =
    document.getElementById("selectedServiceImage");

const selectedServiceName =
    document.getElementById("selectedServiceName");

const selectedServiceLocation =
    document.getElementById("selectedServiceLocation");

const selectedServiceCategory =
    document.getElementById("selectedServiceCategory");

const selectedServicePrice =
    document.getElementById("selectedServicePrice");

const bookingService =
    document.getElementById("bookingService");

const estimatedTotal =
    document.getElementById("estimatedTotal");


// FORM INPUTS

const fullName =
    document.getElementById("fullName");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const bookingDate =
    document.getElementById("bookingDate");

const numberOfPeople =
    document.getElementById("numberOfPeople");

const specialRequest =
    document.getElementById("specialRequest");


// ERROR ELEMENTS

const fullNameError =
    document.getElementById("fullNameError");

const emailError =
    document.getElementById("emailError");

const phoneError =
    document.getElementById("phoneError");

const bookingDateError =
    document.getElementById("bookingDateError");

const peopleError =
    document.getElementById("peopleError");


// OTHER BUTTONS

const backBtn =
    document.getElementById("backBtn");

const confirmBookingBtn =
    document.getElementById("confirmBookingBtn");

const doneBtn =
    document.getElementById("doneBtn");


// SERVICE NOT FOUND

if (!selectedService) {

    alert("No service selected.");

    window.location.href =
        "travel-services.html";
}


// SERVICE NAME

const serviceName =
    selectedService?.name ||selectedService?.serviceName ||"Travel Service";


// SERVICE LOCATION

const serviceLocation =
    selectedService?.location ||selectedService?.destination ||"Pakistan";


// SERVICE CATEGORY

const serviceCategory =
    selectedService?.category ||"Travel Service";


// SERVICE PRICE

let servicePrice =
    Number(selectedService?.price) || 0;


// FORMAT PRICE

function formatPrice(amount) {

    return `PKR ${Number(amount).toLocaleString()}`;

}


// DISPLAY SELECTED SERVICE

function displaySelectedService() {

    if (!selectedService) {

        return;

    }


    // IMAGE

    if (selectedServiceImage) {

        selectedServiceImage.src =
            selectedService.image ||"/src/assets/default-service.jpg";

        selectedServiceImage.alt =
            serviceName;

    }


    // NAME

    if (selectedServiceName) {

        selectedServiceName.textContent =
            serviceName;

    }


    // LOCATION

    if (selectedServiceLocation) {

        selectedServiceLocation.textContent =
            `📍 ${serviceLocation}`;

    }


    // CATEGORY

    if (selectedServiceCategory) {

        selectedServiceCategory.textContent =
            serviceCategory;

    }


    // PRICE

    if (selectedServicePrice) {

        selectedServicePrice.textContent =
            formatPrice(servicePrice);

    }


    // FORM SERVICE

    if (bookingService) {

        bookingService.value =
            serviceName;

    }

}


// TODAY DATE

const today =
    new Date().toISOString().split("T")[0];


if (bookingDate) {

    bookingDate.min =today;

}


// CALCULATE TOTAL

function calculateTotal() {

    const people =
        Number(numberOfPeople?.value) || 1;


    const total =
        servicePrice *people;


    if (estimatedTotal) {

        estimatedTotal.textContent =
            formatPrice(total);

    }

    return total;

}


// PEOPLE CHANGE

if (numberOfPeople) {

    numberOfPeople.addEventListener("input",calculateTotal);

}


// ERROR FUNCTIONS

function showError(element,message) {

    if (!element) {

        return;

    }

    element.textContent =
        message;


    element.classList.remove("hidden");

}


function clearError(element) {

    if (!element) {

        return;
    }

    element.textContent ="";

    element.classList.add("hidden");

}

// CLEAR ALL ERRORS

function clearAllErrors() {

    clearError(fullNameError);

    clearError(emailError);

    clearError(phoneError);

    clearError(bookingDateError);

    clearError(peopleError);

}


// VALIDATE EMAIL

function isValidEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

}

// VALIDATE PHONE

function isValidPhone(value) {

    const cleaned =
        value.replace(/[\s-]/g,"");


    return /^(\+92|03)\d{9}$/.test(cleaned);
}


// VALIDATE FORM

function validateForm() {

    clearAllErrors();

    let isValid = true;

    // FULL NAME

    const name =
        fullName.value.trim();


    if (!name) {

        showError(fullNameError,"Please enter your full name.");

        isValid = false;

    }
    else if (name.length < 3) {

        showError(fullNameError,"Name must be at least 3 characters.");

        isValid = false;

    }

    // EMAIL

    const emailValue =
        email.value.trim();


    if (!emailValue) {

        showError(emailError,"Please enter your email address.");

        isValid = false;

    }
    else if (!isValidEmail(emailValue)) {

        showError(emailError,"Please enter a valid email address.");

        isValid = false;

    }

    // PHONE

    const phoneValue =
        phone.value.trim();


    if (!phoneValue) {

        showError(phoneError,"Please enter your phone number.");

        isValid = false;

    }
    else if (!isValidPhone(phoneValue)) {

        showError(phoneError,"Please enter a valid Pakistani phone number.");

        isValid = false;

    }


    // BOOKING DATE

    if (!bookingDate.value) {

        showError(bookingDateError,"Please select a booking date.");

        isValid = false;

    }
    else if (bookingDate.value < today) {

        showError(bookingDateError,"Booking date cannot be in the past.");

        isValid = false;

    }

    // PEOPLE

    const people =
        Number(numberOfPeople.value);


    if (!numberOfPeople.value) {

        showError(peopleError,"Please enter the number of people.");

        isValid = false;

    }
    else if (people < 1 ||people > 50) {

        showError(peopleError,"Number of people must be between 1 and 50.");

        isValid = false;

    }

    return isValid;
}


// CREATE BOOKING SUMMARY

function createBookingSummary(booking) {

    if (!bookingSummary) {

        return;

    }

    bookingSummary.innerHTML = `

        <div class=" flex justify-between gap-4 border-b border-gray-100 pb-4">

            <span class="text-gray-500">
                Customer Name
            </span>

            <strong class="text-gray-800 text-right">
                ${booking.fullName}
            </strong>

        </div>


        <div class="flex justify-between gap-4 border-b border-gray-100 pb-4">

            <span class="text-gray-500">
                Selected Service
            </span>

            <strong class="text-gray-800 text-right">
                ${booking.service}
            </strong>

        </div>


        <div class="flex justify-between gap-4 border-b border-gray-100 pb-4">

            <span class="text-gray-500">
                Booking Date
            </span>

            <strong class="text-gray-800">
                ${booking.date}
            </strong>

        </div>


        <div class="flex justify-between gap-4 border-b border-gray-100 pb-4">

            <span class="text-gray-500">
                Number of People
            </span>

            <strong class="text-gray-800">
                ${booking.people}
            </strong>

        </div>


        <div class="flex justify-between gap-4 border-b border-gray-100 pb-4">

            <span class="text-gray-500">
                Price Per Person
            </span>

            <strong class="text-gray-800">
                ${formatPrice(booking.price)}
            </strong>

        </div>


        <div class="flex justify-between gap-4 border-b border-gray-100 pb-4">

            <span class="text-gray-500">
                Total Amount
            </span>

            <strong class="text-emerald-700 text-xl">
                ${formatPrice(booking.total)}
            </strong>

        </div>


        <div class="flex justify-between gap-4">

            <span class="text-gray-500">
                Booking Status
            </span>

            <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                Pending
            </span>

        </div>

        ${
            booking.specialRequest
                ? `
                    <div class="bg-gray-50 rounded-xl p-4 mt-4">

                        <p class=" text-sm text-gray-500 mb-1">
                            Special Request
                        </p>

                        <p class="text-gray-700">
                            ${booking.specialRequest}
                        </p>

                    </div>
                `
                : ""
        }

    `;

}


// FORM SUBMIT

let currentBooking = null;


if (bookingForm) {

    bookingForm.addEventListener("submit",(event) => {

            event.preventDefault();

            // VALIDATION

            if (!validateForm()) {

                return;

            }

            // CALCULATE TOTAL

            const people =
                Number(numberOfPeople.value);


            const total =
                calculateTotal();


            // CREATE BOOKING OBJECT

            currentBooking = {

                id:
                    Date.now().toString(),

                bookingId:
                    "TRV-" +Math.floor(10000 +Math.random() *90000),

                tripId:
                    selectedTripId,

                fullName:
                    fullName.value.trim(),

                email:
                    email.value.trim(),

                phone:
                    phone.value.trim(),

                service:
                    serviceName,

                serviceId:
                    selectedService.id ||"",

                category:
                    serviceCategory,

                location:
                    serviceLocation,

                date:
                    bookingDate.value,

                people:
                    people,

                price:
                    servicePrice,

                total:
                    total,

                specialRequest:
                    specialRequest.value.trim(),

                status:
                    "Pending",

                createdAt:
                    new Date().toISOString()

            };

            // SHOW SUMMARY

            createBookingSummary(currentBooking);


            bookingForm.parentElement.classList.add("hidden");

            bookingSummarySection.classList.remove("hidden");

            bookingSummarySection.scrollIntoView({behavior: "smooth"});

        }
    );

}


// CONFIRM BOOKING

if (confirmBookingBtn) {

    confirmBookingBtn.addEventListener("click",() => {

            if (!currentBooking) {

                return;

            }

            // GET EXISTING BOOKINGS
                    
            const bookings =
                JSON.parse(localStorage.getItem("natureNestBookings")) || [];


            // SAVE BOOKING

            bookings.push(currentBooking);

            localStorage.setItem("natureNestBookings",JSON.stringify(bookings));


            // SAVE SELECTED SERVICE BOOKING

            localStorage.setItem("lastBooking",JSON.stringify(currentBooking));


            // SHOW CONFIRMATION

            bookingSummarySection.classList.add("hidden");


            confirmationSection.classList.remove("hidden");


            const bookingId =
                document.getElementById("bookingId");


            if (bookingId) {

                bookingId.textContent =
                    currentBooking.bookingId;

            }

            confirmationSection.scrollIntoView({behavior: "smooth"});

        }
    );

}


// BACK BUTTON

if (backBtn) {

    backBtn.addEventListener("click",() => {

            window.location.href =
                "service-details.html";

        }
    );

}


// DONE BUTTON

if (doneBtn) {

    doneBtn.addEventListener("click",() => {

            window.location.href =
                "travel-services.html";

        }
    );

}

// INITIALIZE

displaySelectedService();

calculateTotal();
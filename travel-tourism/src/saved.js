import './style.css'
import { destinations } from "./destination.js";


// ==================================================
// GET SAVED DESTINATIONS
// ==================================================

let savedDestinations =
    JSON.parse(
        localStorage.getItem("savedDestinations")
    ) || [];


// ==================================================
// DOM
// ==================================================

const savedGrid =
    document.getElementById("savedGrid");

const emptySaved =
    document.getElementById("emptySaved");

const savedCount =
    document.getElementById("savedCount");


// ==================================================
// CREATE SAVED DESTINATION CARD
// ==================================================

function createSavedCard(
    destination,
    id
) {

    if (!destination) {

        return "";

    }


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
                flex
                flex-col
                group
            "
        >


            <!-- ==================================================
                 IMAGE
            ================================================== -->

            <div
                class="
                    relative
                    h-52
                    overflow-hidden
                "
            >

                <img
                    src="${destination.image || ""}"
                    alt="${destination.title || "Destination"}"
                    class="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-500
                    "
                >


                <!-- DARK OVERLAY -->

                <div
                    class="
                        absolute
                        inset-0
                        bg-linear-to-t
                        from-black/30
                        via-transparent
                        to-transparent
                    "
                >
                </div>


                <!-- SAVED BADGE -->

                <div
                    class="
                        absolute
                        top-3
                        left-3
                        bg-emerald-50
                        text-black-600
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-bold
                        shadow-sm
                    "
                >

                    🔖 Saved

                </div>

            </div>



            <!-- ==================================================
                 CONTENT
            ================================================== -->

            <div
                class="
                    p-5
                    flex
                    flex-col
                    flex-1
                "
            >

            <div class="flex">
                <!-- TITLE -->

                <h3
                    class="
                        text-xl
                        font-bold
                        text-gray-800
                        mb-1
                        line-clamp-1
                    "
                >
                    ${destination.title || "Untitled Destination"}
                </h3>

                <!-- CATEGORY -->

                <div
                    class="
                        mb-3
                    "
                >

                    <span
                        class="
                            inline-flex
                            items-center
                            w-fit
                            bg-gray-100
                            text-gray-600
                            px-3
                            py-1
                            mt-1
                            m-2
                            rounded-full
                            text-xs
                            font-semibold
                        "
                    >
                        ${destination.category || "Nature"}
                    </span>

                </div>
            </div>


                <!-- LOCATION -->

                <p
                    class="
                        text-sm
                        text-emerald-700
                        font-semibold
                        mb-3
                    "
                >
                    📍 ${destination.location || "Unknown location"}
                </p>


                


                <!-- DESCRIPTION -->

                <p
                    class="
                        text-sm
                        text-gray-600
                        leading-relaxed
                        line-clamp-3
                        mb-5
                    "
                >
                    ${destination.description || "Discover this beautiful destination."}
                </p>


                <!-- ==================================================
                     BUTTONS
                ================================================== -->

                <div
                    class="
                        mt-auto
                        flex
                        gap-2
                    "
                >


                    <!-- EXPLORE -->

                    <button
                        type="button"
                        onclick="
                            window.location.href =
                            'explore-destination.html?id=${encodeURIComponent(id)}'
                        "
                        class="
                            flex-1
                            bg-emerald-600
                            hover:bg-emerald-700
                            text-white
                            px-4
                            py-2.5
                            rounded-xl
                            font-semibold
                            text-sm
                            transition
                        "
                    >
                        Explore
                    </button>


                    <!-- REMOVE -->

                    <button
                        type="button"
                        onclick="
                            removeSavedDestination('${String(id).replace(/'/g, "\\'")}')
                        "
                        class="
                            px-4
                            py-2.5
                            rounded-xl
                            bg-gray-100
                            hover:bg-gray-200
                            text-gray-600
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


// ==================================================
// RENDER SAVED DESTINATIONS
// ==================================================

function renderSavedDestinations() {

    // ----------------------------------------------
    // CHECK GRID
    // ----------------------------------------------

    if (!savedGrid) {

        console.error(
            "savedGrid element not found."
        );

        return;

    }


    // ----------------------------------------------
    // CLEAR GRID
    // ----------------------------------------------

    savedGrid.innerHTML = "";


    // ----------------------------------------------
    // UPDATE COUNT
    // ----------------------------------------------

    if (savedCount) {

        savedCount.textContent =
            savedDestinations.length;

    }


    // ----------------------------------------------
    // EMPTY
    // ----------------------------------------------

    if (
        savedDestinations.length === 0
    ) {

        if (emptySaved) {

            emptySaved.classList.remove(
                "hidden"
            );

        }

        return;

    }


    // ----------------------------------------------
    // HIDE EMPTY
    // ----------------------------------------------

    if (emptySaved) {

        emptySaved.classList.add(
            "hidden"
        );

    }


    // ----------------------------------------------
    // CREATE CARDS
    // ----------------------------------------------

    savedDestinations.forEach(
        function (id) {

            const destination =
                destinations[id];


            // Destination doesn't exist

            if (!destination) {

                console.warn(
                    "Saved destination not found:",
                    id
                );

                return;

            }


            savedGrid.innerHTML +=
                createSavedCard(
                    destination,
                    id
                );

        }
    );

}


// ==================================================
// REMOVE SAVED DESTINATION
// ==================================================

window.removeSavedDestination =
    function (id) {

        // ------------------------------------------
        // REMOVE FROM ARRAY
        // ------------------------------------------

        savedDestinations =
            savedDestinations.filter(
                function (item) {

                    return (
                        String(item) !==
                        String(id)
                    );

                }
            );


        // ------------------------------------------
        // UPDATE LOCAL STORAGE
        // ------------------------------------------

        localStorage.setItem(
            "savedDestinations",
            JSON.stringify(
                savedDestinations
            )
        );


        // ------------------------------------------
        // RENDER AGAIN
        // ------------------------------------------

        renderSavedDestinations();

    };


// ==================================================
// INITIAL LOAD
// ==================================================

renderSavedDestinations();
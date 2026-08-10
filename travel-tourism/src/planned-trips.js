import './style.css'
import { destinations } from "./destination.js";

let plannedTrips =
    JSON.parse(
        localStorage.getItem("plannedTrips")
    ) || [];


const grid =
    document.getElementById(
        "plannedTripsGrid"
    );

const empty =
    document.getElementById(
        "emptyPlannedTrips"
    );


// ==================================================
// CREATE CARD
// ==================================================

function createTripCard(destination, id) {

    return `

        <div
            class="
                bg-white
                rounded-2xl
                overflow-hidden
                border border-gray-100
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                flex flex-col
            "
        >

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
                        hover:scale-105
                        transition-transform
                        duration-500
                    "
                >

                <span
                    class="
                        absolute
                        top-3
                        left-3
                        bg-emerald-50
                        text-black
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-bold
                    "
                >
                    ✈️ Planned
                </span>

            </div>


            <div
                class="
                    p-5
                    flex
                    flex-col
                    flex-1
                "
            >

            <div class="flex">

                <h2
                    class="
                        text-xl
                        font-bold
                        text-gray-800
                        mb-1
                    "
                >
                    ${destination.title || "Untitled Destination"}
                </h2>


                <span
                    class="
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
                        mb-3
                    "
                >
                    ${destination.category || ""}
                </span>
            </div>

                <p
                    class="
                        text-sm
                        text-emerald-700
                        font-semibold
                        mb-3
                    "
                >
                    📍 ${destination.location || ""}
                </p>


                


                <p
                    class="
                        text-sm
                        text-gray-600
                        leading-relaxed
                        line-clamp-3
                        mb-5
                    "
                >
                    ${destination.description || ""}
                </p>



                <div
                    class="
                        mt-auto
                        flex
                        gap-2
                    "
                >

                    <button
                        onclick="
                            window.location.href =
                            'explore-destination.html?id=${id}'
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
                        "
                    >
                        View Trip
                    </button>


                    <button
                        onclick="
                            removeTrip('${id}')
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
                        "
                    >
                        Remove
                    </button>

                </div>

            </div>

        </div>

    `;
}


// ==================================================
// RENDER
// ==================================================

function renderTrips() {

    grid.innerHTML = "";


    if (plannedTrips.length === 0) {

        empty.classList.remove("hidden");

        return;
    }


    empty.classList.add("hidden");


    plannedTrips.forEach((id) => {

        const destination =
            destinations[id];

        if (!destination) {
            return;
        }

        grid.innerHTML +=
            createTripCard(
                destination,
                id
            );

    });

}


// ==================================================
// REMOVE
// ==================================================

window.removeTrip = function (id) {

    plannedTrips =
        plannedTrips.filter(
            item =>
                String(item) !== String(id)
        );


    localStorage.setItem(
        "plannedTrips",
        JSON.stringify(plannedTrips)
    );


    renderTrips();

};


// ==================================================

renderTrips();
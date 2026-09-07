import './style.css'

import { destinationsData } from "./destination-data.js";

document.addEventListener("DOMContentLoaded", () => {

    const container =
         document.getElementById("recommendationCards");

    const summaryContainer = 
        document.getElementById("userPrefSummary");

    // 1. SessionStorage se preferences retrieve karein
    const prefData = 
        sessionStorage.getItem("userTravelPreferences");

    if (!prefData) {

        if (container) {

            container.innerHTML = `

                <div class="col-span-full text-center py-12">

                    <p class="text-gray-500 text-lg">
                        No preferences selected yet.
                    </p>

                    <a href="index.html" class="mt-4 inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold">
                        Set Preferences on Home Page
                    </a>

                </div>
            `;
        }

        return;
    }

    const preferences = JSON.parse(prefData);

    // Summary Bar update
    if (summaryContainer) {

        summaryContainer.innerHTML = `

            <div>

                <strong>Category:</strong> ${preferences.category} |

                <strong>Budget:</strong> ${preferences.budget} | 

                <strong>Type:</strong> ${preferences.travelType} | 

                <strong>Duration:</strong> ${preferences.duration} Days | 

                <strong>Travelers:</strong> ${preferences.travelers}

            </div>

            <a href="index.html" class="underline text-emerald-700 font-bold hover:text-emerald-900">Change Criteria</a>
        `;
    }

    // 2. Matching Category Pick Karein
    const categoryKey =
         (preferences.category || "").toLowerCase();

    let matches = [];

    if (categoryKey.includes("mountain") && destinationsData.mountains) {

        matches = [...destinationsData.mountains];

    } else if (categoryKey.includes("beach") && destinationsData.beaches) {

        matches = [...destinationsData.beaches];

    } else if (categoryKey.includes("historic") && destinationsData.historical) {

        matches = [...destinationsData.historical];

    } else if (categoryKey.includes("nature") && destinationsData.wildlife) {

        matches = [...destinationsData.wildlife];

    } else if (destinationsData[categoryKey]) {

        matches = [...destinationsData[categoryKey]];

    } else {

        matches = [...(destinationsData.popular || []), ...(destinationsData.mountains || [])];

    }

    // 3. Dynamic Filtering Based on Selected Budget
    const userBudget = preferences.budget || "Medium";

    let filteredMatches = [];

    if (matches.length > 0) {

        if (userBudget === "Budget") {

            // Budget/Low: 
            filteredMatches = matches.slice(0, 2);

        } else if (userBudget === "Luxury") {
            
            // High/Luxury:
            filteredMatches = matches.length >= 2 ? matches.slice(-2) : matches;

        } else {
            // Medium/Moderate: 
            if (matches.length >= 4) {

                filteredMatches = matches.slice(2, 3);

            } else if (matches.length >= 2) {

                filteredMatches = matches.slice(0, 2);

            } else {

                filteredMatches = matches;

            }
        }
    }

    // 4. Price Calculation Logic based on Location & Budget
    function calculateCost(place, budget) {

        const isPak = (place.location || "").toLowerCase().includes("pakistan");

        if (isPak) {

            if (budget === "Budget") return "PKR 18,000 - 28,000 / person";

            if (budget === "Luxury") return "PKR 85,000 - 130,000 / person";

            return "PKR 40,000 - 60,000 / person";

        } else {

            if (budget === "Budget") return "$350 - $600 / person";

            if (budget === "Luxury") return "$2,200 - $3,500 / person";

            return "$1,100 - $1,700 / person";

        }
    }

    // 5. Recommendation Reason Generator
    function getRecommendationReason(place, pref) {

        return `Specially matched for your <strong>${pref.travelType}</strong> trip plan. Fits your <strong>${pref.budget}</strong> budget for a <strong>${pref.duration}-day</strong> getaway with <strong>${pref.travelers} traveler(s)</strong>.`;

    }

    // 6. Render Filtered Cards
    if (container && filteredMatches.length > 0) {

        container.innerHTML = "";

        filteredMatches.forEach(place => {

            const cost =    
                 calculateCost(place, preferences.budget);

            const reason = 
                getRecommendationReason(place, preferences);

            const title = place.name || place.title || "Destination";

            const cardHTML = `

            <div class="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-slate-100 flex flex-col">
                <!-- Destination Image -->
                <div class="relative h-52 overflow-hidden bg-slate-200">

                    <img src="${place.image}" alt="${title}" 
                         onerror="this.src='https://via.placeholder.com/600x400?text=Destination+Image'"
                         class="w-full h-full object-cover group-hover:scale-105 transition duration-500">

                    <div class="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        ⭐ ${place.rating || '4.5'}
                    </div>

                </div>

                <!-- Content Body -->
                <div class="p-6 flex flex-col flex-1">

                    <h3 class="text-xl font-bold text-slate-800 mb-1">
                        ${title}
                    </h3>

                    <p class="text-xs font-semibold text-emerald-600 mb-3">
                        📍 ${place.location}
                    </p>

                    <!-- Estimated Cost -->
                    <div class="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 mb-4">

                        <span class="text-[11px] uppercase font-bold text-emerald-800 tracking-wider block">
                            Estimated Cost
                        </span>

                        <span class="text-sm font-extrabold text-emerald-900">
                            ${cost}
                        </span>

                    </div>

                    <!-- Why Recommended -->
                    <div class="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4 text-xs text-slate-600 flex-1">

                        <span class="font-bold text-slate-700 block mb-1">
                            💡 Why it is recommended:
                        </span>

                        <p>
                            ${reason}
                        </p>

                    </div>

                    <!-- View Details Button -->
                    <button onclick="window.location.href='explore-destination.html?id=${place.id}'"
                            class="w-full mt-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition text-xs shadow-md shadow-emerald-100">
                        View Details →
                    </button>

                </div>
            </div>
            `;
            container.innerHTML += cardHTML;

        });

    } else if (container) {

        container.innerHTML = `

            <div class="col-span-full text-center py-12">

                <p class="text-gray-500 text-lg">
                    No matching destinations found for selected criteria.
                </p>

            </div>
        `;

    }
});
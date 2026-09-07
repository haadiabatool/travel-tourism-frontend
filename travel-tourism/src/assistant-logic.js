// Toggle Assistant Modal
window.toggleAssistant = function () {

    const modal =
         document.getElementById("assistantModal");

    if (modal) {

        modal.classList.toggle("hidden");

    }
};

// Interactive Q&A Response Handler
window.askAssistant = function (question) {

    const chatHistory = 
        document.getElementById("chatHistory");

    if (!chatHistory) return;

    // 1. Render User Question Bubble
    const userBubble = `

        <div class="flex justify-end">

            <div class="bg-emerald-600 text-white p-3 rounded-2xl rounded-tr-none text-xs max-w-[85%] shadow-sm">
                ${question}
            </div>

        </div>
    `;

    chatHistory.innerHTML += userBubble;

    chatHistory.scrollTop = chatHistory.scrollHeight;

    // 2. Determine Predefined Answer Response (Updated matching 30 Destinations Data)
    let responseHTML = "";

    if (question.includes("Where should I travel")) {

        responseHTML = `

            <p class="font-semibold mb-1">
                Top Recommended Categories & Destinations:
            </p>

            <ul class="list-disc list-inside space-y-1 text-gray-600">

                <li>
                    <strong>Mountains:</strong> Hunza Valley, Fairy Meadows,Rakaposhi.
                </li>

                <li>
                    <strong>Beaches:</strong> Whitehaven Beach,Grace Bay Beach Kund Malir.
                </li>

                <li>
                    <strong>Historical:</strong>Machu Picchu Mohenjo-Daro, Lahore Fort.
                </li>

                <li>
                    <strong>Wildlife & Nature:</strong> Deosai National Park,Moab.
                </li>

            </ul>
        `;

    } else if (question.includes("What can I do there")) {

        responseHTML = `

            <p class="font-semibold mb-1">
                Top Activities Across Destinations:
            </p>

            <ul class="list-disc list-inside space-y-1 text-gray-600">

                <li>
                    Boating & Jet Skiing at Attabad Lake & Rawal Lake
                </li>

                <li>
                    Trekking to K2 Basecamp & Fairy Meadows
                </li>

                <li>
                    Himalayan Brown Bear Spotting in Deosai Plains
                </li>

                <li>
                    Coastal Cliff Cliff Diving & Beach Camping in Ormara/Gwadar
                </li>

                <li>
                    Heritage Walks in Lahore Fort & Mohenjo-Daro
                </li>

            </ul>
        `;

    } else if (question.includes("low budget")) {

        responseHTML = `

            <p>
                <strong>Budget-Friendly Destination Picks (Under PKR 25,000 - 35,000):</strong>
            </p>

            <p class="mt-1 text-gray-600">

                • <strong>Naran Kaghan :</strong> Best for affordable group tours and public transport access.<br>

                • <strong> Temples:Fairy Meadows,Rakaposhi:</strong> Perfect budget day-trips with zero entry friction.<br>

                • <strong>Kund Malir Beach:</strong> Great for low-cost road trips along the Coastal Highway.

            </p>
        `;
    } else if (question.includes("suitable for families")) {

        responseHTML = `

            <p>
                <strong>Top Family-Friendly Places:</strong>
            </p>

            <p class="mt-1 text-gray-600">

                • <strong>Hunza Valley:</strong> Safe, carpeted roads, peaceful walking tracks, and luxury family resorts.<br>

                • <strong> Deosai National Park,Moab:</strong> Beautiful lush meadows with easy jeep access for kids and elders.<br>

                • <strong>Lahore Heritage Loop:</strong> Badshahi Mosque & Shalimar Gardens offer smooth walking paths and cultural richness.

            </p>
        `;

    } else {

        responseHTML = "<p>Select any quick question above to get tailored destination recommendations!</p>";
    }

    // 3. Render Assistant Response Bubble with realistic Delay
    setTimeout(() => {

        const assistantBubble = `

            <div class="flex justify-start">

                <div class="bg-white border border-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-none text-xs max-w-[85%] shadow-sm leading-relaxed">
                    ${responseHTML}
                </div>

            </div>
        `;

        chatHistory.innerHTML += assistantBubble;

        chatHistory.scrollTop = chatHistory.scrollHeight;

    }, 350);
    
};
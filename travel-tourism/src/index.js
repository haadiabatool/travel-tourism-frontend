import { destinationsData } from './destination-data.js';

// 1. Dynamic Stars Generator Helper (Fixed Rating-to-Stars Logic)
function renderStarsHTML(rating) {

  let starsHTML = '';

  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 1; i <= 5; i++) {

    if (i <= Math.floor(roundedRating)) {

      // Full Star
      starsHTML += `<span class="text-orange-400">★</span>`;

    } else if (i - 0.5 === roundedRating) {

      // Half Star
      starsHTML += `<span class="text-orange-400 opacity-20">★</span>`;

    } else {

      // Empty Star
      starsHTML += `<span class="text-gray-300">★</span>`;

    }
  }

  return starsHTML;
}

// 2. Generic Card Component
function createCardHTML(item) {

  const itemRating = 
      typeof item.rating === 'number' ? item.rating : parseFloat(item.rating) || 0;

  return `

    <div class="destination-card group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-neutral-100/80"
         data-name="${item.name}" data-location="${item.location}">

      <div class="relative overflow-hidden aspect-4/3">

        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">

        <div class="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          <span>${item.name}</span>
        </div>

      </div>

      <div class="px-4 pt-2 text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2">

        <span class="text-emerald-700">
              ${item.location}
        </span>

      </div>

      <div class="flex-1 mb-4">

        <p class="px-4 font-sans font-normal text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
          ${item.description}
        </p>

      </div>

      <div class="px-4 flex flex-row items-center relative mb-2">

        <p class="font-sans font-normal text-neutral-600 mr-1 text-xs">
          Rating:
        </p>

        <div class="destination-stars flex items-center text-sm">
          ${renderStarsHTML(itemRating)}
        </div>

        <span class="destination-rating text-orange-400 ml-1 font-semibold text-xs">
          ${itemRating.toFixed(1)}
        </span>

      </div>

      <div class="mt-auto flex justify-center pb-3">

        <button onclick="window.location.href='explore-destination.html?id=${item.id}'"
                class="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-4xl text-xs sm:text-sm font-sans font-semibold tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-100/50 overflow-hidden transition-all duration-300 ease-out active:scale-95 shadow-sm hover:shadow hover:bg-emerald-600 hover:text-white hover:border-emerald-600 group/btn">

          <span class="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ease-out group-hover/btn:translate-x-full"></span>

          <span class="relative z-10">
            Explore Destination
          </span>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 relative z-10 transition-all duration-300 ease-out group-hover/btn:translate-x-1 group-hover/btn:scale-110">

            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />

          </svg>

        </button>

      </div>

    </div>
  `;
}

// 3. Render Category Cards Function
function renderCategory(categoryId, containerId, filterText = '') {

  const container =
     document.getElementById(containerId);

  const headingWrapper = 
    document.querySelector(`.destination.${categoryId}`);

  if (!container || !destinationsData[categoryId]) return;

  const items = destinationsData[categoryId].filter(item => {

    const nameMatch =
       item.name ? item.name.toLowerCase().includes(filterText) : false;

    const locationMatch = 
      item.location ? item.location.toLowerCase().includes(filterText) : false;

    const searchNameMatch = 
      item.searchName ? item.searchName.toLowerCase().includes(filterText) : false;

    const searchLocationMatch = 
      item.searchLocation ? item.searchLocation.toLowerCase().includes(filterText) : false;

    return nameMatch || locationMatch || searchNameMatch || searchLocationMatch;

  });

  if (items.length > 0) {

    if (headingWrapper) headingWrapper.style.display = 'block';

    container.style.display = 'grid';

    container.innerHTML = items.map(item => createCardHTML(item)).join('');

  } else {

    if (headingWrapper) headingWrapper.style.display = 'none';

    container.style.display = 'none';

    container.innerHTML = '';

  }
}

// 4. Master Render Function
function renderAll(filterText = '', selectedCategory = 'all') {

  const categories = [

    { key: 'beaches', container: 'beaches-container', filterKey: 'beach' },

    { key: 'mountains', container: 'mountains-container', filterKey: 'mountain' },

    { key: 'historical', container: 'historical-container', filterKey: 'historical' },

    { key: 'adventure', container: 'adventure-container', filterKey: 'adventure' },

    { key: 'cultural', container: 'cultural-container', filterKey: 'cultural' },

    { key: 'wildlife', container: 'wildlife-container', filterKey: 'wildlife' },

    { key: 'popular', container: 'popular-container', filterKey: 'popular-destination' }

  ];

  categories.forEach(cat => {

    const isCategorySelected = 
      selectedCategory === 'all' || selectedCategory === cat.filterKey;

    if (isCategorySelected) {

      renderCategory(cat.key, cat.container, filterText);

    } else {

      const headingWrapper = 
        document.querySelector(`.destination.${cat.key}`);

      const sectionContainer = 
        document.getElementById(cat.container);

      if (headingWrapper) headingWrapper.style.display = 'none';

      if (sectionContainer) {

        sectionContainer.style.display = 'none';

        sectionContainer.innerHTML = '';

      }
    }
  });
}

// 5. Initialize Page Events
document.addEventListener('DOMContentLoaded', () => {

  renderAll();

  const searchInput =
     document.getElementById('searchInput');

  const categoryFilter = 
    document.getElementById('categoryFilter');

  if (searchInput) {

    searchInput.addEventListener('input', (e) => {

      const query = e.target.value.toLowerCase().trim();

      const currentCategory = categoryFilter ? categoryFilter.value : 'all';

      renderAll(query, currentCategory);

    });
  }

  if (categoryFilter) {

    categoryFilter.addEventListener('change', (e) => {

      const selectedCategory = e.target.value;

      const currentQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

      renderAll(currentQuery, selectedCategory);
      
    });
  }
});
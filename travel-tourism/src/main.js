import './style.css'
window.addEventListener("DOMContentLoaded", () => {

const menuBtn = 
  document.getElementById('menu-btn');

const mobileMenu =
  document.getElementById('mobile-menu');

const iconClosed = 
  document.getElementById('menu-icon-closed');

const iconOpen = 
  document.getElementById('menu-icon-open');

const mobileLinks = 
  document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    // Menu classes swap configuration
    const isOpen =
       mobileMenu.classList.contains('-translate-y-full');
    
    if (isOpen) {
      // Menu opens smoothly

      mobileMenu.classList.remove('-translate-y-full', 'opacity-0');

      mobileMenu.classList.add('translate-y-0', 'opacity-100');

      iconClosed.classList.add('hidden');

      iconOpen.classList.remove('hidden');

    } else {

      // Menu closes smoothly
      mobileMenu.classList.remove('translate-y-0', 'opacity-100');

      mobileMenu.classList.add('-translate-y-full', 'opacity-0');

      iconClosed.classList.remove('hidden');

      iconOpen.classList.add('hidden');

    }
  }

  menuBtn.addEventListener('click', toggleMenu);


  mobileLinks.forEach(link => {

    link.addEventListener('click', toggleMenu);

  });


});


document.addEventListener('DOMContentLoaded', () => {

const searchInput = 
    document.getElementById('searchInput');

const categoryFilter = 
  document.getElementById('categoryFilter');

const destinationCards = 
  document.querySelectorAll('.destination-card');

  function filterDestinations() {

    const query =
       searchInput ? searchInput.value.toLowerCase().trim() : '';

    const selectedCategory = 
      categoryFilter ? categoryFilter.value : 'all';

    // 1. Cards Filtering (Search + Category)
    destinationCards.forEach((card) => {

      const cardName = 
        (card.getAttribute('data-name') || '').toLowerCase();

      const cardLocation = 
        (card.getAttribute('data-location') || '').toLowerCase();

      const cardText = 
        card.textContent.toLowerCase();

      // Search matching check
      const matchesSearch =
         query === '' || cardName.includes(query) || cardLocation.includes(query) || cardText.includes(query);

      // Category matching check
      const matchesCategory = 
        selectedCategory === 'all' || card.closest(`.destination.${selectedCategory}`) !== null;

      if (matchesSearch && matchesCategory) {

        card.classList.remove('hidden');

      } else {

        card.classList.add('hidden');

      }
    });

    // 2. Section Headings Control
    // Category classes: beach, mountain, historical, adventure, cultural, wildlife, popular-destination
    const categories = ['beach', 'mountain', 'historical', 'adventure', 'cultural', 'wildlife', 'popular-destination'];

    categories.forEach((cat) => {

      // Find heading divs & grid sections for this category

      const categoryElements =
         document.querySelectorAll(`.destination.${cat}`);

      // Find visible cards inside this category

      const visibleCards = 
        document.querySelectorAll(`.destination.${cat} .destination-card:not(.hidden)`);

      categoryElements.forEach((el) => {

        // Dropdown selection check
        const isCategorySelected = 
          (selectedCategory === 'all' || selectedCategory === cat);

        // Heading aur Grid tabhi dikhenge jab Category select ho AUR usme koi matching card visible ho
        if (isCategorySelected && visibleCards.length > 0) {

          el.classList.remove('hidden');

        } else {

          el.classList.add('hidden');

        }
      });
    });
  }

  // Event Listeners
  if (searchInput) {

    searchInput.addEventListener('input', filterDestinations);

  }


  if (categoryFilter) {

    categoryFilter.addEventListener('change', filterDestinations);
    
  }
});
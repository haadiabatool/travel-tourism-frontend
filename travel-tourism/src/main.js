import './style.css'
window.addEventListener("DOMContentLoaded", () => {

const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconClosed = document.getElementById('menu-icon-closed');
  const iconOpen = document.getElementById('menu-icon-open');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    // Menu classes swap configuration
    const isOpen = mobileMenu.classList.contains('-translate-y-full');
    
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

  // Event listener button click par toggle karega
  menuBtn.addEventListener('click', toggleMenu);

  // Agar kisi mobile link par click ho to menu khud band ho jaye
  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });


// For button destination filtering

const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".destination");


buttons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        buttons.forEach(btn => {
            btn.classList.remove("bg-green-600","text-white");
            btn.classList.add("bg-white");
        });

        button.classList.remove("bg-white");
        button.classList.add("bg-green-600","text-white");

        cards.forEach(card => {

            if(filter === "all"){

                card.classList.remove("hidden");

            }else{

                if(card.classList.contains(filter)){
                    card.classList.remove("hidden");
                }else{
                    card.classList.add("hidden");
                }

            }

        });

    });

});


});


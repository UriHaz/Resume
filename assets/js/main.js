/**
* Template Name: MyResume - v4.10.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
   
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  } 
  
  /*

let backtotop = select('.back-to-top');

  //  backtotop.classList.add('active');


if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100 || !hasClass(document.body, 'modal-open')) {
      backtotop.classList.add('active');
    } else if(window.scrollY > 100){
      backtotop.classList.remove('active');
    }
  };

  window.addEventListener('load', toggleBacktotop);
  onscroll(document, toggleBacktotop);

  // Check if modal is open and remove 'active' class
  document.addEventListener('click', () => {
    if (hasClass(document.body, 'modal-open')) {
      backtotop.classList.remove('active');
    } else {
      toggleBacktotop();
    }
  });

}
*/


  
  

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

	document.addEventListener('click', function(event) {
  const menu = select('.mobile-nav-toggle')
  if (menu && !menu.contains(event.target) && select('body').classList.contains('mobile-nav-active')) {
    select('body').classList.remove('mobile-nav-active')
    menu.classList.remove('bi-x')
    menu.classList.add('bi-list')
  }
})
	
  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
   /* let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  } */
  
  let preloader = document.querySelector('#preloader');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.remove();
  });
  window.addEventListener('scroll', () => {
    preloader.remove();
  });
}

 

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
   /*
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }*/
  
  let skillsContent = document.querySelector('.skills-content');

if (skillsContent) {
  let progressBars = document.querySelectorAll('.progress .progress-bar');

  let waypoint = new Waypoint({
    element: skillsContent,
    offset: '80%',
    handler: function(direction) {
      if (direction === 'down') {
        progressBars.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
      else if (direction === 'up') {
        progressBars.forEach((el) => {
          el.style.width = '0';
        });
      }
    }
  });
}


  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
   
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false
    })
  }); 
  
  
  
  


  /**
   * Initiate Pure Counter 
   */
  new PureCounter();
  
  // Get the modal
  
 // Get the modal element and the menu element
var menu = document.getElementById("navbar");
var hamburger = document.getElementsByClassName("mobile-nav-toggle")[0];


var body = document.getElementsByTagName("body")[0];
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
  menu.classList.add("hidden");
  backtotop.classList.remove('active');
  hamburger.classList.add('hidden');
  body.classList.add("modal-open");

}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  mmodal.style.opacity = "0";
    setTimeout(function() {
    modal.style.display = "none";
    modal.style.opacity = "1";
    menu.classList.remove("hidden");
	backtotop.classList.add('active');
	body.classList.remove("modal-open");
	hamburger.classList.remove('hidden');


  }, 500); // adjust the duration of the fade-out here (in milliseconds)
}



// When the user clicks on the modal, fade it out and then close it
modal.onclick = function() {
  modal.style.opacity = "0";
  setTimeout(function() {
    modal.style.display = "none";
    modal.style.opacity = "1";
    menu.classList.remove("hidden");
	backtotop.classList.add('active');
	body.classList.remove("modal-open");
	hamburger.classList.remove('hidden');


  }, 500); // adjust the duration of the fade-out here (in milliseconds)
}

// When the user presses the Esc key or Back key, close the modal
document.addEventListener('keydown', function(event) {
  if ((event.key === 'Escape' || event.key === 'Esc' || event.key === 'Backspace') && modal.style.display !== 'none') {
	modal.style.opacity = "0";
  setTimeout(function() {
    modal.style.display = "none";
    modal.style.opacity = "1";
    menu.classList.remove("hidden");
	backtotop.classList.add('active');
	body.classList.remove("modal-open");
	hamburger.classList.remove('hidden');


  }, 500)

  }
});






// ...





})()





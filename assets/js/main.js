/**
* Template Name: eNno
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/enno-free-simple-bootstrap-template/
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
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
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

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
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
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

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
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

document.addEventListener('DOMContentLoaded', function () {
  const chatbotIcon = document.getElementById('chatbot-icon');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const userInputElement = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const chatbotBody = document.getElementById('chatbot-body');

  chatbotIcon.addEventListener('click', function () {
      chatbotWindow.style.display = 'block';
      chatbotIcon.style.display='none';
  });

  chatbotCloseBtn.addEventListener('click', function () {
      chatbotWindow.style.display = 'none';
      chatbotIcon.style.display='block';

  });

  // Define a JavaScript Map to store legal rights Q&A in India
const legalRightsInIndiaMap = new Map();

// Add legal rights Q&A to the Map
legalRightsInIndiaMap.set('What are fundamental rights in India?', 'Fundamental rights are a set of legal rights guaranteed to the citizens of India by the Constitution. They include the right to equality, right to freedom, rights against exploitation, right to freedom of religion, cultural and educational rights, and constitutional remedies.');

legalRightsInIndiaMap.set('What is the right to equality?', 'The right to equality ensures equality before the law and prohibits discrimination on the grounds of religion, race, caste, sex, or place of birth.');

legalRightsInIndiaMap.set('What is the right to freedom?', 'The right to freedom includes freedom of speech and expression, freedom to assemble peacefully, freedom to form associations or unions, and freedom to move freely throughout India.');

legalRightsInIndiaMap.set('What are the rights against exploitation?', 'Rights against exploitation prohibit forced labor and child labor. They aim to prevent the exploitation of vulnerable individuals, especially children.');

legalRightsInIndiaMap.set('What is the right to freedom of religion?', 'The right to freedom of religion guarantees individuals the freedom to profess, practice, and propagate the religion of their choice. It also protects religious institutions from government interference.');

legalRightsInIndiaMap.set('What are cultural and educational rights?', 'Cultural and educational rights protect the rights of minorities to establish and administer educational institutions of their choice. They aim to preserve the cultural and educational autonomy of minority communities.');

legalRightsInIndiaMap.set('What are constitutional remedies?', 'Constitutional remedies provide legal mechanisms for individuals to enforce their fundamental rights through writ petitions and other legal avenues.');

legalRightsInIndiaMap.set('Who are fundamental rights applicable to?', 'Fundamental rights are primarily applicable to Indian citizens, but some of these rights are available to foreigners as well.');

legalRightsInIndiaMap.set('Can fundamental rights be restricted?', 'Yes, fundamental rights can be restricted by the government under specific circumstances, such as national security or public order, but these restrictions must be reasonable and in accordance with the law.');

legalRightsInIndiaMap.set('What legal remedies are available if fundamental rights are violated?', 'Individuals can approach the courts, including the Supreme Court and High Courts, to seek legal remedies if their fundamental rights are violated. They can file writ petitions and other legal actions for redressal.');

// Accessing information from the Map
const question = 'What is the right to freedom?';
console.log(legalRightsInIndiaMap.get(question));



  sendButton.addEventListener('click', function () {
      const userMessage = userInputElement.value.trim();
      if (userMessage !== '') {
          addUserMessage(userMessage);
          // Simulate a response from the chatbot (you can replace this with actual logic)
          setTimeout(function () {
            if(userMessage=='Hi'|| userMessage=='hi'){
              const response = getChatbotResponse("Hello!");
              addChatbotMessage(response);
            }
            else{
              const response = getChatbotResponse(legalRightsInIndiaMap.get(userMessage));
              addChatbotMessage(response);
              }
             
          }, 500);
          userInputElement.value = '';
      }
  });

  // Function to add user message to the chat window
  function addUserMessage(message) {
      const userMessageDiv = document.createElement('div');
      userMessageDiv.className = 'chat-message sent';
      userMessageDiv.textContent = message;
      chatbotBody.appendChild(userMessageDiv);
  }

  // Function to add chatbot message to the chat window
  function addChatbotMessage(message) {
      const chatbotMessageDiv = document.createElement('div');
      chatbotMessageDiv.className = 'chat-message received';
      chatbotMessageDiv.textContent = message;
      chatbotBody.appendChild(chatbotMessageDiv);
  }

  // Simulated chatbot response (replace with your logic)
  function getChatbotResponse(userMessage) {
      // Replace this with your own logic for generating chatbot responses
      // For now, just echo the user's message
      
      return  userMessage;
  }
});

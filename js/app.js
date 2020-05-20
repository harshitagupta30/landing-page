/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

const navbar__menu = document.getElementsByTagName('nav');
const navbar__list = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const toTop__btn = document.getElementById('toTop__btn');
let currentActiveElem = document.querySelector('.active');
const firstSection = document.querySelector('main section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

const buildNavList = () => {
    for (section of sections) {
        const currentSectionId = section.getAttribute('id');
        if (section.attributes['data-nav']) {
            const currentSectionName = section.getAttribute('data-nav');
            let link = document.createElement('a');
            let navbar__item = document.createElement('li');
            link.textContent = currentSectionName;
            link.classList.add('menu__link');
            link.setAttribute('id', `${currentSectionId}__link`);
            link.setAttribute('href', `#${currentSectionId}`);
            if (section.classList.contains('active')) {
                link.classList.add('active');
            }
            navbar__item.setAttribute('class', 'navbar__item');
            navbar__item.onclick = function(e) {
                e.preventDefault();
                // Scroll to anchor ID using scrollIntoView event
                document.querySelector(`#${currentSectionId}`).scrollIntoView({
                    behavior: 'smooth'
                });
            }
            navbar__item.appendChild(link);
            navbar__list.append(navbar__item);
        }
    }
}

const isElementInViewPort = (element) => {
    let rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

const showCurrentActiveSection = () => {
    let navbar__list__links = document.querySelectorAll('nav ul li a');
    for (link of navbar__list__links) {
        let section = document.querySelector(link.hash);
        if (section.classList.contains('active') && section === currentActiveElem) {

            link.classList.add('active');
        } else {
            section.classList.remove('active');
            link.classList.remove('active');
            if (isElementInViewPort(section)) {
                // Add class 'active' to section when near top of viewport
                currentActiveElem.classList.add('active');
                link.classList.add('active');
                currentActiveElem = section;
            }
        }
    }
}

const scrollToTop = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTop__btn.style.display = "block";
    } else {
        toTop__btn.style.display = "none";
    }
}

const toTop = () => {
    firstSection.scrollIntoView(true);
    firstSection.classList.add('active');
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

function init() {
    // build the nav
    buildNavList();
    toTop__btn.addEventListener("click", toTop);
}

function onScroll() {
    showCurrentActiveSection();
    scrollToTop();
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('scroll', onScroll);
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}
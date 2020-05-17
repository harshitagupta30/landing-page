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
const sections = document.getElementsByTagName('section');
let currentActiveElem = document.querySelector('.active');

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

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

function init() {
    // build the nav
    buildNavList();
}

function addActiveToLink() {
    for (section of sections) {
        if (section.classList.contains('active') && section === currentActiveElem) {
            // do nothing

        } else {
            section.classList.remove('active');
            if (isElementInViewPort(section)) {
                // Add class 'active' to section when near top of viewport
                currentActiveElem.classList.add('active');
                currentActiveElem = section;
            }
        }
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
 */

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('scroll', addActiveToLink);
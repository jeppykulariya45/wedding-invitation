

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('floating');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); 
    else scrollUp.classList.remove('show-scroll');
    document.getElementById('floating-toggle').classList.remove("active");
}
window.addEventListener('scroll', scrollUp)

/*=============== SHOW & HIDE MENU ===============*/
const toggleButton = document.getElementById('floating-toggle')

const activeMenu = () => {
    toggleButton.classList.toggle('active')
}


toggleButton.addEventListener('click', activeMenu)



// Function to fetch sunrise and sunset times using the Sunrise Sunset API
async function getSunriseSunset() {
    try {
      const response = await fetch('https://api.sunrise-sunset.org/json?lat=20.5937&lng=78.9629&formatted=0');
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching sunrise and sunset data:', error);
      return null;
    }
  }
  
  // Function to determine if it's currently day or night based on sunrise and sunset times
  function isDaytime(sunrise, sunset) {
    const now = new Date();
    return now >= new Date(sunrise) && now <= new Date(sunset);
  }
  
  // Function to update the body class based on the time of day
  function updateBodyClass() {
    getSunriseSunset().then(results => {
      if (results) {
        const { sunrise, sunset } = results;
        const isDay = isDaytime(sunrise, sunset);
        document.body.classList.toggle('dark-mode', isDay);
        document.body.classList.toggle('light-mode', !isDay);
      }
    });
  }
  
  // Call the updateBodyClass function to set the initial body class
  updateBodyClass();
  
  // Set up an interval to update the body class every minute (in milliseconds)
  setInterval(updateBodyClass, 60 * 1000);
  



  // ================= GSAP Hero Entrance Animation =================
  document.addEventListener('DOMContentLoaded', function () {
    // Ensure GSAP is available
    if (typeof gsap === 'undefined') return;

    const left = document.querySelector('.hero-names .name-left');
    const right = document.querySelector('.hero-names .name-right');
    const amp = document.querySelector('.hero-names .amp') || document.querySelector('.amp');
    const gif = document.querySelector('.gif');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // initial state
    gsap.set([left, right, amp], { autoAlpha: 0, y: 20 });
    if (gif) gsap.set(gif, { autoAlpha: 0, scale: 0.9 });

    tl.to(left, { duration: 0.8, autoAlpha: 1, y: 0, x: -6, rotation: -1 })
      .to(right, { duration: 0.8, autoAlpha: 1, y: 0, x: 6, rotation: 1 }, '-=0.6')
      .fromTo(amp, { scale: 0.8, autoAlpha: 0 }, { duration: 0.6, scale: 1, autoAlpha: 1 }, '-=0.4')
      .to(gif, { duration: 0.6, autoAlpha: 1, scale: 1 }, '-=0.3')
      .to([left, right], { duration: 1.4, y: -8, repeat: -1, yoyo: true, ease: 'sine.inOut' }, '+=0.8');

    // Optional: re-play subtle entrance when hero scrolls into view using ScrollTrigger
    try {
      if (gsap && gsap.registerPlugin) {
        // If ScrollTrigger is loaded, hook a simple reveal
        if (typeof ScrollTrigger !== 'undefined') {
          gsap.from('.hero-names', {
            scrollTrigger: {
              trigger: '.hero',
              start: 'top 80%'
            },
            duration: 0.9,
            y: 20,
            autoAlpha: 0,
            ease: 'power2.out'
          });
        }
      }
    } catch (e) {
      // fail silently if ScrollTrigger isn't available
      console.warn('ScrollTrigger unavailable or GSAP error', e);
    }
  });





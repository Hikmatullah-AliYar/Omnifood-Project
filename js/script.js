// *************
// Make Mobile Navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// /////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    //   Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      //   console.log(sectionEl);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

///////////////
// Stick Navigation
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
        document.body.classList.add('sticky');
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
 },
    {
  // in the viewport
  root: null,
  threshold: 0,
  rootMargin:'-80px', 
});
obs.observe(sectionHeroEl);
/**
 The diagram is showing how the **`threshold`** value changes when the IntersectionObserver callback gets triggered:

threshold: 0 (left)** → The callback runs as soon as the **section-hero** just touches the viewport (even 1px visible).
* **threshold: 0.5 (middle)** → The callback runs when **half of the section-hero** is inside the viewport.
* **threshold: 1 (right)** → The callback runs only when the **entire section-hero** is fully inside the viewport.

So basically, the threshold is the "percentage of visibility" required before the observer reacts.

👉 Do you want me to also rewrite this diagram with clearer labels (instead of "scrolling" / "veavily") so it’s even easier to read?
 */

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

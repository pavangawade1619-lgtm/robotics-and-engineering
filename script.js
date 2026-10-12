
/* ==================================
   1. MOBILE NAVIGATION
================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});


/* ==================================
   2. SCROLL REVEAL ANIMATIONS
================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


/* ==================================
   3. STAGGERED CARD ANIMATIONS
================================== */

document.querySelectorAll(
  ".service-grid, .project-grid"
).forEach((grid) => {
  grid.querySelectorAll(".reveal").forEach((card, index) => {
    card.style.transitionDelay = `${(index % 4) * 100}ms`;
  });
});


/* ==================================
   4. AUTOMATIC COPYRIGHT YEAR
================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* ==================================
   5. CONTACT FORM DEMO
================================== */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();

  formStatus.textContent =
    `Thanks, ${name}! Your form is valid. ` +
    "This demo does not send messages yet.";

  contactForm.reset();
});


/* ==================================
   6. IMAGE LOADING FALLBACK
================================== */

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.opacity = "0.25";
    img.alt = "Image unavailable — replace this image URL.";
  });
});

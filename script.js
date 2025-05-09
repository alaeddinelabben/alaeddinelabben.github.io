// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Sticky header
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;
  const heroSection = document.querySelector("#hero");

  window.addEventListener("scroll", function () {
    if (window.scrollY > headerHeight) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Form submission logic would go here
      // For now, we'll just show a success message
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  // Skill animation - add animation when skills are visible
  const skillLists = document.querySelectorAll(".skill-list");

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleSkillAnimation() {
    skillLists.forEach((list) => {
      if (isInViewport(list) && !list.classList.contains("animated")) {
        list.classList.add("animated");
        const items = list.querySelectorAll("li");
        items.forEach((item, index) => {
          item.style.animation = `fadeInRight 0.5s ease forwards ${
            index * 0.1
          }s`;
        });
      }
    });
  }

  // Add scroll event for animations
  window.addEventListener("scroll", handleSkillAnimation);
  handleSkillAnimation(); // Initial check

  // Add CSS animation for skills
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
  document.head.appendChild(style);

  // Update current year in footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector('.preloader');
  
  if (preloader) {
    window.addEventListener('load', function() {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
    
    // Fallback if load event already fired
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1500);
  }
  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav ul li a");

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", function() {
      nav.classList.toggle("active");
      
      // Change icon based on menu state
      const icon = this.querySelector("i");
      if (nav.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        const icon = mobileNavToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });

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
 

  emailjs.init("XVBZLNZcvzJUpFexT");


  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !subject || !message) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Send email using EmailJS
      emailjs.send("service_uvduwuw", "template_aa8z5tm", {
        from_name: 'Ala Eddine Labben Portfolio',
        from_email: 'alalbn1999@gmail.com',
        subject: subject,
        message: `Email from ${name} (${email}): \n ${message}`,
        to_name: "Ala Eddine Labben",
      }).then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
          showNotification("Thank you for your message! I will get back to you soon.", "success");
          contactForm.reset();
          
          // Reset button state
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        },
        function(error) {
          console.error("FAILED...", error);
          showNotification("Failed to send message. Please try again or contact me directly via email.", "error");
          
          // Reset button state
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      );
    });
  }

  // Notification function
  function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Hide and remove notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
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
  
  // Form input focus effects
  const formInputs = document.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focus');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focus');
      }
    });
    
    // Check on load if input has value
    if (input.value !== '') {
      input.parentElement.classList.add('focus');
    }
  });
  
  // Add animation class when scrolling to elements
  const animatedElements = document.querySelectorAll('.section-title, .about-content, .project-card, .skill-category, .timeline-item, .contact-info, form');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

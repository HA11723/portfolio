document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");

  // Theme toggle functionality
  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  };

  const updateThemeIcon = (theme) => {
    const icon = themeToggle.querySelector("i");
    if (theme === "light") {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);

    // Update meta theme color for mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        newTheme === "light" ? "#ffffff" : "#111"
      );
    }
  };

  // Initialize theme
  initTheme();

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Toggle mobile menu
  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
      const isActive = navLinks.classList.toggle("active");
      menuIcon.classList.toggle("active");
      document.body.classList.toggle("menu-open", isActive);
    });

    // Close menu on link click
    const menuLinks = navLinks.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuIcon.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // Scroll animation: reveal sections on scroll
  const sections = document.querySelectorAll(
    ".profile-container, .skills, .experience, .about-hero, .about-section, .quote-section, .contact-hero, .contact-info, .contact-form-section, .social-connect"
  );
  const revealSection = () => {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      if (sectionTop < window.innerHeight - sectionHeight / 5) {
        section.classList.add("visible");
      }
    });
  };

  if (sections.length > 0) {
    revealSection();
    window.addEventListener("scroll", revealSection);
  }

  // Mobile hover support
  const hoverTargets = document.querySelectorAll(
    ".project-card, .skill-card, .info-card, .value-item, .projects-btn, .social-icon, .social-card, .submit-btn, .contact-method"
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("touchstart", () => el.classList.add("hover"), {
      passive: true,
    });
    el.addEventListener("touchend", () => {
      setTimeout(() => el.classList.remove("hover"), 400);
    });
  });

  // Typing animation under specialization
  const phrases = [
    { text: "Passionate about AI", color: "#2db7ba" },
    { text: "Focused on clean code", color: "#2db7ba" },
    { text: "Committed to user-focused design", color: "#2db7ba" },
  ];

  const rotatingText = document.getElementById("rotatingText");

  if (rotatingText) {
    let i = 0;
    const typeNext = () => {
      const phrase = phrases[i];
      let charIndex = 0;
      const line = document.createElement("span");
      line.style.color = phrase.color;
      rotatingText.innerHTML = ""; 
      rotatingText.appendChild(line);

      const typeChar = () => {
        if (charIndex < phrase.text.length) {
          line.textContent += phrase.text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, Math.random() * 50 + 50); // Randomized typing speed
        } else {
          i = (i + 1) % phrases.length;
          setTimeout(typeNext, 1500);
        }
      };

      typeChar();
    };

    typeNext();
  }

  // Skill card flip functionality
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click event from bubbling up to document
      card.classList.toggle("flipped");

      skillCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("flipped");
        }
      });
    });
  });

  // Close card when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".skill-card")) {
      skillCards.forEach((card) => {
        card.classList.remove("flipped");
      });
    }
  });
});

// navigation menu
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");
  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);
  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    bodyScrollingToggle();
    fadeOutEffect();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 500);
  }

  const aboutBtn = document.querySelector("#about-btn");
  const aboutLink = document.querySelector("#about-link");
  const hireBtn = document.querySelector("#hire-btn");
  const contactLink = document.querySelector("#contact-link");

  aboutBtn.addEventListener("click", () => {
    aboutLink.classList.add("active");
  });

  hireBtn.addEventListener("click", () => {
    contactLink.classList.add("active");
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        event.preventDefault();
        const hash = event.target.hash;
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        if (navMenu.classList.contains("open")) {
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");

          navItems.forEach((item) => {
            if (hash === item.hash) {
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        window.location.hash = hash;
      }
    }
  });
})();
/*--------- about sections tabs ---------*/

(() => {
  const aboutSection = document.querySelector(".about-section");
  const tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("tab-item") &&
      !e.target.classList.contains("active")
    ) {
      const target = e.target.getAttribute("data-target");
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");

      e.target.classList.add("outer-shadow", "active");

      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");

      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hide-scrolling");
}

//portolio popup
(() => {
  const filterContainer = document.querySelector(".portfolio-filter");
  const portfolioItemsContainer = document.querySelector(".portfolio-items");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const popup = document.querySelector(".portfolio-popup");
  const prevBtn = popup.querySelector(".pp-prev");
  const nextBtn = popup.querySelector(".pp-next");
  const closeBtn = popup.querySelector(".pp-close");
  const projectDetailsContainer = popup.querySelector(".pp-details");
  const projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;

      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );

      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });
  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });
  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }
  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];

    const popupImg = popup.querySelector(".pp-img");
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + "of" + screenshots.length;
  }
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails() {
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return;
    }
    projectDetailsBtn.style.display = "block";
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join("");
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });
  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

// Hide all section except current
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

const loader = document.querySelector(".loader");
const body1 = document.querySelector("body");
const header = document.querySelector("#home");
const header1 = document.querySelector("header");
const styleSwitcher1 = document.querySelector(".style-switcher1");
header.style.visibility = "hidden";
header1.style.visibility = "hidden";
styleSwitcher1.style.visibility = "hidden";
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
    body1.classList.remove("loader-body");
    body1.classList.add("normal-body");
    header.style.visibility = "visible";
    header1.style.visibility = "visible";
    styleSwitcher1.style.visibility = "visible";
  }, 3500);
});

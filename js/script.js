// Строгий режим
"use strict";

// перевірка на тачскрін
const isTouchScreen = window.matchMedia("(any-hover: none)").matches
// =================================================================

window.addEventListener('load', windowLoaded)

function windowLoaded() {

  const maxWidth = +document.querySelector(".menu-footer").dataset.spollersInit || 600;
  const menuFooter = document.querySelector(".menu-footer");

  let documentActions = (e) => {
    const targetElement = e.target
    const typeEvent = e.type
    const targetTag = targetElement.tagName

    if (targetElement.closest(".menu-footer__title")) {
      if (window.innerWidth <= maxWidth) {
        if (!menuFooter.querySelectorAll("._slide").length) {
          const footerActiveSpoller = document.querySelector(
            ".menu-footer__item[open]"
          );
          const footerSpollerTitle = targetElement.closest(
            ".menu-footer__title"
          );
          if (
            footerActiveSpoller &&
            footerActiveSpoller !== targetElement.closest(".menu-footer__item")
          ) {
            spollersAnim(
              footerActiveSpoller.querySelector(".menu-footer__title"),
              false
            );
          }
          spollersAnim(footerSpollerTitle);
        }
      }
      e.preventDefault();
    }
    //клік на тачскрін
    if (isTouchScreen) {
      if (targetElement.closest('.lang-header')) {
        const langHeader = targetElement.closest('.lang-header')
        langHeader.classList.toggle('--active')
      } else {
        document.querySelector('.lang-header').classList.remove('--active')
      }
    }
    // кліки в блоці з телефонами
    if (targetElement.closest('.contacts-header')) {
      if (targetTag !== "A") {
      const contactsHeader = targetElement.closest('.contacts-header')
      contactsHeader.classList.toggle('--active')
      }
    } else {
      document.querySelector('.contacts-header').classList.remove('--active')
    }

  };

  let spollersInit = (footerSpollers, isOpen) => {
    footerSpollers.forEach((footerSpoller) => {
      const menuFooterTitle = footerSpoller.querySelector(
        ".menu-footer__title"
      );
      footerSpoller.classList.toggle("_init", !isOpen);
      isOpen
        ? menuFooterTitle.setAttribute("tabindex", "-1")
        : menuFooterTitle.removeAttribute("tabindex");
      footerSpoller.open = isOpen;
    });
  };

  document.addEventListener("click", documentActions);
  // document.addEventListener("touchstart", documentActions);

  let spollersAnim = (footerSpollerTitle, action) => {
    const footerSpoller = footerSpollerTitle.closest(".menu-footer__item");
    const footerSpollerBody = footerSpollerTitle.nextElementSibling;
    let spollersAnimClose = () => {
      if (!footerSpollerTitle.classList.contains("_slide")) {
        footerSpollerTitle.classList.add("_slide");
        const footerSpollerBodyHeight = footerSpollerBody.offsetHeight;
        footerSpollerBody.style.height = `${footerSpollerBodyHeight}px`;
        footerSpollerBody.style.overflow = "hidden";
        footerSpollerBody.style.transitionDuration = "0.8s";
        footerSpollerBody.style.paddingTop = "0";
        footerSpollerBody.style.paddingBottom = "0";
        footerSpollerBody.style.paddingLeft = "0";
        footerSpollerBody.style.paddingRight = "0";
        footerSpollerBody.offsetHeight;
        footerSpollerBody.style.height = `0px`;
        setTimeout(() => {
          footerSpoller.open = false;
          footerSpollerBody.style.removeProperty("height");
          footerSpollerBody.style.removeProperty("overflow");
          footerSpollerBody.style.removeProperty("transition-duration");
          footerSpollerBody.style.removeProperty("padding-top");
          footerSpollerBody.style.removeProperty("padding-bottom");
          footerSpollerBody.style.removeProperty("padding-left");
          footerSpollerBody.style.removeProperty("padding-right");
          footerSpollerTitle.classList.remove("_slide");
        }, 800);
      }
    };
    let spollersAnimOpen = () => {
      if (!footerSpollerTitle.classList.contains("_slide")) {
        footerSpollerTitle.classList.add("_slide");
        footerSpoller.open = true;
        const footerSpollerBodyHeight = footerSpollerBody.offsetHeight;
        footerSpollerBody.style.height = "0px";
        footerSpollerBody.style.overflow = "hidden";
        footerSpollerBody.style.paddingTop = 0;
        footerSpollerBody.style.paddingBottom = 0;
        footerSpollerBody.style.paddingLeft = 0;
        footerSpollerBody.style.paddingRight = 0;
        footerSpollerBody.style.transitionDuration = "0.8s";
        footerSpollerBody.offsetHeight;
        footerSpollerBody.style.height = `${footerSpollerBodyHeight}px`;
        footerSpollerBody.style.removeProperty("padding-top");
        footerSpollerBody.style.removeProperty("padding-bottom");
        footerSpollerBody.style.removeProperty("padding-left");
        footerSpollerBody.style.removeProperty("padding-right");
        setTimeout(() => {
          footerSpollerBody.style.removeProperty("height");
          footerSpollerBody.style.removeProperty("overflow");
          footerSpollerBody.style.removeProperty("transition-duration");
          footerSpollerTitle.classList.remove("_slide");
        }, 800);
      }
    };

    if (action !== undefined) {
      action ? spollersAnimOpen() : spollersAnimClose();
    }
    footerSpoller.open ? spollersAnimClose() : spollersAnimOpen();
  };

  // Footer Spollers
  const footerSpollers = document.querySelectorAll(".menu-footer__item");
  if (footerSpollers.length) {
    const matchMedia = window.matchMedia(`(max-width: ${maxWidth / 16}em)`);
    spollersInit(footerSpollers, !matchMedia.matches);
    matchMedia.addEventListener("change", () => {
      spollersInit(footerSpollers, !matchMedia.matches);
    });
  }
  
  // Move footer logo
  const footerLogo = document.querySelector(".social-footer__logo");
  const footerContainer = document.querySelector(".footer__container");
  const footerSocial = document.querySelector(".social-footer");
  if (footerLogo) {
    const matchMedia = window.matchMedia(`(max-width: ${767.98 / 16}em)`);
    moveFooterElements();
    matchMedia.addEventListener("change", () => {
      moveFooterElements();
    });
    function moveFooterElements() {
      matchMedia.matches ? footerContainer.insertAdjacentElement("beforeend", footerSocial) : footerContainer.insertAdjacentElement("afterbegin", footerSocial);
      matchMedia.matches ? footerContainer.insertAdjacentElement("afterbegin", footerLogo) : footerSocial.insertAdjacentElement("afterbegin", footerLogo);
    }
  }

}

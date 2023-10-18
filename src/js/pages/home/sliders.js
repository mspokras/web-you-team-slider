import { log, error, debug } from "../../../../repo/js/libs/logger.js";
export function initTeamSelectSlider() {
  const teamatesSliders = new Swiper("#team-select-slider", {
    observer: true,
    resizeObserver: true,
    slidesPerView: "auto",
    grabCursor: true,
    centeredSlides: true,
    breakpoints: {
      420: {
        centeredSlides: false,
      },
    },
  });
}
export function initTeamatesSliders(store, events) {
  log("initTeamatesSliders");
  const currentSlideNumberElem = document.querySelector(
    "#teamates-slider-counter .teamates-slider__current"
  );
  const totalSlidesNumberElem = document.querySelector(
    "#teamates-slider-counter .teamates-slider__total"
  );
  const slider = new Swiper("#teamates-slider", {
    observer: true,
    resizeObserver: true,
    slidesPerView: "auto",
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 40,
      stretch: 350,
      depth: 300,
      modifier: 0.65,
      slideShadows: false,
    },
    autoplay: {
      delay: 3000,
    },
    navigation: {
      prevEl: "#teamates-slider-prev",
      nextEl: "#teamates-slider-next",
    },
    // pagination: {
    // 	clickable: true,
    // 	el: "#teamates-slider-pagination"
    // },
    breakpoints: {
      1024: {
        coverflowEffect: {
          rotate: 40,
          stretch: 500,
          depth: 400,
          modifier: 0.65,
          slideShadows: false,
        },
      },
    },
    on: {
      slideChange: function () {
        const slides = this.slides;
        const activeSlide = this.activeIndex;
        slides.forEach((slide, index) => {
          const position = index - activeSlide;
          slide.setAttribute("data-slide-position", position);
        });
        const [activeSlideElem] = findActiveSlide(slides);
        processSlideChange(activeSlideElem);
      },
      afterInit: (swiper) => {
        initSelectByClick(swiper);
        const slides = getSlides(swiper);
        setSlidesIdx(slides);
        setTotal(slides);
        const [activeSlideElem] = findActiveSlide(slides);
        processSlideChange(activeSlideElem);
      },
      observerUpdate: (swiper) => {
        const slides = getSlides(swiper);
        setSlidesIdx(slides);
        setTotal(slides); // Можно было бы заморочиться, и перерисовывать это значение по рендеру, а не по каждой перестройке DOM, что значит, по каждой смене слайда
        setTimeout(() => {
          const [activeSlideElem] = findActiveSlide(slides);
          processSlideChange(activeSlideElem);
        }, 300);
      },
      slideChangeTransitionStart: (swiper) => {
        swiper.el.addEventListener("transitionend", () => {
          const slides = getSlides(swiper);
          const [activeSlideElem, activeSlideIdx] = findActiveSlide(slides);
          setSlidesOrder(slides, activeSlideElem, activeSlideIdx);
          processSlideChange(activeSlideElem);
        });
      },
    },
  });

  events.on("slideToFirstEmployee", () => {
    slider.slideTo(0, 300);
    setSelectedEmployee(0);
  });
  function processSlideChange(activeSlideElem) {
    if (activeSlideElem) {
      const cardIdx = Number(activeSlideElem.getAttribute("data-card-idx"));
      updateActiveSlideNumber(cardIdx + 1);
      setSelectedEmployee(cardIdx);
    }
  }
  function setSelectedEmployee(idx) {
    store.update((state) => {
      return {
        ...state,
        selectedEmployeeIdx: idx,
      };
    });
  }
  function initSelectByClick(swiper) {
    swiper.wrapperEl.addEventListener("click", ({ target }) => {
      if (
        !target.classList.contains("teamate-card__btn") &&
        !target.closest(".teamate-card__btn")
      )
        return;
      const slideRootElem = target.closest(".swiper-slide");
      swiper.slideTo(slideRootElem.getAttribute("data-slide-idx"), 300);
    });
  }
  function setTotal(slides) {
    totalSlidesNumberElem.textContent = slides.length;
  }
  function updateActiveSlideNumber(number) {
    currentSlideNumberElem.textContent = number;
  }
  function getSlides(swiper) {
    return [...swiper.wrapperEl.querySelectorAll(".swiper-slide")];
  }
  function findActiveSlide(slides) {
    const activeSlideIdx = slides.findIndex((elem) =>
      elem.classList.contains("swiper-slide-active")
    );
    return [slides[activeSlideIdx], activeSlideIdx];
  }
  // Нужно вызывать каждый раз при обновлении DOM
  function setSlidesIdx(slides) {
    if (slides.length < 1) return;
    slides.forEach((elem, idx) => elem.setAttribute("data-slide-idx", idx));
  }
  // Нужно вызывать каждый раз при обновлении DOM или изменении активного слайда
  function setSlidesOrder(slides, activeSlideElem, activeSlideIdx) {
    if (slides.length < 1 || !activeSlideElem) return;
    activeSlideElem.setAttribute("data-slide-position", 0);
    const recalcDepth = Math.min(5, Math.ceil((slides.length - 1) / 2));
    const leftEdgeIdx = Math.max(0, activeSlideIdx - recalcDepth);
    const rightEdgeIdx = Math.min(
      slides.length,
      activeSlideIdx + recalcDepth + 1
    );
    slides
      .slice(leftEdgeIdx, activeSlideIdx)
      .reverse()
      .forEach((elem, idx) => {
        elem.setAttribute("data-slide-position", -1 - idx);
      });
    slides.slice(activeSlideIdx + 1, rightEdgeIdx).forEach((elem, idx) => {
      elem.setAttribute("data-slide-position", 1 + idx);
    });
  }
}

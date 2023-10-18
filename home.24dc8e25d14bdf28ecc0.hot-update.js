"use strict";
self["webpackHotUpdatefls_start"]("home",{

/***/ "./src/js/pages/home/sliders.js":
/*!**************************************!*\
  !*** ./src/js/pages/home/sliders.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initTeamSelectSlider: function() { return /* binding */ initTeamSelectSlider; },
/* harmony export */   initTeamatesSliders: function() { return /* binding */ initTeamatesSliders; }
/* harmony export */ });
/* harmony import */ var _repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../repo/js/libs/logger.js */ "./repo/js/libs/logger.js");

function initTeamSelectSlider() {
  const teamatesSliders = new Swiper("#team-select-slider", {
    observer: true,
    resizeObserver: true,
    slidesPerView: "auto",
    grabCursor: true,
    centeredSlides: true,
    breakpoints: {
      420: {
        centeredSlides: false
      }
    }
  });
}
function initTeamatesSliders(store, events) {
  (0,_repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__.log)("initTeamatesSliders");
  const currentSlideNumberElem = document.querySelector("#teamates-slider-counter .teamates-slider__current");
  const totalSlidesNumberElem = document.querySelector("#teamates-slider-counter .teamates-slider__total");
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
      slideShadows: false
    },
    autoplay: {
      delay: 3000
    },
    navigation: {
      prevEl: "#teamates-slider-prev",
      nextEl: "#teamates-slider-next"
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
          slideShadows: false
        }
      }
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
      afterInit: swiper => {
        initSelectByClick(swiper);
        const slides = getSlides(swiper);
        setSlidesIdx(slides);
        setTotal(slides);
        const [activeSlideElem] = findActiveSlide(slides);
        processSlideChange(activeSlideElem);
      },
      observerUpdate: swiper => {
        const slides = getSlides(swiper);
        setSlidesIdx(slides);
        setTotal(slides); // Можно было бы заморочиться, и перерисовывать это значение по рендеру, а не по каждой перестройке DOM, что значит, по каждой смене слайда
        setTimeout(() => {
          const [activeSlideElem] = findActiveSlide(slides);
          processSlideChange(activeSlideElem);
        }, 300);
      },
      slideChangeTransitionStart: swiper => {
        swiper.el.addEventListener("transitionend", () => {
          const slides = getSlides(swiper);
          const [activeSlideElem, activeSlideIdx] = findActiveSlide(slides);
          setSlidesOrder(slides, activeSlideElem, activeSlideIdx);
          processSlideChange(activeSlideElem);
        });
      }
    }
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
    store.update(state => {
      return {
        ...state,
        selectedEmployeeIdx: idx
      };
    });
  }
  function initSelectByClick(swiper) {
    swiper.wrapperEl.addEventListener("click", _ref => {
      let {
        target
      } = _ref;
      if (!target.classList.contains("teamate-card__btn") && !target.closest(".teamate-card__btn")) return;
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
    const activeSlideIdx = slides.findIndex(elem => elem.classList.contains("swiper-slide-active"));
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
    const rightEdgeIdx = Math.min(slides.length, activeSlideIdx + recalcDepth + 1);
    slides.slice(leftEdgeIdx, activeSlideIdx).reverse().forEach((elem, idx) => {
      elem.setAttribute("data-slide-position", -1 - idx);
    });
    slides.slice(activeSlideIdx + 1, rightEdgeIdx).forEach((elem, idx) => {
      elem.setAttribute("data-slide-position", 1 + idx);
    });
  }
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "7dcb72d119faf588ec19"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS4yNGRjOGUyNWQxNGJkZjI4ZWNjMC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUF1RTtBQUNoRSxTQUFTRyxvQkFBb0JBLENBQUEsRUFBRztFQUNyQyxNQUFNQyxlQUFlLEdBQUcsSUFBSUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFO0lBQ3hEQyxRQUFRLEVBQUUsSUFBSTtJQUNkQyxjQUFjLEVBQUUsSUFBSTtJQUNwQkMsYUFBYSxFQUFFLE1BQU07SUFDckJDLFVBQVUsRUFBRSxJQUFJO0lBQ2hCQyxjQUFjLEVBQUUsSUFBSTtJQUNwQkMsV0FBVyxFQUFFO01BQ1gsR0FBRyxFQUFFO1FBQ0hELGNBQWMsRUFBRTtNQUNsQjtJQUNGO0VBQ0YsQ0FBQyxDQUFDO0FBQ0o7QUFDTyxTQUFTRSxtQkFBbUJBLENBQUNDLEtBQUssRUFBRUMsTUFBTSxFQUFFO0VBQ2pEZCw0REFBRyxDQUFDLHFCQUFxQixDQUFDO0VBQzFCLE1BQU1lLHNCQUFzQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FDbkQsb0RBQ0YsQ0FBQztFQUNELE1BQU1DLHFCQUFxQixHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FDbEQsa0RBQ0YsQ0FBQztFQUNELE1BQU1FLE1BQU0sR0FBRyxJQUFJZCxNQUFNLENBQUMsa0JBQWtCLEVBQUU7SUFDNUNDLFFBQVEsRUFBRSxJQUFJO0lBQ2RDLGNBQWMsRUFBRSxJQUFJO0lBQ3BCQyxhQUFhLEVBQUUsTUFBTTtJQUNyQkUsY0FBYyxFQUFFLElBQUk7SUFDcEJELFVBQVUsRUFBRSxJQUFJO0lBQ2hCVyxJQUFJLEVBQUUsSUFBSTtJQUNWQyxNQUFNLEVBQUUsV0FBVztJQUNuQkMsZUFBZSxFQUFFO01BQ2ZDLE1BQU0sRUFBRSxFQUFFO01BQ1ZDLE9BQU8sRUFBRSxHQUFHO01BQ1pDLEtBQUssRUFBRSxHQUFHO01BQ1ZDLFFBQVEsRUFBRSxJQUFJO01BQ2RDLFlBQVksRUFBRTtJQUNoQixDQUFDO0lBQ0RDLFFBQVEsRUFBRTtNQUNSQyxLQUFLLEVBQUU7SUFDVCxDQUFDO0lBQ0RDLFVBQVUsRUFBRTtNQUNWQyxNQUFNLEVBQUUsdUJBQXVCO01BQy9CQyxNQUFNLEVBQUU7SUFDVixDQUFDO0lBQ0Q7SUFDQTtJQUNBO0lBQ0E7SUFDQXJCLFdBQVcsRUFBRTtNQUNYLElBQUksRUFBRTtRQUNKVyxlQUFlLEVBQUU7VUFDZkMsTUFBTSxFQUFFLEVBQUU7VUFDVkMsT0FBTyxFQUFFLEdBQUc7VUFDWkMsS0FBSyxFQUFFLEdBQUc7VUFDVkMsUUFBUSxFQUFFLElBQUk7VUFDZEMsWUFBWSxFQUFFO1FBQ2hCO01BQ0Y7SUFDRixDQUFDO0lBQ0RNLEVBQUUsRUFBRTtNQUNGQyxXQUFXLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO1FBQ3ZCLE1BQU1DLE1BQU0sR0FBRyxJQUFJLENBQUNBLE1BQU07UUFDMUIsTUFBTUMsV0FBVyxHQUFHLElBQUksQ0FBQ0MsV0FBVztRQUNwQ0YsTUFBTSxDQUFDRyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxLQUFLLEtBQUs7VUFDL0IsTUFBTUMsUUFBUSxHQUFHRCxLQUFLLEdBQUdKLFdBQVc7VUFDcENHLEtBQUssQ0FBQ0csWUFBWSxDQUFDLHFCQUFxQixFQUFFRCxRQUFRLENBQUM7UUFDckQsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxDQUFDRSxlQUFlLENBQUMsR0FBR0MsZUFBZSxDQUFDVCxNQUFNLENBQUM7UUFDakRVLGtCQUFrQixDQUFDRixlQUFlLENBQUM7TUFDckMsQ0FBQztNQUNERyxTQUFTLEVBQUdDLE1BQU0sSUFBSztRQUNyQkMsaUJBQWlCLENBQUNELE1BQU0sQ0FBQztRQUN6QixNQUFNWixNQUFNLEdBQUdjLFNBQVMsQ0FBQ0YsTUFBTSxDQUFDO1FBQ2hDRyxZQUFZLENBQUNmLE1BQU0sQ0FBQztRQUNwQmdCLFFBQVEsQ0FBQ2hCLE1BQU0sQ0FBQztRQUNoQixNQUFNLENBQUNRLGVBQWUsQ0FBQyxHQUFHQyxlQUFlLENBQUNULE1BQU0sQ0FBQztRQUNqRFUsa0JBQWtCLENBQUNGLGVBQWUsQ0FBQztNQUNyQyxDQUFDO01BQ0RTLGNBQWMsRUFBR0wsTUFBTSxJQUFLO1FBQzFCLE1BQU1aLE1BQU0sR0FBR2MsU0FBUyxDQUFDRixNQUFNLENBQUM7UUFDaENHLFlBQVksQ0FBQ2YsTUFBTSxDQUFDO1FBQ3BCZ0IsUUFBUSxDQUFDaEIsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsQmtCLFVBQVUsQ0FBQyxNQUFNO1VBQ2YsTUFBTSxDQUFDVixlQUFlLENBQUMsR0FBR0MsZUFBZSxDQUFDVCxNQUFNLENBQUM7VUFDakRVLGtCQUFrQixDQUFDRixlQUFlLENBQUM7UUFDckMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztNQUNULENBQUM7TUFDRFcsMEJBQTBCLEVBQUdQLE1BQU0sSUFBSztRQUN0Q0EsTUFBTSxDQUFDUSxFQUFFLENBQUNDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxNQUFNO1VBQ2hELE1BQU1yQixNQUFNLEdBQUdjLFNBQVMsQ0FBQ0YsTUFBTSxDQUFDO1VBQ2hDLE1BQU0sQ0FBQ0osZUFBZSxFQUFFYyxjQUFjLENBQUMsR0FBR2IsZUFBZSxDQUFDVCxNQUFNLENBQUM7VUFDakV1QixjQUFjLENBQUN2QixNQUFNLEVBQUVRLGVBQWUsRUFBRWMsY0FBYyxDQUFDO1VBQ3ZEWixrQkFBa0IsQ0FBQ0YsZUFBZSxDQUFDO1FBQ3JDLENBQUMsQ0FBQztNQUNKO0lBQ0Y7RUFDRixDQUFDLENBQUM7RUFFRjdCLE1BQU0sQ0FBQ21CLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxNQUFNO0lBQ3RDZCxNQUFNLENBQUN3QyxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUN0QkMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0VBQ3hCLENBQUMsQ0FBQztFQUNGLFNBQVNmLGtCQUFrQkEsQ0FBQ0YsZUFBZSxFQUFFO0lBQzNDLElBQUlBLGVBQWUsRUFBRTtNQUNuQixNQUFNa0IsT0FBTyxHQUFHQyxNQUFNLENBQUNuQixlQUFlLENBQUNvQixZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7TUFDckVDLHVCQUF1QixDQUFDSCxPQUFPLEdBQUcsQ0FBQyxDQUFDO01BQ3BDRCxtQkFBbUIsQ0FBQ0MsT0FBTyxDQUFDO0lBQzlCO0VBQ0Y7RUFDQSxTQUFTRCxtQkFBbUJBLENBQUNLLEdBQUcsRUFBRTtJQUNoQ3BELEtBQUssQ0FBQ3FELE1BQU0sQ0FBRUMsS0FBSyxJQUFLO01BQ3RCLE9BQU87UUFDTCxHQUFHQSxLQUFLO1FBQ1JDLG1CQUFtQixFQUFFSDtNQUN2QixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0VBQ0o7RUFDQSxTQUFTakIsaUJBQWlCQSxDQUFDRCxNQUFNLEVBQUU7SUFDakNBLE1BQU0sQ0FBQ3NCLFNBQVMsQ0FBQ2IsZ0JBQWdCLENBQUMsT0FBTyxFQUFFYyxJQUFBLElBQWdCO01BQUEsSUFBZjtRQUFFQztNQUFPLENBQUMsR0FBQUQsSUFBQTtNQUNwRCxJQUNFLENBQUNDLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFDL0MsQ0FBQ0YsTUFBTSxDQUFDRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFFckM7TUFDRixNQUFNQyxhQUFhLEdBQUdKLE1BQU0sQ0FBQ0csT0FBTyxDQUFDLGVBQWUsQ0FBQztNQUNyRDNCLE1BQU0sQ0FBQ1ksT0FBTyxDQUFDZ0IsYUFBYSxDQUFDWixZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDbkUsQ0FBQyxDQUFDO0VBQ0o7RUFDQSxTQUFTWixRQUFRQSxDQUFDaEIsTUFBTSxFQUFFO0lBQ3hCakIscUJBQXFCLENBQUMwRCxXQUFXLEdBQUd6QyxNQUFNLENBQUMwQyxNQUFNO0VBQ25EO0VBQ0EsU0FBU2IsdUJBQXVCQSxDQUFDYyxNQUFNLEVBQUU7SUFDdkMvRCxzQkFBc0IsQ0FBQzZELFdBQVcsR0FBR0UsTUFBTTtFQUM3QztFQUNBLFNBQVM3QixTQUFTQSxDQUFDRixNQUFNLEVBQUU7SUFDekIsT0FBTyxDQUFDLEdBQUdBLE1BQU0sQ0FBQ3NCLFNBQVMsQ0FBQ1UsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7RUFDaEU7RUFDQSxTQUFTbkMsZUFBZUEsQ0FBQ1QsTUFBTSxFQUFFO0lBQy9CLE1BQU1zQixjQUFjLEdBQUd0QixNQUFNLENBQUM2QyxTQUFTLENBQUVDLElBQUksSUFDM0NBLElBQUksQ0FBQ1QsU0FBUyxDQUFDQyxRQUFRLENBQUMscUJBQXFCLENBQy9DLENBQUM7SUFDRCxPQUFPLENBQUN0QyxNQUFNLENBQUNzQixjQUFjLENBQUMsRUFBRUEsY0FBYyxDQUFDO0VBQ2pEO0VBQ0E7RUFDQSxTQUFTUCxZQUFZQSxDQUFDZixNQUFNLEVBQUU7SUFDNUIsSUFBSUEsTUFBTSxDQUFDMEMsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUN2QjFDLE1BQU0sQ0FBQ0csT0FBTyxDQUFDLENBQUMyQyxJQUFJLEVBQUVoQixHQUFHLEtBQUtnQixJQUFJLENBQUN2QyxZQUFZLENBQUMsZ0JBQWdCLEVBQUV1QixHQUFHLENBQUMsQ0FBQztFQUN6RTtFQUNBO0VBQ0EsU0FBU1AsY0FBY0EsQ0FBQ3ZCLE1BQU0sRUFBRVEsZUFBZSxFQUFFYyxjQUFjLEVBQUU7SUFDL0QsSUFBSXRCLE1BQU0sQ0FBQzBDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQ2xDLGVBQWUsRUFBRTtJQUMzQ0EsZUFBZSxDQUFDRCxZQUFZLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELE1BQU13QyxXQUFXLEdBQUdDLElBQUksQ0FBQ0MsR0FBRyxDQUFDLENBQUMsRUFBRUQsSUFBSSxDQUFDRSxJQUFJLENBQUMsQ0FBQ2xELE1BQU0sQ0FBQzBDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkUsTUFBTVMsV0FBVyxHQUFHSCxJQUFJLENBQUNJLEdBQUcsQ0FBQyxDQUFDLEVBQUU5QixjQUFjLEdBQUd5QixXQUFXLENBQUM7SUFDN0QsTUFBTU0sWUFBWSxHQUFHTCxJQUFJLENBQUNDLEdBQUcsQ0FDM0JqRCxNQUFNLENBQUMwQyxNQUFNLEVBQ2JwQixjQUFjLEdBQUd5QixXQUFXLEdBQUcsQ0FDakMsQ0FBQztJQUNEL0MsTUFBTSxDQUNIc0QsS0FBSyxDQUFDSCxXQUFXLEVBQUU3QixjQUFjLENBQUMsQ0FDbENpQyxPQUFPLENBQUMsQ0FBQyxDQUNUcEQsT0FBTyxDQUFDLENBQUMyQyxJQUFJLEVBQUVoQixHQUFHLEtBQUs7TUFDdEJnQixJQUFJLENBQUN2QyxZQUFZLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLEdBQUd1QixHQUFHLENBQUM7SUFDcEQsQ0FBQyxDQUFDO0lBQ0o5QixNQUFNLENBQUNzRCxLQUFLLENBQUNoQyxjQUFjLEdBQUcsQ0FBQyxFQUFFK0IsWUFBWSxDQUFDLENBQUNsRCxPQUFPLENBQUMsQ0FBQzJDLElBQUksRUFBRWhCLEdBQUcsS0FBSztNQUNwRWdCLElBQUksQ0FBQ3ZDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUd1QixHQUFHLENBQUM7SUFDbkQsQ0FBQyxDQUFDO0VBQ0o7QUFDRjs7Ozs7Ozs7VUN6S0EscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmxzLXN0YXJ0Ly4vc3JjL2pzL3BhZ2VzL2hvbWUvc2xpZGVycy5qcyIsIndlYnBhY2s6Ly9mbHMtc3RhcnQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvZywgZXJyb3IsIGRlYnVnIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3JlcG8vanMvbGlicy9sb2dnZXIuanNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUZWFtU2VsZWN0U2xpZGVyKCkge1xyXG4gIGNvbnN0IHRlYW1hdGVzU2xpZGVycyA9IG5ldyBTd2lwZXIoXCIjdGVhbS1zZWxlY3Qtc2xpZGVyXCIsIHtcclxuICAgIG9ic2VydmVyOiB0cnVlLFxyXG4gICAgcmVzaXplT2JzZXJ2ZXI6IHRydWUsXHJcbiAgICBzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcclxuICAgIGdyYWJDdXJzb3I6IHRydWUsXHJcbiAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgIDQyMDoge1xyXG4gICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUZWFtYXRlc1NsaWRlcnMoc3RvcmUsIGV2ZW50cykge1xyXG4gIGxvZyhcImluaXRUZWFtYXRlc1NsaWRlcnNcIik7XHJcbiAgY29uc3QgY3VycmVudFNsaWRlTnVtYmVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICBcIiN0ZWFtYXRlcy1zbGlkZXItY291bnRlciAudGVhbWF0ZXMtc2xpZGVyX19jdXJyZW50XCJcclxuICApO1xyXG4gIGNvbnN0IHRvdGFsU2xpZGVzTnVtYmVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICBcIiN0ZWFtYXRlcy1zbGlkZXItY291bnRlciAudGVhbWF0ZXMtc2xpZGVyX190b3RhbFwiXHJcbiAgKTtcclxuICBjb25zdCBzbGlkZXIgPSBuZXcgU3dpcGVyKFwiI3RlYW1hdGVzLXNsaWRlclwiLCB7XHJcbiAgICBvYnNlcnZlcjogdHJ1ZSxcclxuICAgIHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxyXG4gICAgc2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXHJcbiAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgIGdyYWJDdXJzb3I6IHRydWUsXHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgZWZmZWN0OiBcImNvdmVyZmxvd1wiLFxyXG4gICAgY292ZXJmbG93RWZmZWN0OiB7XHJcbiAgICAgIHJvdGF0ZTogNDAsXHJcbiAgICAgIHN0cmV0Y2g6IDM1MCxcclxuICAgICAgZGVwdGg6IDMwMCxcclxuICAgICAgbW9kaWZpZXI6IDAuNjUsXHJcbiAgICAgIHNsaWRlU2hhZG93czogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgYXV0b3BsYXk6IHtcclxuICAgICAgZGVsYXk6IDMwMDAsXHJcbiAgICB9LFxyXG4gICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICBwcmV2RWw6IFwiI3RlYW1hdGVzLXNsaWRlci1wcmV2XCIsXHJcbiAgICAgIG5leHRFbDogXCIjdGVhbWF0ZXMtc2xpZGVyLW5leHRcIixcclxuICAgIH0sXHJcbiAgICAvLyBwYWdpbmF0aW9uOiB7XHJcbiAgICAvLyBcdGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgIC8vIFx0ZWw6IFwiI3RlYW1hdGVzLXNsaWRlci1wYWdpbmF0aW9uXCJcclxuICAgIC8vIH0sXHJcbiAgICBicmVha3BvaW50czoge1xyXG4gICAgICAxMDI0OiB7XHJcbiAgICAgICAgY292ZXJmbG93RWZmZWN0OiB7XHJcbiAgICAgICAgICByb3RhdGU6IDQwLFxyXG4gICAgICAgICAgc3RyZXRjaDogNTAwLFxyXG4gICAgICAgICAgZGVwdGg6IDQwMCxcclxuICAgICAgICAgIG1vZGlmaWVyOiAwLjY1LFxyXG4gICAgICAgICAgc2xpZGVTaGFkb3dzOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIG9uOiB7XHJcbiAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gdGhpcy5zbGlkZXM7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlU2xpZGUgPSB0aGlzLmFjdGl2ZUluZGV4O1xyXG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gaW5kZXggLSBhY3RpdmVTbGlkZTtcclxuICAgICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGUtcG9zaXRpb25cIiwgcG9zaXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IFthY3RpdmVTbGlkZUVsZW1dID0gZmluZEFjdGl2ZVNsaWRlKHNsaWRlcyk7XHJcbiAgICAgICAgcHJvY2Vzc1NsaWRlQ2hhbmdlKGFjdGl2ZVNsaWRlRWxlbSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGFmdGVySW5pdDogKHN3aXBlcikgPT4ge1xyXG4gICAgICAgIGluaXRTZWxlY3RCeUNsaWNrKHN3aXBlcik7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gZ2V0U2xpZGVzKHN3aXBlcik7XHJcbiAgICAgICAgc2V0U2xpZGVzSWR4KHNsaWRlcyk7XHJcbiAgICAgICAgc2V0VG90YWwoc2xpZGVzKTtcclxuICAgICAgICBjb25zdCBbYWN0aXZlU2xpZGVFbGVtXSA9IGZpbmRBY3RpdmVTbGlkZShzbGlkZXMpO1xyXG4gICAgICAgIHByb2Nlc3NTbGlkZUNoYW5nZShhY3RpdmVTbGlkZUVsZW0pO1xyXG4gICAgICB9LFxyXG4gICAgICBvYnNlcnZlclVwZGF0ZTogKHN3aXBlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlcyA9IGdldFNsaWRlcyhzd2lwZXIpO1xyXG4gICAgICAgIHNldFNsaWRlc0lkeChzbGlkZXMpO1xyXG4gICAgICAgIHNldFRvdGFsKHNsaWRlcyk7IC8vINCc0L7QttC90L4g0LHRi9C70L4g0LHRiyDQt9Cw0LzQvtGA0L7Rh9C40YLRjNGB0Y8sINC4INC/0LXRgNC10YDQuNGB0L7QstGL0LLQsNGC0Ywg0Y3RgtC+INC30L3QsNGH0LXQvdC40LUg0L/QviDRgNC10L3QtNC10YDRgywg0LAg0L3QtSDQv9C+INC60LDQttC00L7QuSDQv9C10YDQtdGB0YLRgNC+0LnQutC1IERPTSwg0YfRgtC+INC30L3QsNGH0LjRgiwg0L/QviDQutCw0LbQtNC+0Lkg0YHQvNC10L3QtSDRgdC70LDQudC00LBcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IFthY3RpdmVTbGlkZUVsZW1dID0gZmluZEFjdGl2ZVNsaWRlKHNsaWRlcyk7XHJcbiAgICAgICAgICBwcm9jZXNzU2xpZGVDaGFuZ2UoYWN0aXZlU2xpZGVFbGVtKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICB9LFxyXG4gICAgICBzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydDogKHN3aXBlcikgPT4ge1xyXG4gICAgICAgIHN3aXBlci5lbC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzbGlkZXMgPSBnZXRTbGlkZXMoc3dpcGVyKTtcclxuICAgICAgICAgIGNvbnN0IFthY3RpdmVTbGlkZUVsZW0sIGFjdGl2ZVNsaWRlSWR4XSA9IGZpbmRBY3RpdmVTbGlkZShzbGlkZXMpO1xyXG4gICAgICAgICAgc2V0U2xpZGVzT3JkZXIoc2xpZGVzLCBhY3RpdmVTbGlkZUVsZW0sIGFjdGl2ZVNsaWRlSWR4KTtcclxuICAgICAgICAgIHByb2Nlc3NTbGlkZUNoYW5nZShhY3RpdmVTbGlkZUVsZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgZXZlbnRzLm9uKFwic2xpZGVUb0ZpcnN0RW1wbG95ZWVcIiwgKCkgPT4ge1xyXG4gICAgc2xpZGVyLnNsaWRlVG8oMCwgMzAwKTtcclxuICAgIHNldFNlbGVjdGVkRW1wbG95ZWUoMCk7XHJcbiAgfSk7XHJcbiAgZnVuY3Rpb24gcHJvY2Vzc1NsaWRlQ2hhbmdlKGFjdGl2ZVNsaWRlRWxlbSkge1xyXG4gICAgaWYgKGFjdGl2ZVNsaWRlRWxlbSkge1xyXG4gICAgICBjb25zdCBjYXJkSWR4ID0gTnVtYmVyKGFjdGl2ZVNsaWRlRWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNhcmQtaWR4XCIpKTtcclxuICAgICAgdXBkYXRlQWN0aXZlU2xpZGVOdW1iZXIoY2FyZElkeCArIDEpO1xyXG4gICAgICBzZXRTZWxlY3RlZEVtcGxveWVlKGNhcmRJZHgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBzZXRTZWxlY3RlZEVtcGxveWVlKGlkeCkge1xyXG4gICAgc3RvcmUudXBkYXRlKChzdGF0ZSkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIHNlbGVjdGVkRW1wbG95ZWVJZHg6IGlkeCxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBmdW5jdGlvbiBpbml0U2VsZWN0QnlDbGljayhzd2lwZXIpIHtcclxuICAgIHN3aXBlci53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRlYW1hdGUtY2FyZF9fYnRuXCIpICYmXHJcbiAgICAgICAgIXRhcmdldC5jbG9zZXN0KFwiLnRlYW1hdGUtY2FyZF9fYnRuXCIpXHJcbiAgICAgIClcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNvbnN0IHNsaWRlUm9vdEVsZW0gPSB0YXJnZXQuY2xvc2VzdChcIi5zd2lwZXItc2xpZGVcIik7XHJcbiAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlUm9vdEVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1zbGlkZS1pZHhcIiksIDMwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc2V0VG90YWwoc2xpZGVzKSB7XHJcbiAgICB0b3RhbFNsaWRlc051bWJlckVsZW0udGV4dENvbnRlbnQgPSBzbGlkZXMubGVuZ3RoO1xyXG4gIH1cclxuICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVTbGlkZU51bWJlcihudW1iZXIpIHtcclxuICAgIGN1cnJlbnRTbGlkZU51bWJlckVsZW0udGV4dENvbnRlbnQgPSBudW1iZXI7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdldFNsaWRlcyhzd2lwZXIpIHtcclxuICAgIHJldHVybiBbLi4uc3dpcGVyLndyYXBwZXJFbC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN3aXBlci1zbGlkZVwiKV07XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGZpbmRBY3RpdmVTbGlkZShzbGlkZXMpIHtcclxuICAgIGNvbnN0IGFjdGl2ZVNsaWRlSWR4ID0gc2xpZGVzLmZpbmRJbmRleCgoZWxlbSkgPT5cclxuICAgICAgZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzd2lwZXItc2xpZGUtYWN0aXZlXCIpXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFtzbGlkZXNbYWN0aXZlU2xpZGVJZHhdLCBhY3RpdmVTbGlkZUlkeF07XHJcbiAgfVxyXG4gIC8vINCd0YPQttC90L4g0LLRi9C30YvQstCw0YLRjCDQutCw0LbQtNGL0Lkg0YDQsNC3INC/0YDQuCDQvtCx0L3QvtCy0LvQtdC90LjQuCBET01cclxuICBmdW5jdGlvbiBzZXRTbGlkZXNJZHgoc2xpZGVzKSB7XHJcbiAgICBpZiAoc2xpZGVzLmxlbmd0aCA8IDEpIHJldHVybjtcclxuICAgIHNsaWRlcy5mb3JFYWNoKChlbGVtLCBpZHgpID0+IGVsZW0uc2V0QXR0cmlidXRlKFwiZGF0YS1zbGlkZS1pZHhcIiwgaWR4KSk7XHJcbiAgfVxyXG4gIC8vINCd0YPQttC90L4g0LLRi9C30YvQstCw0YLRjCDQutCw0LbQtNGL0Lkg0YDQsNC3INC/0YDQuCDQvtCx0L3QvtCy0LvQtdC90LjQuCBET00g0LjQu9C4INC40LfQvNC10L3QtdC90LjQuCDQsNC60YLQuNCy0L3QvtCz0L4g0YHQu9Cw0LnQtNCwXHJcbiAgZnVuY3Rpb24gc2V0U2xpZGVzT3JkZXIoc2xpZGVzLCBhY3RpdmVTbGlkZUVsZW0sIGFjdGl2ZVNsaWRlSWR4KSB7XHJcbiAgICBpZiAoc2xpZGVzLmxlbmd0aCA8IDEgfHwgIWFjdGl2ZVNsaWRlRWxlbSkgcmV0dXJuO1xyXG4gICAgYWN0aXZlU2xpZGVFbGVtLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGUtcG9zaXRpb25cIiwgMCk7XHJcbiAgICBjb25zdCByZWNhbGNEZXB0aCA9IE1hdGgubWluKDUsIE1hdGguY2VpbCgoc2xpZGVzLmxlbmd0aCAtIDEpIC8gMikpO1xyXG4gICAgY29uc3QgbGVmdEVkZ2VJZHggPSBNYXRoLm1heCgwLCBhY3RpdmVTbGlkZUlkeCAtIHJlY2FsY0RlcHRoKTtcclxuICAgIGNvbnN0IHJpZ2h0RWRnZUlkeCA9IE1hdGgubWluKFxyXG4gICAgICBzbGlkZXMubGVuZ3RoLFxyXG4gICAgICBhY3RpdmVTbGlkZUlkeCArIHJlY2FsY0RlcHRoICsgMVxyXG4gICAgKTtcclxuICAgIHNsaWRlc1xyXG4gICAgICAuc2xpY2UobGVmdEVkZ2VJZHgsIGFjdGl2ZVNsaWRlSWR4KVxyXG4gICAgICAucmV2ZXJzZSgpXHJcbiAgICAgIC5mb3JFYWNoKChlbGVtLCBpZHgpID0+IHtcclxuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGUtcG9zaXRpb25cIiwgLTEgLSBpZHgpO1xyXG4gICAgICB9KTtcclxuICAgIHNsaWRlcy5zbGljZShhY3RpdmVTbGlkZUlkeCArIDEsIHJpZ2h0RWRnZUlkeCkuZm9yRWFjaCgoZWxlbSwgaWR4KSA9PiB7XHJcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKFwiZGF0YS1zbGlkZS1wb3NpdGlvblwiLCAxICsgaWR4KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiN2RjYjcyZDExOWZhZjU4OGVjMTlcIjsgfSJdLCJuYW1lcyI6WyJsb2ciLCJlcnJvciIsImRlYnVnIiwiaW5pdFRlYW1TZWxlY3RTbGlkZXIiLCJ0ZWFtYXRlc1NsaWRlcnMiLCJTd2lwZXIiLCJvYnNlcnZlciIsInJlc2l6ZU9ic2VydmVyIiwic2xpZGVzUGVyVmlldyIsImdyYWJDdXJzb3IiLCJjZW50ZXJlZFNsaWRlcyIsImJyZWFrcG9pbnRzIiwiaW5pdFRlYW1hdGVzU2xpZGVycyIsInN0b3JlIiwiZXZlbnRzIiwiY3VycmVudFNsaWRlTnVtYmVyRWxlbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRvdGFsU2xpZGVzTnVtYmVyRWxlbSIsInNsaWRlciIsImxvb3AiLCJlZmZlY3QiLCJjb3ZlcmZsb3dFZmZlY3QiLCJyb3RhdGUiLCJzdHJldGNoIiwiZGVwdGgiLCJtb2RpZmllciIsInNsaWRlU2hhZG93cyIsImF1dG9wbGF5IiwiZGVsYXkiLCJuYXZpZ2F0aW9uIiwicHJldkVsIiwibmV4dEVsIiwib24iLCJzbGlkZUNoYW5nZSIsInNsaWRlcyIsImFjdGl2ZVNsaWRlIiwiYWN0aXZlSW5kZXgiLCJmb3JFYWNoIiwic2xpZGUiLCJpbmRleCIsInBvc2l0aW9uIiwic2V0QXR0cmlidXRlIiwiYWN0aXZlU2xpZGVFbGVtIiwiZmluZEFjdGl2ZVNsaWRlIiwicHJvY2Vzc1NsaWRlQ2hhbmdlIiwiYWZ0ZXJJbml0Iiwic3dpcGVyIiwiaW5pdFNlbGVjdEJ5Q2xpY2siLCJnZXRTbGlkZXMiLCJzZXRTbGlkZXNJZHgiLCJzZXRUb3RhbCIsIm9ic2VydmVyVXBkYXRlIiwic2V0VGltZW91dCIsInNsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0IiwiZWwiLCJhZGRFdmVudExpc3RlbmVyIiwiYWN0aXZlU2xpZGVJZHgiLCJzZXRTbGlkZXNPcmRlciIsInNsaWRlVG8iLCJzZXRTZWxlY3RlZEVtcGxveWVlIiwiY2FyZElkeCIsIk51bWJlciIsImdldEF0dHJpYnV0ZSIsInVwZGF0ZUFjdGl2ZVNsaWRlTnVtYmVyIiwiaWR4IiwidXBkYXRlIiwic3RhdGUiLCJzZWxlY3RlZEVtcGxveWVlSWR4Iiwid3JhcHBlckVsIiwiX3JlZiIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xvc2VzdCIsInNsaWRlUm9vdEVsZW0iLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsIm51bWJlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmaW5kSW5kZXgiLCJlbGVtIiwicmVjYWxjRGVwdGgiLCJNYXRoIiwibWluIiwiY2VpbCIsImxlZnRFZGdlSWR4IiwibWF4IiwicmlnaHRFZGdlSWR4Iiwic2xpY2UiLCJyZXZlcnNlIl0sInNvdXJjZVJvb3QiOiIifQ==
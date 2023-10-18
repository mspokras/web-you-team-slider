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
          const slides = getSlides(slider);
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
/******/ 	__webpack_require__.h = function() { return "24dc8e25d14bdf28ecc0"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5kZTVkYmYzNjI0ODdhY2M0YTE1NC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUF1RTtBQUNoRSxTQUFTRyxvQkFBb0JBLENBQUEsRUFBRztFQUNyQyxNQUFNQyxlQUFlLEdBQUcsSUFBSUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFO0lBQ3hEQyxRQUFRLEVBQUUsSUFBSTtJQUNkQyxjQUFjLEVBQUUsSUFBSTtJQUNwQkMsYUFBYSxFQUFFLE1BQU07SUFDckJDLFVBQVUsRUFBRSxJQUFJO0lBQ2hCQyxjQUFjLEVBQUUsSUFBSTtJQUNwQkMsV0FBVyxFQUFFO01BQ1gsR0FBRyxFQUFFO1FBQ0hELGNBQWMsRUFBRTtNQUNsQjtJQUNGO0VBQ0YsQ0FBQyxDQUFDO0FBQ0o7QUFDTyxTQUFTRSxtQkFBbUJBLENBQUNDLEtBQUssRUFBRUMsTUFBTSxFQUFFO0VBQ2pEZCw0REFBRyxDQUFDLHFCQUFxQixDQUFDO0VBQzFCLE1BQU1lLHNCQUFzQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FDbkQsb0RBQ0YsQ0FBQztFQUNELE1BQU1DLHFCQUFxQixHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FDbEQsa0RBQ0YsQ0FBQztFQUNELE1BQU1FLE1BQU0sR0FBRyxJQUFJZCxNQUFNLENBQUMsa0JBQWtCLEVBQUU7SUFDNUNDLFFBQVEsRUFBRSxJQUFJO0lBQ2RDLGNBQWMsRUFBRSxJQUFJO0lBQ3BCQyxhQUFhLEVBQUUsTUFBTTtJQUNyQkUsY0FBYyxFQUFFLElBQUk7SUFDcEJELFVBQVUsRUFBRSxJQUFJO0lBQ2hCVyxJQUFJLEVBQUUsSUFBSTtJQUNWQyxNQUFNLEVBQUUsV0FBVztJQUNuQkMsZUFBZSxFQUFFO01BQ2ZDLE1BQU0sRUFBRSxFQUFFO01BQ1ZDLE9BQU8sRUFBRSxHQUFHO01BQ1pDLEtBQUssRUFBRSxHQUFHO01BQ1ZDLFFBQVEsRUFBRSxJQUFJO01BQ2RDLFlBQVksRUFBRTtJQUNoQixDQUFDO0lBQ0RDLFFBQVEsRUFBRTtNQUNSQyxLQUFLLEVBQUU7SUFDVCxDQUFDO0lBQ0RDLFVBQVUsRUFBRTtNQUNWQyxNQUFNLEVBQUUsdUJBQXVCO01BQy9CQyxNQUFNLEVBQUU7SUFDVixDQUFDO0lBQ0Q7SUFDQTtJQUNBO0lBQ0E7SUFDQXJCLFdBQVcsRUFBRTtNQUNYLElBQUksRUFBRTtRQUNKVyxlQUFlLEVBQUU7VUFDZkMsTUFBTSxFQUFFLEVBQUU7VUFDVkMsT0FBTyxFQUFFLEdBQUc7VUFDWkMsS0FBSyxFQUFFLEdBQUc7VUFDVkMsUUFBUSxFQUFFLElBQUk7VUFDZEMsWUFBWSxFQUFFO1FBQ2hCO01BQ0Y7SUFDRixDQUFDO0lBQ0RNLEVBQUUsRUFBRTtNQUNGQyxXQUFXLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO1FBQ3ZCLE1BQU1DLE1BQU0sR0FBRyxJQUFJLENBQUNBLE1BQU07UUFDMUIsTUFBTUMsV0FBVyxHQUFHLElBQUksQ0FBQ0MsV0FBVztRQUNwQ0YsTUFBTSxDQUFDRyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxLQUFLLEtBQUs7VUFDL0IsTUFBTUMsUUFBUSxHQUFHRCxLQUFLLEdBQUdKLFdBQVc7VUFDcENHLEtBQUssQ0FBQ0csWUFBWSxDQUFDLHFCQUFxQixFQUFFRCxRQUFRLENBQUM7UUFDckQsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxDQUFDRSxlQUFlLENBQUMsR0FBR0MsZUFBZSxDQUFDVCxNQUFNLENBQUM7UUFDakRVLGtCQUFrQixDQUFDRixlQUFlLENBQUM7TUFDckMsQ0FBQztNQUNERyxTQUFTLEVBQUdDLE1BQU0sSUFBSztRQUNyQkMsaUJBQWlCLENBQUNELE1BQU0sQ0FBQztRQUN6QixNQUFNWixNQUFNLEdBQUdjLFNBQVMsQ0FBQ0YsTUFBTSxDQUFDO1FBQ2hDRyxZQUFZLENBQUNmLE1BQU0sQ0FBQztRQUNwQmdCLFFBQVEsQ0FBQ2hCLE1BQU0sQ0FBQztRQUNoQixNQUFNLENBQUNRLGVBQWUsQ0FBQyxHQUFHQyxlQUFlLENBQUNULE1BQU0sQ0FBQztRQUNqRFUsa0JBQWtCLENBQUNGLGVBQWUsQ0FBQztNQUNyQyxDQUFDO01BQ0RTLGNBQWMsRUFBR0wsTUFBTSxJQUFLO1FBQzFCLE1BQU1aLE1BQU0sR0FBR2MsU0FBUyxDQUFDRixNQUFNLENBQUM7UUFDaENHLFlBQVksQ0FBQ2YsTUFBTSxDQUFDO1FBQ3BCZ0IsUUFBUSxDQUFDaEIsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsQmtCLFVBQVUsQ0FBQyxNQUFNO1VBQ2YsTUFBTSxDQUFDVixlQUFlLENBQUMsR0FBR0MsZUFBZSxDQUFDVCxNQUFNLENBQUM7VUFDakRVLGtCQUFrQixDQUFDRixlQUFlLENBQUM7UUFDckMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztNQUNULENBQUM7TUFDRFcsMEJBQTBCLEVBQUdQLE1BQU0sSUFBSztRQUN0Q0EsTUFBTSxDQUFDUSxFQUFFLENBQUNDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxNQUFNO1VBQ2hELE1BQU1yQixNQUFNLEdBQUdjLFNBQVMsQ0FBQzlCLE1BQU0sQ0FBQztVQUNoQyxNQUFNLENBQUN3QixlQUFlLEVBQUVjLGNBQWMsQ0FBQyxHQUFHYixlQUFlLENBQUNULE1BQU0sQ0FBQztVQUNqRXVCLGNBQWMsQ0FBQ3ZCLE1BQU0sRUFBRVEsZUFBZSxFQUFFYyxjQUFjLENBQUM7VUFDdkRaLGtCQUFrQixDQUFDRixlQUFlLENBQUM7UUFDckMsQ0FBQyxDQUFDO01BQ0o7SUFDRjtFQUNGLENBQUMsQ0FBQztFQUVGN0IsTUFBTSxDQUFDbUIsRUFBRSxDQUFDLHNCQUFzQixFQUFFLE1BQU07SUFDdENkLE1BQU0sQ0FBQ3dDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ3RCQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7RUFDeEIsQ0FBQyxDQUFDO0VBQ0YsU0FBU2Ysa0JBQWtCQSxDQUFDRixlQUFlLEVBQUU7SUFDM0MsSUFBSUEsZUFBZSxFQUFFO01BQ25CLE1BQU1rQixPQUFPLEdBQUdDLE1BQU0sQ0FBQ25CLGVBQWUsQ0FBQ29CLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztNQUNyRUMsdUJBQXVCLENBQUNILE9BQU8sR0FBRyxDQUFDLENBQUM7TUFDcENELG1CQUFtQixDQUFDQyxPQUFPLENBQUM7SUFDOUI7RUFDRjtFQUNBLFNBQVNELG1CQUFtQkEsQ0FBQ0ssR0FBRyxFQUFFO0lBQ2hDcEQsS0FBSyxDQUFDcUQsTUFBTSxDQUFFQyxLQUFLLElBQUs7TUFDdEIsT0FBTztRQUNMLEdBQUdBLEtBQUs7UUFDUkMsbUJBQW1CLEVBQUVIO01BQ3ZCLENBQUM7SUFDSCxDQUFDLENBQUM7RUFDSjtFQUNBLFNBQVNqQixpQkFBaUJBLENBQUNELE1BQU0sRUFBRTtJQUNqQ0EsTUFBTSxDQUFDc0IsU0FBUyxDQUFDYixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVjLElBQUEsSUFBZ0I7TUFBQSxJQUFmO1FBQUVDO01BQU8sQ0FBQyxHQUFBRCxJQUFBO01BQ3BELElBQ0UsQ0FBQ0MsTUFBTSxDQUFDQyxTQUFTLENBQUNDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUMvQyxDQUFDRixNQUFNLENBQUNHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxFQUVyQztNQUNGLE1BQU1DLGFBQWEsR0FBR0osTUFBTSxDQUFDRyxPQUFPLENBQUMsZUFBZSxDQUFDO01BQ3JEM0IsTUFBTSxDQUFDWSxPQUFPLENBQUNnQixhQUFhLENBQUNaLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNuRSxDQUFDLENBQUM7RUFDSjtFQUNBLFNBQVNaLFFBQVFBLENBQUNoQixNQUFNLEVBQUU7SUFDeEJqQixxQkFBcUIsQ0FBQzBELFdBQVcsR0FBR3pDLE1BQU0sQ0FBQzBDLE1BQU07RUFDbkQ7RUFDQSxTQUFTYix1QkFBdUJBLENBQUNjLE1BQU0sRUFBRTtJQUN2Qy9ELHNCQUFzQixDQUFDNkQsV0FBVyxHQUFHRSxNQUFNO0VBQzdDO0VBQ0EsU0FBUzdCLFNBQVNBLENBQUNGLE1BQU0sRUFBRTtJQUN6QixPQUFPLENBQUMsR0FBR0EsTUFBTSxDQUFDc0IsU0FBUyxDQUFDVSxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztFQUNoRTtFQUNBLFNBQVNuQyxlQUFlQSxDQUFDVCxNQUFNLEVBQUU7SUFDL0IsTUFBTXNCLGNBQWMsR0FBR3RCLE1BQU0sQ0FBQzZDLFNBQVMsQ0FBRUMsSUFBSSxJQUMzQ0EsSUFBSSxDQUFDVCxTQUFTLENBQUNDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FDL0MsQ0FBQztJQUNELE9BQU8sQ0FBQ3RDLE1BQU0sQ0FBQ3NCLGNBQWMsQ0FBQyxFQUFFQSxjQUFjLENBQUM7RUFDakQ7RUFDQTtFQUNBLFNBQVNQLFlBQVlBLENBQUNmLE1BQU0sRUFBRTtJQUM1QixJQUFJQSxNQUFNLENBQUMwQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ3ZCMUMsTUFBTSxDQUFDRyxPQUFPLENBQUMsQ0FBQzJDLElBQUksRUFBRWhCLEdBQUcsS0FBS2dCLElBQUksQ0FBQ3ZDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRXVCLEdBQUcsQ0FBQyxDQUFDO0VBQ3pFO0VBQ0E7RUFDQSxTQUFTUCxjQUFjQSxDQUFDdkIsTUFBTSxFQUFFUSxlQUFlLEVBQUVjLGNBQWMsRUFBRTtJQUMvRCxJQUFJdEIsTUFBTSxDQUFDMEMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDbEMsZUFBZSxFQUFFO0lBQzNDQSxlQUFlLENBQUNELFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7SUFDdEQsTUFBTXdDLFdBQVcsR0FBR0MsSUFBSSxDQUFDQyxHQUFHLENBQUMsQ0FBQyxFQUFFRCxJQUFJLENBQUNFLElBQUksQ0FBQyxDQUFDbEQsTUFBTSxDQUFDMEMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRSxNQUFNUyxXQUFXLEdBQUdILElBQUksQ0FBQ0ksR0FBRyxDQUFDLENBQUMsRUFBRTlCLGNBQWMsR0FBR3lCLFdBQVcsQ0FBQztJQUM3RCxNQUFNTSxZQUFZLEdBQUdMLElBQUksQ0FBQ0MsR0FBRyxDQUMzQmpELE1BQU0sQ0FBQzBDLE1BQU0sRUFDYnBCLGNBQWMsR0FBR3lCLFdBQVcsR0FBRyxDQUNqQyxDQUFDO0lBQ0QvQyxNQUFNLENBQ0hzRCxLQUFLLENBQUNILFdBQVcsRUFBRTdCLGNBQWMsQ0FBQyxDQUNsQ2lDLE9BQU8sQ0FBQyxDQUFDLENBQ1RwRCxPQUFPLENBQUMsQ0FBQzJDLElBQUksRUFBRWhCLEdBQUcsS0FBSztNQUN0QmdCLElBQUksQ0FBQ3ZDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsR0FBR3VCLEdBQUcsQ0FBQztJQUNwRCxDQUFDLENBQUM7SUFDSjlCLE1BQU0sQ0FBQ3NELEtBQUssQ0FBQ2hDLGNBQWMsR0FBRyxDQUFDLEVBQUUrQixZQUFZLENBQUMsQ0FBQ2xELE9BQU8sQ0FBQyxDQUFDMkMsSUFBSSxFQUFFaEIsR0FBRyxLQUFLO01BQ3BFZ0IsSUFBSSxDQUFDdkMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBR3VCLEdBQUcsQ0FBQztJQUNuRCxDQUFDLENBQUM7RUFDSjtBQUNGOzs7Ozs7OztVQ3pLQSxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mbHMtc3RhcnQvLi9zcmMvanMvcGFnZXMvaG9tZS9zbGlkZXJzLmpzIiwid2VicGFjazovL2Zscy1zdGFydC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9nLCBlcnJvciwgZGVidWcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vcmVwby9qcy9saWJzL2xvZ2dlci5qc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRlYW1TZWxlY3RTbGlkZXIoKSB7XHJcbiAgY29uc3QgdGVhbWF0ZXNTbGlkZXJzID0gbmV3IFN3aXBlcihcIiN0ZWFtLXNlbGVjdC1zbGlkZXJcIiwge1xyXG4gICAgb2JzZXJ2ZXI6IHRydWUsXHJcbiAgICByZXNpemVPYnNlcnZlcjogdHJ1ZSxcclxuICAgIHNsaWRlc1BlclZpZXc6IFwiYXV0b1wiLFxyXG4gICAgZ3JhYkN1cnNvcjogdHJ1ZSxcclxuICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG4gICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgNDIwOiB7XHJcbiAgICAgICAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRlYW1hdGVzU2xpZGVycyhzdG9yZSwgZXZlbnRzKSB7XHJcbiAgbG9nKFwiaW5pdFRlYW1hdGVzU2xpZGVyc1wiKTtcclxuICBjb25zdCBjdXJyZW50U2xpZGVOdW1iZXJFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgIFwiI3RlYW1hdGVzLXNsaWRlci1jb3VudGVyIC50ZWFtYXRlcy1zbGlkZXJfX2N1cnJlbnRcIlxyXG4gICk7XHJcbiAgY29uc3QgdG90YWxTbGlkZXNOdW1iZXJFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgIFwiI3RlYW1hdGVzLXNsaWRlci1jb3VudGVyIC50ZWFtYXRlcy1zbGlkZXJfX3RvdGFsXCJcclxuICApO1xyXG4gIGNvbnN0IHNsaWRlciA9IG5ldyBTd2lwZXIoXCIjdGVhbWF0ZXMtc2xpZGVyXCIsIHtcclxuICAgIG9ic2VydmVyOiB0cnVlLFxyXG4gICAgcmVzaXplT2JzZXJ2ZXI6IHRydWUsXHJcbiAgICBzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcclxuICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG4gICAgZ3JhYkN1cnNvcjogdHJ1ZSxcclxuICAgIGxvb3A6IHRydWUsXHJcbiAgICBlZmZlY3Q6IFwiY292ZXJmbG93XCIsXHJcbiAgICBjb3ZlcmZsb3dFZmZlY3Q6IHtcclxuICAgICAgcm90YXRlOiA0MCxcclxuICAgICAgc3RyZXRjaDogMzUwLFxyXG4gICAgICBkZXB0aDogMzAwLFxyXG4gICAgICBtb2RpZmllcjogMC42NSxcclxuICAgICAgc2xpZGVTaGFkb3dzOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICBhdXRvcGxheToge1xyXG4gICAgICBkZWxheTogMzAwMCxcclxuICAgIH0sXHJcbiAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgIHByZXZFbDogXCIjdGVhbWF0ZXMtc2xpZGVyLXByZXZcIixcclxuICAgICAgbmV4dEVsOiBcIiN0ZWFtYXRlcy1zbGlkZXItbmV4dFwiLFxyXG4gICAgfSxcclxuICAgIC8vIHBhZ2luYXRpb246IHtcclxuICAgIC8vIFx0Y2xpY2thYmxlOiB0cnVlLFxyXG4gICAgLy8gXHRlbDogXCIjdGVhbWF0ZXMtc2xpZGVyLXBhZ2luYXRpb25cIlxyXG4gICAgLy8gfSxcclxuICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgIDEwMjQ6IHtcclxuICAgICAgICBjb3ZlcmZsb3dFZmZlY3Q6IHtcclxuICAgICAgICAgIHJvdGF0ZTogNDAsXHJcbiAgICAgICAgICBzdHJldGNoOiA1MDAsXHJcbiAgICAgICAgICBkZXB0aDogNDAwLFxyXG4gICAgICAgICAgbW9kaWZpZXI6IDAuNjUsXHJcbiAgICAgICAgICBzbGlkZVNoYWRvd3M6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgb246IHtcclxuICAgICAgc2xpZGVDaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBzbGlkZXMgPSB0aGlzLnNsaWRlcztcclxuICAgICAgICBjb25zdCBhY3RpdmVTbGlkZSA9IHRoaXMuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBpbmRleCAtIGFjdGl2ZVNsaWRlO1xyXG4gICAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKFwiZGF0YS1zbGlkZS1wb3NpdGlvblwiLCBwb3NpdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgW2FjdGl2ZVNsaWRlRWxlbV0gPSBmaW5kQWN0aXZlU2xpZGUoc2xpZGVzKTtcclxuICAgICAgICBwcm9jZXNzU2xpZGVDaGFuZ2UoYWN0aXZlU2xpZGVFbGVtKTtcclxuICAgICAgfSxcclxuICAgICAgYWZ0ZXJJbml0OiAoc3dpcGVyKSA9PiB7XHJcbiAgICAgICAgaW5pdFNlbGVjdEJ5Q2xpY2soc3dpcGVyKTtcclxuICAgICAgICBjb25zdCBzbGlkZXMgPSBnZXRTbGlkZXMoc3dpcGVyKTtcclxuICAgICAgICBzZXRTbGlkZXNJZHgoc2xpZGVzKTtcclxuICAgICAgICBzZXRUb3RhbChzbGlkZXMpO1xyXG4gICAgICAgIGNvbnN0IFthY3RpdmVTbGlkZUVsZW1dID0gZmluZEFjdGl2ZVNsaWRlKHNsaWRlcyk7XHJcbiAgICAgICAgcHJvY2Vzc1NsaWRlQ2hhbmdlKGFjdGl2ZVNsaWRlRWxlbSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9ic2VydmVyVXBkYXRlOiAoc3dpcGVyKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gZ2V0U2xpZGVzKHN3aXBlcik7XHJcbiAgICAgICAgc2V0U2xpZGVzSWR4KHNsaWRlcyk7XHJcbiAgICAgICAgc2V0VG90YWwoc2xpZGVzKTsgLy8g0JzQvtC20L3QviDQsdGL0LvQviDQsdGLINC30LDQvNC+0YDQvtGH0LjRgtGM0YHRjywg0Lgg0L/QtdGA0LXRgNC40YHQvtCy0YvQstCw0YLRjCDRjdGC0L4g0LfQvdCw0YfQtdC90LjQtSDQv9C+INGA0LXQvdC00LXRgNGDLCDQsCDQvdC1INC/0L4g0LrQsNC20LTQvtC5INC/0LXRgNC10YHRgtGA0L7QudC60LUgRE9NLCDRh9GC0L4g0LfQvdCw0YfQuNGCLCDQv9C+INC60LDQttC00L7QuSDRgdC80LXQvdC1INGB0LvQsNC50LTQsFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgW2FjdGl2ZVNsaWRlRWxlbV0gPSBmaW5kQWN0aXZlU2xpZGUoc2xpZGVzKTtcclxuICAgICAgICAgIHByb2Nlc3NTbGlkZUNoYW5nZShhY3RpdmVTbGlkZUVsZW0pO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0OiAoc3dpcGVyKSA9PiB7XHJcbiAgICAgICAgc3dpcGVyLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHNsaWRlcyA9IGdldFNsaWRlcyhzbGlkZXIpO1xyXG4gICAgICAgICAgY29uc3QgW2FjdGl2ZVNsaWRlRWxlbSwgYWN0aXZlU2xpZGVJZHhdID0gZmluZEFjdGl2ZVNsaWRlKHNsaWRlcyk7XHJcbiAgICAgICAgICBzZXRTbGlkZXNPcmRlcihzbGlkZXMsIGFjdGl2ZVNsaWRlRWxlbSwgYWN0aXZlU2xpZGVJZHgpO1xyXG4gICAgICAgICAgcHJvY2Vzc1NsaWRlQ2hhbmdlKGFjdGl2ZVNsaWRlRWxlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBldmVudHMub24oXCJzbGlkZVRvRmlyc3RFbXBsb3llZVwiLCAoKSA9PiB7XHJcbiAgICBzbGlkZXIuc2xpZGVUbygwLCAzMDApO1xyXG4gICAgc2V0U2VsZWN0ZWRFbXBsb3llZSgwKTtcclxuICB9KTtcclxuICBmdW5jdGlvbiBwcm9jZXNzU2xpZGVDaGFuZ2UoYWN0aXZlU2xpZGVFbGVtKSB7XHJcbiAgICBpZiAoYWN0aXZlU2xpZGVFbGVtKSB7XHJcbiAgICAgIGNvbnN0IGNhcmRJZHggPSBOdW1iZXIoYWN0aXZlU2xpZGVFbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtY2FyZC1pZHhcIikpO1xyXG4gICAgICB1cGRhdGVBY3RpdmVTbGlkZU51bWJlcihjYXJkSWR4ICsgMSk7XHJcbiAgICAgIHNldFNlbGVjdGVkRW1wbG95ZWUoY2FyZElkeCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNldFNlbGVjdGVkRW1wbG95ZWUoaWR4KSB7XHJcbiAgICBzdG9yZS51cGRhdGUoKHN0YXRlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgc2VsZWN0ZWRFbXBsb3llZUlkeDogaWR4LFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGluaXRTZWxlY3RCeUNsaWNrKHN3aXBlcikge1xyXG4gICAgc3dpcGVyLndyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGVhbWF0ZS1jYXJkX19idG5cIikgJiZcclxuICAgICAgICAhdGFyZ2V0LmNsb3Nlc3QoXCIudGVhbWF0ZS1jYXJkX19idG5cIilcclxuICAgICAgKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgY29uc3Qgc2xpZGVSb290RWxlbSA9IHRhcmdldC5jbG9zZXN0KFwiLnN3aXBlci1zbGlkZVwiKTtcclxuICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVSb290RWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNsaWRlLWlkeFwiKSwgMzAwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBmdW5jdGlvbiBzZXRUb3RhbChzbGlkZXMpIHtcclxuICAgIHRvdGFsU2xpZGVzTnVtYmVyRWxlbS50ZXh0Q29udGVudCA9IHNsaWRlcy5sZW5ndGg7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZVNsaWRlTnVtYmVyKG51bWJlcikge1xyXG4gICAgY3VycmVudFNsaWRlTnVtYmVyRWxlbS50ZXh0Q29udGVudCA9IG51bWJlcjtcclxuICB9XHJcbiAgZnVuY3Rpb24gZ2V0U2xpZGVzKHN3aXBlcikge1xyXG4gICAgcmV0dXJuIFsuLi5zd2lwZXIud3JhcHBlckVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3dpcGVyLXNsaWRlXCIpXTtcclxuICB9XHJcbiAgZnVuY3Rpb24gZmluZEFjdGl2ZVNsaWRlKHNsaWRlcykge1xyXG4gICAgY29uc3QgYWN0aXZlU2xpZGVJZHggPSBzbGlkZXMuZmluZEluZGV4KChlbGVtKSA9PlxyXG4gICAgICBlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcInN3aXBlci1zbGlkZS1hY3RpdmVcIilcclxuICAgICk7XHJcbiAgICByZXR1cm4gW3NsaWRlc1thY3RpdmVTbGlkZUlkeF0sIGFjdGl2ZVNsaWRlSWR4XTtcclxuICB9XHJcbiAgLy8g0J3Rg9C20L3QviDQstGL0LfRi9Cy0LDRgtGMINC60LDQttC00YvQuSDRgNCw0Lcg0L/RgNC4INC+0LHQvdC+0LLQu9C10L3QuNC4IERPTVxyXG4gIGZ1bmN0aW9uIHNldFNsaWRlc0lkeChzbGlkZXMpIHtcclxuICAgIGlmIChzbGlkZXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xyXG4gICAgc2xpZGVzLmZvckVhY2goKGVsZW0sIGlkeCkgPT4gZWxlbS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNsaWRlLWlkeFwiLCBpZHgpKTtcclxuICB9XHJcbiAgLy8g0J3Rg9C20L3QviDQstGL0LfRi9Cy0LDRgtGMINC60LDQttC00YvQuSDRgNCw0Lcg0L/RgNC4INC+0LHQvdC+0LLQu9C10L3QuNC4IERPTSDQuNC70Lgg0LjQt9C80LXQvdC10L3QuNC4INCw0LrRgtC40LLQvdC+0LPQviDRgdC70LDQudC00LBcclxuICBmdW5jdGlvbiBzZXRTbGlkZXNPcmRlcihzbGlkZXMsIGFjdGl2ZVNsaWRlRWxlbSwgYWN0aXZlU2xpZGVJZHgpIHtcclxuICAgIGlmIChzbGlkZXMubGVuZ3RoIDwgMSB8fCAhYWN0aXZlU2xpZGVFbGVtKSByZXR1cm47XHJcbiAgICBhY3RpdmVTbGlkZUVsZW0uc2V0QXR0cmlidXRlKFwiZGF0YS1zbGlkZS1wb3NpdGlvblwiLCAwKTtcclxuICAgIGNvbnN0IHJlY2FsY0RlcHRoID0gTWF0aC5taW4oNSwgTWF0aC5jZWlsKChzbGlkZXMubGVuZ3RoIC0gMSkgLyAyKSk7XHJcbiAgICBjb25zdCBsZWZ0RWRnZUlkeCA9IE1hdGgubWF4KDAsIGFjdGl2ZVNsaWRlSWR4IC0gcmVjYWxjRGVwdGgpO1xyXG4gICAgY29uc3QgcmlnaHRFZGdlSWR4ID0gTWF0aC5taW4oXHJcbiAgICAgIHNsaWRlcy5sZW5ndGgsXHJcbiAgICAgIGFjdGl2ZVNsaWRlSWR4ICsgcmVjYWxjRGVwdGggKyAxXHJcbiAgICApO1xyXG4gICAgc2xpZGVzXHJcbiAgICAgIC5zbGljZShsZWZ0RWRnZUlkeCwgYWN0aXZlU2xpZGVJZHgpXHJcbiAgICAgIC5yZXZlcnNlKClcclxuICAgICAgLmZvckVhY2goKGVsZW0sIGlkeCkgPT4ge1xyXG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKFwiZGF0YS1zbGlkZS1wb3NpdGlvblwiLCAtMSAtIGlkeCk7XHJcbiAgICAgIH0pO1xyXG4gICAgc2xpZGVzLnNsaWNlKGFjdGl2ZVNsaWRlSWR4ICsgMSwgcmlnaHRFZGdlSWR4KS5mb3JFYWNoKChlbGVtLCBpZHgpID0+IHtcclxuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNsaWRlLXBvc2l0aW9uXCIsIDEgKyBpZHgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCIyNGRjOGUyNWQxNGJkZjI4ZWNjMFwiOyB9Il0sIm5hbWVzIjpbImxvZyIsImVycm9yIiwiZGVidWciLCJpbml0VGVhbVNlbGVjdFNsaWRlciIsInRlYW1hdGVzU2xpZGVycyIsIlN3aXBlciIsIm9ic2VydmVyIiwicmVzaXplT2JzZXJ2ZXIiLCJzbGlkZXNQZXJWaWV3IiwiZ3JhYkN1cnNvciIsImNlbnRlcmVkU2xpZGVzIiwiYnJlYWtwb2ludHMiLCJpbml0VGVhbWF0ZXNTbGlkZXJzIiwic3RvcmUiLCJldmVudHMiLCJjdXJyZW50U2xpZGVOdW1iZXJFbGVtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidG90YWxTbGlkZXNOdW1iZXJFbGVtIiwic2xpZGVyIiwibG9vcCIsImVmZmVjdCIsImNvdmVyZmxvd0VmZmVjdCIsInJvdGF0ZSIsInN0cmV0Y2giLCJkZXB0aCIsIm1vZGlmaWVyIiwic2xpZGVTaGFkb3dzIiwiYXV0b3BsYXkiLCJkZWxheSIsIm5hdmlnYXRpb24iLCJwcmV2RWwiLCJuZXh0RWwiLCJvbiIsInNsaWRlQ2hhbmdlIiwic2xpZGVzIiwiYWN0aXZlU2xpZGUiLCJhY3RpdmVJbmRleCIsImZvckVhY2giLCJzbGlkZSIsImluZGV4IiwicG9zaXRpb24iLCJzZXRBdHRyaWJ1dGUiLCJhY3RpdmVTbGlkZUVsZW0iLCJmaW5kQWN0aXZlU2xpZGUiLCJwcm9jZXNzU2xpZGVDaGFuZ2UiLCJhZnRlckluaXQiLCJzd2lwZXIiLCJpbml0U2VsZWN0QnlDbGljayIsImdldFNsaWRlcyIsInNldFNsaWRlc0lkeCIsInNldFRvdGFsIiwib2JzZXJ2ZXJVcGRhdGUiLCJzZXRUaW1lb3V0Iiwic2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQiLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhY3RpdmVTbGlkZUlkeCIsInNldFNsaWRlc09yZGVyIiwic2xpZGVUbyIsInNldFNlbGVjdGVkRW1wbG95ZWUiLCJjYXJkSWR4IiwiTnVtYmVyIiwiZ2V0QXR0cmlidXRlIiwidXBkYXRlQWN0aXZlU2xpZGVOdW1iZXIiLCJpZHgiLCJ1cGRhdGUiLCJzdGF0ZSIsInNlbGVjdGVkRW1wbG95ZWVJZHgiLCJ3cmFwcGVyRWwiLCJfcmVmIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbG9zZXN0Iiwic2xpZGVSb290RWxlbSIsInRleHRDb250ZW50IiwibGVuZ3RoIiwibnVtYmVyIiwicXVlcnlTZWxlY3RvckFsbCIsImZpbmRJbmRleCIsImVsZW0iLCJyZWNhbGNEZXB0aCIsIk1hdGgiLCJtaW4iLCJjZWlsIiwibGVmdEVkZ2VJZHgiLCJtYXgiLCJyaWdodEVkZ2VJZHgiLCJzbGljZSIsInJldmVyc2UiXSwic291cmNlUm9vdCI6IiJ9